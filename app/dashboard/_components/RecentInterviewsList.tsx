"use client"

import React from 'react';
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

export default function RecentInterviewsList({ interviews = [] }) {
  // Placeholder data
  const demoInterviews = [
    {
      id: '1',
      mockId: 'mock-1',
      jobPosition: 'Senior Frontend Developer',
      jobDesc: 'Experience with React, TypeScript and modern frontend frameworks',
      jobExperience: '5',
      createdAt: '2023-07-15',
      score: 92,
      duration: '45 mins',
      questions: 15
    },
    {
      id: '2',
      mockId: 'mock-2',
      jobPosition: 'Product Manager',
      jobDesc: 'Leading product strategy and execution for SaaS platforms',
      jobExperience: '3',
      createdAt: '2023-07-10',
      score: 78,
      duration: '38 mins',
      questions: 12
    },
    {
      id: '3',
      mockId: 'mock-3',
      jobPosition: 'Data Scientist',
      jobDesc: 'Machine learning and data analysis for business intelligence',
      jobExperience: '2',
      createdAt: '2023-07-05',
      score: 85,
      duration: '42 mins',
      questions: 14
    }
  ];

  // Use provided interviews or fallback to demo data
  const displayInterviews = interviews.length > 0 ? interviews : demoInterviews;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recent Interviews</h3>
        <Link 
          href="/dashboard/interviews"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          View All
          <ArrowUpRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="divide-y divide-gray-100">
        {displayInterviews.map((interview) => (
          <Link 
            href={`/dashboard/interview/${interview.mockId}`}
            key={interview.id}
            className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="mb-4 md:mb-0">
              <div className="font-semibold text-gray-900">{interview.jobPosition}</div>
              <div className="text-sm text-gray-500 mt-1 truncate max-w-xs">{interview.jobDesc}</div>
              <div className="flex items-center space-x-3 mt-2">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {interview.duration}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <BookOpen className="w-3.5 h-3.5 mr-1" />
                  {interview.questions} questions
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                {interview.createdAt}
              </div>
              <div className="ml-4 text-right">
                <div className="text-2xl font-bold text-gray-900">{interview.score}%</div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            </div>
          </Link>
        ))}
        
        {displayInterviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No interviews yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
