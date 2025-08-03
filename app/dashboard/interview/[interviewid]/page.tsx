"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

interface Question {
  id: string;
  question: string;
}

export default function InterviewPage() {
  const params = useParams();
  const interviewId = params.interviewid as string;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      if (!interviewId) return;
      
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/interview/${interviewId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch interview");
        }
        const data = await res.json();
        setQuestions(data.questions || []);
        setAnswers(new Array(data.questions?.length || 0).fill(""));
      } catch (err) {
        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [interviewId]);
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
    // Optionally: check for empty answers
    if (answers.some(a => !a.trim())) {
      alert("Please answer all questions before submitting.");
      return;
    }
    
    try {
      const res = await fetch(`/api/interview/${interviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to submit answers");
      }
      
      const data = await res.json();
      setShowAnalysis(true);
      setAnalysis(data.analysis || "Great effort! Your answers show good understanding. Keep practicing to improve further.");
    } catch (error) {
      alert("Failed to submit answers. Please try again.");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading questions...</div>;
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <div className="text-red-600 font-semibold mb-4">{error}</div>
      </div>
    );
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
          </div>
          <textarea
            className="w-full border border-gray-200 rounded-lg p-3 min-h-[120px] text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type your answer here..."
            value={answers[currentQuestionIndex]}
            onChange={handleAnswerChange}
            disabled={loading}
          />
          <div className="flex justify-between mt-6">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0 || loading}
              className="px-4 py-2 rounded-lg border flex items-center space-x-2 disabled:opacity-50"
            >
              Previous
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
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
// End of InterviewPage component
}
