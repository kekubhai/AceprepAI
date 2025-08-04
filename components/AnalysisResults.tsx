"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Award, Brain, Users, Code, MessageSquare } from "lucide-react";

interface SkillAnalysis {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

interface AnalysisData {
  overallScore: number;
  skillsAnalysis: {
    technicalSkills: SkillAnalysis;
    communicationSkills: SkillAnalysis;
    learningAbility: SkillAnalysis;
    projectExperience: SkillAnalysis;
  };
  detailedFeedback: string;
  recommendation: "HIRE" | "CONDITIONAL_HIRE" | "REJECT";
  nextSteps: string;
}

interface AnalysisResultsProps {
  analysis: AnalysisData;
  questions: Array<{ question: string }>;
  answers: string[];
}

const SkillBar = ({ 
  label, 
  score, 
  icon: Icon, 
  color 
}: { 
  label: string; 
  score: number; 
  icon: any; 
  color: string; 
}) => {
  const percentage = (score / 10) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <span className="font-medium text-gray-900">{label}</span>
        </div>
        <span className="text-lg font-bold text-gray-900">{score}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color.replace('text-', 'bg-')}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const RecommendationBadge = ({ recommendation }: { recommendation: string }) => {
  const colors = {
    HIRE: "bg-green-100 text-green-800 border-green-200",
    CONDITIONAL_HIRE: "bg-yellow-100 text-yellow-800 border-yellow-200",
    REJECT: "bg-red-100 text-red-800 border-red-200"
  };
  
  const icons = {
    HIRE: "✅",
    CONDITIONAL_HIRE: "⚠️",
    REJECT: "❌"
  };
  
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colors[recommendation as keyof typeof colors]}`}>
      <span className="mr-2">{icons[recommendation as keyof typeof icons]}</span>
      {recommendation.replace('_', ' ')}
    </div>
  );
};

export default function AnalysisResults({ analysis, questions, answers }: AnalysisResultsProps) {
  const skills = [
    { 
      key: 'technicalSkills', 
      label: 'Technical Skills', 
      icon: Code, 
      color: 'text-blue-600' 
    },
    { 
      key: 'communicationSkills', 
      label: 'Communication Skills', 
      icon: MessageSquare, 
      color: 'text-green-600' 
    },
    { 
      key: 'learningAbility', 
      label: 'Learning Ability', 
      icon: Brain, 
      color: 'text-purple-600' 
    },
    { 
      key: 'projectExperience', 
      label: 'Project Experience', 
      icon: Users, 
      color: 'text-orange-600' 
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Analysis Results</h1>
        <p className="text-gray-600">AI-powered evaluation by senior hiring manager standards</p>
      </div>

      {/* Overall Score Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Overall Score</h2>
            <p className="text-gray-600">Comprehensive evaluation across all skills</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-1">{analysis.overallScore}/10</div>
            <RecommendationBadge recommendation={analysis.recommendation} />
          </div>
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Skills Breakdown
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill) => {
            const skillData = analysis.skillsAnalysis[skill.key as keyof typeof analysis.skillsAnalysis];
            return (
              <div key={skill.key} className="space-y-4">
                <SkillBar 
                  label={skill.label}
                  score={skillData.score}
                  icon={skill.icon}
                  color={skill.color}
                />
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">{skillData.feedback}</p>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <h5 className="text-xs font-semibold text-green-700 mb-1">STRENGTHS</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {skillData.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-500 mr-1">•</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-semibold text-red-700 mb-1">IMPROVEMENTS</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {skillData.improvements.map((improvement, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-red-500 mr-1">•</span>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Feedback */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-yellow-600" />
          Detailed Feedback
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">{analysis.detailedFeedback}</p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Next Steps for Improvement:</h4>
          <p className="text-blue-800">{analysis.nextSteps}</p>
        </div>
      </div>

      {/* Interview Q&A Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Interview Summary</h3>
        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={i} className="border-l-4 border-blue-200 pl-4">
              <h4 className="font-medium text-gray-900 mb-2">Q{i + 1}: {q.question}</h4>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-700 text-sm">
                  {answers[i] || <span className="italic text-gray-400">No answer provided</span>}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
