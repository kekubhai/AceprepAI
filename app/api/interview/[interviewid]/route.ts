import { NextResponse } from 'next/server';
import { db } from '../../../../utils/db';
import { eq } from 'drizzle-orm';
import { interviews } from '../../../../utils/schema';

export async function GET(request: Request, { params }: { params: { interviewid: string } }) {
  try {
    const result = await db.select().from(interviews).where(eq(interviews.id, Number(params.interviewid)));
    if (result.length === 0) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch interview' }, { status: 500 });
  }
}
