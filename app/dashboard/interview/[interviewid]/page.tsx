"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Gemini API setup (client-side fetch)
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

interface Question {
  question: string;
  type: "general" | "machine-coding";
}

export default function InterviewPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
// ...existing code up to the end of the InterviewPage component...
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generateQuestions() {
      setLoading(true);
      try {
        // Use Gemini API to generate 5 questions, 1-2 on machine coding
        const prompt = `Generate 5 interview questions for a software developer. At least 1 and at most 2 should be machine coding questions. For each question, specify if it is a 'machine-coding' or 'general' question. Respond as a JSON array of objects with 'question' and 'type' fields.`;
        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        });
        const data = await res.json();
        // Parse Gemini's response
        let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        let parsed: Question[] = [];
        try {
          parsed = JSON.parse(text);
        } catch {
          // fallback: try to extract JSON from text (without 's' flag)
          const match = text.match(/\[([\s\S]*?)\]/);
          if (match) parsed = JSON.parse(match[0]);
        }
        setQuestions(parsed);
        setAnswers(Array(parsed.length).fill(""));
      } catch (err) {
        setQuestions([
          { question: "What is a closure in JavaScript?", type: "general" },
          { question: "Write a function to reverse a linked list.", type: "machine-coding" },
          { question: "Explain the concept of RESTful APIs.", type: "general" },
          { question: "How would you optimize a slow SQL query?", type: "general" },
          { question: "Implement a stack using arrays.", type: "machine-coding" },
        ]);
        setAnswers(["", "", "", "", ""]);
      } finally {
        setLoading(false);
      }
    }
    generateQuestions();
  }, []);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updated = [...answers];
    updated[currentQuestionIndex] = e.target.value;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setShowAnalysis(true);
    // Call Gemini for analysis (simulate for now)
    setAnalysis("Great effort! Your answers show good understanding. For machine coding, ensure to handle edge cases and optimize for time/space complexity.");
    // TODO: Save result to backend (Result schema)
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading questions...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mock Interview</h1>
        <p className="text-gray-600 mb-4">Answer the questions below. Machine coding questions are included.</p>
      </div>
      {!showAnalysis ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-4">
            <span className="text-sm text-blue-600 font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <h2 className="text-lg font-semibold text-gray-900 mt-2 mb-2">{currentQuestion?.question}</h2>
            {currentQuestion?.type === "machine-coding" && (
              <span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full mb-2">Machine Coding</span>
            )}
          </div>
          <textarea
            className="w-full border border-gray-200 rounded-lg p-3 min-h-[120px] text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type your answer here..."
            value={answers[currentQuestionIndex]}
            onChange={handleAnswerChange}
          />
          <div className="flex justify-between mt-6">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-lg border flex items-center space-x-2 disabled:opacity-50"
            >
              Previous
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Submit for Analysis
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 text-center">
          <h2 className="text-xl font-bold text-green-700 mb-4">AI Analysis</h2>
          <p className="text-gray-800 mb-6">{analysis}</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Answers</h3>
          <ol className="list-decimal list-inside text-left space-y-2">
            {questions.map((q, i) => (
              <li key={i}>
                <span className="font-medium text-blue-700">Q{i + 1}:</span> {q.question}
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 mt-1 mb-4 text-gray-700">
                  <span className="font-semibold">Your Answer:</span> {answers[i] || <span className="italic text-gray-400">No answer</span>}
                </div>
              </li>
            ))}
          </ol>
          <button
            onClick={() => setShowAnalysis(false)}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retake Interview
          </button>
        </div>
      )}
    </div>
  );
}
// (End of InterviewPage component. All code after this line is removed.)
