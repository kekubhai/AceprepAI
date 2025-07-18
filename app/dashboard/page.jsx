"use client"

import React from 'react';
import DashboardHeader from './_components/DashboardHeader';
import StatsCards from './_components/StatsCards';
import NewInterviewCard from './_components/NewInterviewCard';
import RecentInterviewsList from './_components/RecentInterviewsList';
import VoiceInput from './_components/VoiceInput';
import SkillsAssessment from './_components/SkillsAssessment';
import { useUser } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const firstName = isLoaded ? (user?.firstName || 'there') : 'there';

  return (
    <div className="space-y-8">
      <DashboardHeader 
        title={`Welcome back, ${firstName}!`}
        subtitle="Monitor your progress and practice for your next interview"
      />
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentInterviewsList />
        </div>
        <div className="space-y-8">
          <NewInterviewCard />
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-semibold">Pro Tip</h3>
            </div>
            <p className="text-sm text-white/90 mb-4">
              Practice makes perfect! Try to complete at least 3 mock interviews per week for best results.
            </p>
            <div className="w-full bg-white/20 rounded-full h-1.5 mb-1">
              <div className="bg-white h-1.5 rounded-full" style={{width: '40%'}}></div>
            </div>
            <div className="text-xs text-white/80">2 of 5 weekly goals completed</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SkillsAssessment />
        <div className="space-y-6">
          <VoiceInput />
          
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
