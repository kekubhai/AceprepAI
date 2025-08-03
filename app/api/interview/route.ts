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

    // Generate questions using Gemini
    const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    let questions: { text: string }[] = [];
    try {
      const prompt = `Generate 5 interview questions for the following role: ${jobPosition}.\nDescription: ${jobDescription}\nExperience: ${jobExperience} years. Respond as a JSON array of objects with 'text' fields.`;
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
      const data = await res.json();
      let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      let parsed: { text: string }[] = [];
      try {
        parsed = JSON.parse(text);
      } catch {
        const match = text.match(/\[([\s\S]*?)\]/);
        if (match) {
          try {
            parsed = JSON.parse(match[0]);
          } catch {}
        }
      }
      if (Array.isArray(parsed) && parsed.length >= 3) {
        questions = parsed
          .filter(q => q && typeof q.text === "string")
          .slice(0, 5);
      }
    } catch (err) {
      // fallback below
    }
    if (!questions.length) {
      questions = [
        { text: "What is a closure in JavaScript?" },
        { text: "Write a function to reverse a linked list." },
        { text: "Explain the concept of RESTful APIs." },
        { text: "How would you optimize a slow SQL query?" },
        { text: "Implement a stack using arrays." },
      ];
    }

    // Create interview and questions in DB
    const interview = await prisma.interview.create({
      data: {
        userId: user.id,
        questions: {
          create: questions.map(q => ({ text: q.text })),
        },
      },
      include: { questions: true },
    });

    return NextResponse.json({ success: true, id: interview.id, questions: interview.questions });
  } catch (error) {
    console.error("Interview creation error:", error);
    return NextResponse.json({ error: error?.message || "Server error" }, { status: 500 });
  }
}
