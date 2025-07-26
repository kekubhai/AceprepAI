import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const event = req.body;

  // Example: handle user.created event from Clerk
  if (event.type === 'user.created') {
    const { id, email_addresses, first_name, last_name } = event.data;
    const email = email_addresses?.[0]?.email_address || '';
    await prisma.user.upsert({
      where: { clerkId: id },
      update: {},
      create: {
        clerkId: id,
        email,
        name: [first_name, last_name].filter(Boolean).join(' '),
      },
    });
  }

  // Add more event handlers as needed

  res.status(200).json({ received: true });
}
