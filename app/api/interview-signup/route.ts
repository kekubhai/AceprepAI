import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import guestSchema from "../../../utils/guest.schema";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MONGODB_URI = process.env. MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "aceprep";
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Register the model if not already registered
const GuestInterview = mongoose.models.GuestInterview ?? mongoose.model("GuestInterview", guestSchema);

// --- Simple in-memory rate limiter ---
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_SECONDS = 10;

async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
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
  return result.response.text();
}

export async function POST(req: NextRequest) {
  try {
    // --- Rate limit logic ---
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
    const now = Date.now();
    const last = rateLimitMap.get(ip) || 0;
    if (now - last < RATE_LIMIT_SECONDS * 1000) {
      return NextResponse.json({ error: `Please wait ${RATE_LIMIT_SECONDS} seconds between requests.` }, { status: 429 });
    }
    rateLimitMap.set(ip, now);

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const file = formData.get("resume") as File;
    if (!name || !role || !file) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const resumeText = await extractTextFromPDF(fileBuffer);

    // For both extractTextFromPDF and question generation:
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const prompt = `Generate 5 interview questions for the following role: ${role}.\nResume: ${resumeText}`;
    const result = await model.generateContent(prompt);
    const questions = result.response.text().split(/\n|\d+\. /).filter(q => q.trim().length > 10);
    // Store guest details in MongoDB
    if (!mongoose.connection.readyState) {
      await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
    }
    const guestDoc = await GuestInterview.create({
      name,
      role,
      email: name + "@guest.aceprep",
      resumeText,
      questions,
    });
    return NextResponse.json({ questions: questions.map((q: string) => ({ question: q })) });
  } catch (err: any) {
    console.error("Interview signup error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
