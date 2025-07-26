import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "aceprep";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
  // Use Gemini's multimodal API to extract text from PDF
  // (In production, use a dedicated PDF parser or Gemini's vision API)
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
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const file = formData.get("resume") as File;
    if (!name || !role || !file) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    // Extract text from PDF using Gemini
    const resumeText = await extractTextFromPDF(fileBuffer);
    // Generate interview questions using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate 5 interview questions for the following role: ${role}.\nResume: ${resumeText}`;
    const result = await model.generateContent(prompt);
    const questions = result.response.text().split(/\n|\d+\. /).filter(q => q.trim().length > 10);
    // Store in MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(MONGODB_DB);
    await db.collection("interview_signups").insertOne({
      name,
      role,
      resumeText,
      questions,
      createdAt: new Date(),
    });
    await client.close();
    return NextResponse.json({ questions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
