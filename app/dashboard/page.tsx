"use client"

import React from 'react';
import DashboardHeader from './_components/DashboardHeader'; // No change
import StatsCards from './_components/StatsCards';
import NewInterviewCard from './_components/NewInterviewCard';
import RecentInterviewsList from './_components/RecentInterviewsList';
import VoiceInput from './_components/VoiceInput';
import SkillsAssessment from './_components/SkillsAssessment';
import { useUser } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';
import AchievementsFeed from './_components/Achievements';

const Dashboard: React.FC = () => {
  const { user, isLoaded } = useUser();
  const firstName = isLoaded ? (user?.firstName || 'there') : 'there';
    const achievementsData = [
    {
      id: 1,
      type: "milestone",
      title: "50 Sessions Completed",
      description: "Congratulations on completing your 50th interview session! Your dedication is paying off.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      points: 50
    },
    {
      id: 2,
      type: "improvement",
      title: "Technical Score Improved",
      description: "Your technical interview score increased by 15% this week. Keep up the excellent work!",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      points: 25
    },
    {
      id: 3,
      type: "streak",
      title: "7-Day Practice Streak",
      description: "You\'ve maintained consistent practice for 7 consecutive days. Consistency is key to success!",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      points: 30
    },
    {
      id: 4,
      type: "skill",
      title: "Communication Mastery",
      description: "You've achieved 80%+ scores in communication for 5 consecutive sessions.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      points: 40
    }
  ];
  return (
    <div className="space-y-8">
      <DashboardHeader userName={firstName} />
      
      <StatsCards />
      
      <div className="flex gap-8">
        <div className="lg:col-span-2">
          <NewInterviewCard />
        </div>
        <div className="space-y-8">
          <RecentInterviewsList/>
          
          
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SkillsAssessment />
        <div className="space-y-6">
          {/* <VoiceInput onTranscriptChange={() => {}} /> */}
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interview</h3>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">Software Engineer at Google</div>
                <div className="text-sm text-blue-600">Tomorrow, 2:00 PM</div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Technical interview focusing on system design and algorithms
              </p>
              <div className="flex space-x-2">
                <button className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50">
                  View Details
                </button>
                <button className="text-xs px-3 py-1 bg-blue-600 rounded-full text-white hover:bg-blue-700">
                  Practice Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
