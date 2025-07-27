import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../db/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// GET: Fetch interview by ID (with questions and answers)
export async function GET(req: NextRequest, { params }: { params: { interviewid: string } }) {
  try {
    const { interviewid } = params;
    const interview = await prisma.interview.findUnique({
      where: { id: interviewid },
      include: { questions: true, user: true },
    });
    if (!interview) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }
    return NextResponse.json({
      id: interview.id,
      jobPosition: interview.questions[0]?.text || "",
      jobDesc: interview.questions[0]?.text || "",
      jobExperience: interview.user?.name || "",
      createdAt: interview.createdAt,
      questions: interview.questions.map(q => ({ question: q.text, answer: q.answer })),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

// POST: Add a new interview (with resume analysis)
export async function POST(req: NextRequest, { params }: { params: { interviewid: string } }) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId") as string;
    const jobPosition = formData.get("jobPosition") as string;
    const jobDesc = formData.get("jobDesc") as string;
    const jobExperience = formData.get("jobExperience") as string;
    const file = formData.get("resume") as File | null;

    let resumeText = "";
    if (file) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: "application/pdf",
            data: fileBuffer.toString("base64"),
          },
        },
        { text: "Extract all readable text from this PDF for interview question generation." }
      ]);
      resumeText = result.response.text();
    }

    // Generate questions using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const prompt = `Generate 5 interview questions for the following role: ${jobPosition}.\nResume: ${resumeText || jobDesc}`;
    const result = await model.generateContent(prompt);
    const questions = result.response.text().split(/\n|\d+\. /).filter(q => q.trim().length > 10);

    // Save interview and questions in PostgreSQL
    const interview = await prisma.interview.create({
      data: {
        userId,
        questions: {
          create: questions.map((q: string) => ({ text: q })),
        },
      },
      include: { questions: true },
    });

    return NextResponse.json({
      id: interview.id,
      questions: interview.questions.map(q => ({ question: q.text })),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

// PATCH: Update answer for a question
export async function PATCH(req: NextRequest, { params }: { params: { interviewid: string } }) {
  try {
    const { interviewid } = params;
    const { questionId, answer } = await req.json();
    const updated = await prisma.question.update({
      where: { id: questionId, interviewId: interviewid },
      data: { answer },
    });
    return NextResponse.json({ success: true, updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
