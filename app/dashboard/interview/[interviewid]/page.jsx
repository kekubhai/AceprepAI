
"use client"
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { ArrowLeft, ArrowRight, Mic, MicOff, PauseCircle, PlayCircle, RefreshCcw, Zap } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function InterviewPage({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewid));
      
      if (result.length > 0) {
        setInterviewData(result[0]);
        
        // Parse the JSON response to get questions
        try {
          const parsedData = JSON.parse(result[0].jsonMockResp);
          if (Array.isArray(parsedData)) {
            setQuestions(parsedData);
          } else if (parsedData.questions && Array.isArray(parsedData.questions)) {
            setQuestions(parsedData.questions);
          }
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
        }
      }
    } catch (error) {
      console.error('Error fetching interview details:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    
    // Simulate voice input (this would be replaced with actual Web Speech API)
    if (!isRecording) {
      setTimeout(() => {
        setUserResponse('In my previous role at XYZ Corp, I led a project to redesign our customer dashboard that faced significant technical challenges. The main issues included...');
      }, 3000);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserResponse('');
      setFeedback(null);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserResponse('');
      setFeedback(null);
    }
  };

  const provideFeedback = () => {
    // Simulate AI feedback generation
    setFeedback({
      score: 85,
      strengths: [
        'Good problem identification',
        'Clear explanation of the process'
      ],
      improvements: [
        'Add more specific metrics on the outcomes',
        'Include how you handled team disagreements'
      ],
      summary: 'Your answer shows good technical knowledge and problem-solving approach. Try to add more measurable results and team collaboration aspects to strengthen it further.'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{interviewData?.jobPosition}</h1>
            <p className="text-gray-600">{interviewData?.jobDesc}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {interviewData?.jobExperience} years exp.
            </span>
            <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {interviewData?.createdAt}
            </span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Question and Answer Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">Interview Progress</h3>
              <span className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" 
                style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}
              ></div>
            </div>
          </div>

          {/* Current Question */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Question {currentQuestionIndex + 1}</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              {currentQuestion ? currentQuestion.question : 'No question available'}
            </p>
            
            <div className="flex space-x-4">
              <button 
                onClick={togglePlayback}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              >
                {isPlaying ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                <span>{isPlaying ? 'Pause' : 'Listen'}</span>
              </button>
              
              <button 
                onClick={prevQuestion} 
                disabled={currentQuestionIndex === 0}
                className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${
                  currentQuestionIndex === 0
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              
              <button 
                onClick={nextQuestion}
                disabled={currentQuestionIndex === questions.length - 1} 
                className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${
                  currentQuestionIndex === questions.length - 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User Response */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Response</h3>
              
              <div className="flex items-center space-x-2">
                <span className={`flex h-2.5 w-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></span>
                <span className="text-sm text-gray-500">{isRecording ? 'Recording...' : 'Not recording'}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 min-h-[120px] mb-4">
              {userResponse ? (
                <p className="text-gray-700">{userResponse}</p>
              ) : (
                <p className="text-gray-400 italic">Start recording or type your answer here...</p>
              )}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={toggleVoiceRecording}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isRecording
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
              </button>
              
              <button
                onClick={provideFeedback}
                disabled={!userResponse}
                className={`px-6 py-2 rounded-lg ${
                  userResponse
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Get AI Feedback
              </button>
            </div>
          </div>

          {/* AI Feedback */}
          {feedback && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">AI Feedback</h3>
                
                <div className="ml-auto flex items-center space-x-1">
                  <span className="text-2xl font-bold text-gray-900">{feedback.score}</span>
                  <span className="text-gray-500">/100</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{feedback.summary}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Strengths
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    {feedback.strengths.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    {feedback.improvements.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">△</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sample Answer */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Answer</h3>
            <p className="text-gray-700 mb-4">
              {currentQuestion ? currentQuestion.answer : 'No sample answer available'}
            </p>
            <div className="text-sm text-gray-500 italic">
              This is a sample answer provided by our AI to help you understand the key points to address in your response.
            </div>
          </div>
          
          {/* Tips */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Tips</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">Structure your answer using the STAR method: Situation, Task, Action, Result</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">Include specific metrics and outcomes when describing your achievements</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">Keep your response concise and focused on the question</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-700">Demonstrate your problem-solving approach and teamwork skills</span>
              </li>
            </ul>
          </div>
          
          {/* Reset Interview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <button className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <RefreshCcw className="w-5 h-5" />
              <span>Reset Interview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewPage
