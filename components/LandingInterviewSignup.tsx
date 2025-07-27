"use client";

import React, { useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { AlertCircle, LoaderCircle, UploadCloud } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Alert, AlertTitle } from "./ui/alert";

interface Question {
  question: string;
}

interface LandingInterviewSignupProps {
  requireSignInToAnswer?: boolean;
}

export default function LandingInterviewSignup({ requireSignInToAnswer }: LandingInterviewSignupProps) {
  const { user, isSignedIn } = useUser();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [error, setError] = useState<string | null>(null);


  const [alreadySignedUp, setAlreadySignedUp] = useState(false);

  React.useEffect(() => {
    if (isSignedIn && user) {
      
    }
  }, [isSignedIn, user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !role.trim()) {
      setError("Name and Role are required.");
      return;
    }
    if (!file) {
      setError("Please upload your resume (PDF).");
      return;
    }
    setLoading(true);
    setQuestions(null);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("role", role);
      formData.append("resume", file);
      const res = await fetch("/api/interview-signup", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to generate questions.");
      const data = await res.json();
      setQuestions(data.questions);
      setAlreadySignedUp(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };


  if (alreadySignedUp) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 max-w-lg mx-auto mt-12 text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">You are All Set!</h2>
        <p className="text-gray-600 mb-4">You have already signed up for the interview. Check your dashboard for your questions.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md border border-blue-100 max-w-lg mx-auto mt-12 p-8">
      <h2 className="text-2xl font-bold mb-2 text-gray-900 text-center">Get Your AI Interview Questions</h2>
      <p className="text-gray-600 mb-6 text-center">Enter your details and upload your resume to get started.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your Name"
            required
            className="focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <Input
            value={role}
            onChange={e => setRole(e.target.value)}
            placeholder="Ex: Frontend Developer"
            required
            className="focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF)</label>
          <div className="flex items-center gap-3">
            <label className="flex items-center cursor-pointer bg-white border border-dashed border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors">
              <UploadCloud className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm text-gray-700">{file ? file.name : "Choose file"}</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {file && (
              <Button type="button" variant="outline" size="sm" onClick={() => setFile(null)}>
                Remove
              </Button>
            )}
          </div>
        </div>
        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <Button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all flex items-center justify-center ${loading ? "opacity-80" : ""}`}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
              Generating Questions...
            </>
          ) : (
            "Generate Questions"
          )}
        </Button>
      </form>
      {questions && (
        <div className="mt-8 bg-white rounded-lg p-6 shadow-inner">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Your AI Interview Questions</h3>
          <ul className="list-decimal list-inside text-left space-y-2">
            {questions.map((q, i) => (
              <li key={i} className="text-gray-800">
                {q.question}
                {requireSignInToAnswer && !isSignedIn && (
                  <span className="ml-2">
                    <SignInButton mode="modal">
                      <Button size="sm" className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">Sign in to answer</Button>
                    </SignInButton>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
