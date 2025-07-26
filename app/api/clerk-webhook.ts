import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../db/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Ensure body is parsed as JSON (Next.js API routes do this by default unless bodyParser is disabled)
    const event = req.body;
    console.log('Clerk webhook event:', event);

    // Handle user.created event from Clerk
    if (event.type === 'user.created') {
      const { id, email_addresses, first_name, last_name } = event.data;
      const email = email_addresses?.[0]?.email_address || '';
      const result = await prisma.user.upsert({
        where: { clerkId: id },
        update: {},
        create: {
          clerkId: id,
          email,
          name: [first_name, last_name].filter(Boolean).join(' '),
        },
      });
      console.log('User upserted:', result);
    }

    // Add more event handlers as needed

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
