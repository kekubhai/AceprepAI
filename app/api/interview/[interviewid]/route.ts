import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../db/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// GET: Fetch interview by ID (with questions and answers)
export async function GET(req: NextRequest, { params }: { params: { interviewid: string } }) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
    });
    if (!user) {
      return new NextResponse("User not found in DB", { status: 404 });
    }

    const { interviewid } = params;
    const interview = await prisma.interview.findUnique({
      where: { 
        id: interviewid, 
        userId: user.id 
      },
      include: { questions: true, user: true },
    });
    if (!interview) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }
    return NextResponse.json({
      id: interview.id,
      jobPosition: interview.jobPosition || "",
      jobDesc: interview.jobDescription || "",
      jobExperience: interview.jobExperience || "",
      createdAt: interview.createdAt,
      questions: interview.questions.map(q => ({ id: q.id, question: q.text })),
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

// PATCH: Update answers for the interview
export async function PATCH(req: NextRequest, { params }: { params: { interviewid: string } }) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
    });
    if (!user) {
      return new NextResponse("User not found in DB", { status: 404 });
    }

    const { interviewid } = params;
    const { answers } = await req.json();
    
    // Find the interview with all related data
    const interview = await prisma.interview.findUnique({
      where: { 
        id: interviewid,
        userId: user.id 
      },
      include: { 
        questions: true,
        user: true
      },
    });
    
    if (!interview) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }

    // Generate AI-powered analysis using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    
    // Prepare interview data for analysis
    const interviewData = interview.questions.map((q, index) => ({
      question: q.text,
      answer: answers[index] || "No answer provided"
    }));

    const analysisPrompt = `
As a senior hiring manager at a tech startup, analyze this candidate's interview performance critically and professionally.

INTERVIEW DATA:
${interviewData.map((item, i) => `
Q${i + 1}: ${item.question}
Answer: ${item.answer}
`).join('\n')}

CANDIDATE PORTFOLIO/RESUME: ${interview.resume || "Not provided"}
JOB POSITION: ${interview.jobPosition || "Not specified"}
JOB DESCRIPTION: ${interview.jobDescription || "Not specified"}
EXPERIENCE LEVEL: ${interview.jobExperience || "Not specified"}

Provide a comprehensive analysis in JSON format with the following structure:
{
  "overallScore": number (1-10, be critical as a startup hiring manager),
  "skillsAnalysis": {
    "technicalSkills": {
      "score": number (1-10),
      "feedback": "specific technical feedback with examples from answers",
      "strengths": ["strength1", "strength2"],
      "improvements": ["improvement1", "improvement2"]
    },
    "communicationSkills": {
      "score": number (1-10),
      "feedback": "communication clarity, articulation assessment",
      "strengths": ["strength1", "strength2"],
      "improvements": ["improvement1", "improvement2"]
    },
    "learningAbility": {
      "score": number (1-10),
      "feedback": "adaptability, growth mindset, learning from challenges",
      "strengths": ["strength1", "strength2"],
      "improvements": ["improvement1", "improvement2"]
    },
    "projectExperience": {
      "score": number (1-10),
      "feedback": "real-world application, problem-solving approach",
      "strengths": ["strength1", "strength2"],
      "improvements": ["improvement1", "improvement2"]
    }
  },
  "detailedFeedback": "comprehensive paragraph about candidateʻs performance",
  "recommendation": "HIRE" | "CONDITIONAL_HIRE" | "REJECT",
  "nextSteps": "specific actionable advice for candidate improvement"
}

Be honest, constructive, and critical. Focus on what a startup would value: adaptability, problem-solving, hands-on experience, and growth potential.
`;

    let analysisResult;
    try {
      const geminiResponse = await model.generateContent(analysisPrompt);
      const responseText = geminiResponse.response.text();
      
      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON found in Gemini response");
      }
    } catch (error) {
      console.error("Gemini analysis error:", error);
      // Fallback analysis
      analysisResult = {
        overallScore: 6,
        skillsAnalysis: {
          technicalSkills: { score: 6, feedback: "Technical skills need assessment", strengths: ["Shows potential"], improvements: ["Need more practice"] },
          communicationSkills: { score: 6, feedback: "Communication could be clearer", strengths: ["Responsive"], improvements: ["More detailed explanations"] },
          learningAbility: { score: 7, feedback: "Shows willingness to learn", strengths: ["Open to feedback"], improvements: ["More proactive learning"] },
          projectExperience: { score: 5, feedback: "Limited project demonstration", strengths: ["Some experience"], improvements: ["More complex projects needed"] }
        },
        detailedFeedback: "Candidate shows potential but needs more development in key areas.",
        recommendation: "CONDITIONAL_HIRE",
        nextSteps: "Focus on building more projects and improving technical depth."
      };
    }

 
    const result = await prisma.result.create({
      data: {
        userId: interview.userId,
        interviewId: interviewid,

        answers: JSON.stringify(answers),
        analysis: JSON.stringify(analysisResult)
      },
    });

    return NextResponse.json({ 
      success: true,
      resultId: result.id,
      analysis: analysisResult
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
