// app/api/interview/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server"; // Clerk Auth for App Router

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkUserId } = auth();

    if (!clerkUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the user in your DB using clerkId
    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
    });

    if (!user) {
      return new NextResponse("User not found in DB", { status: 404 });
    }

    const formData = await req.formData();
    const jobPosition = formData.get("jobPosition") as string;
    const jobDescription = formData.get("jobDesc") as string;
    const jobExperience = parseInt(formData.get("jobExperience") as string);

    const interview = await prisma.interview.create({
      data: {
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, id: interview.id });
  } catch (error) {
    console.error("Interview creation error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
