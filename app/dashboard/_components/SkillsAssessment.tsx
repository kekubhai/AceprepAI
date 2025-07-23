"use client"

import { CheckCircle, Circle, TrendingUp, Award, BookOpen, Target } from 'lucide-react';
import React, { useState } from 'react';

export default function SkillsAssessment() {
  const [activeTab, setActiveTab] = useState('skills');
  
  const skills = [
    { 
      name: 'Communication Skills', 
      score: 85, 
      status: 'Excellent',
      color: 'green',
      improvement: '+12% from last assessment'
    },
    { 
      name: 'Technical Knowledge', 
      score: 78, 
      status: 'Good',
      color: 'blue',
      improvement: '+5% from last assessment'
    },
    { 
      name: 'Problem-Solving', 
      score: 92, 
      status: 'Excellent',
      color: 'green',
      improvement: '+8% from last assessment'
    },
    { 
      name: 'Cultural Fit', 
      score: 70, 
      status: 'Average',
      color: 'yellow',
      improvement: '+3% from last assessment'
    },
    { 
      name: 'Leadership', 
      score: 65, 
      status: 'Needs Work',
      color: 'orange',
      improvement: '-2% from last assessment'
    }
  ];
  
  const recommendations = [
    {
      title: 'Leadership Development',
      description: 'Work on more leadership scenarios and team management questions',
      status: 'in-progress',
      resources: [
        { type: 'article', title: 'Effective Leadership in Tech Interviews' },
        { type: 'practice', title: '5 Leadership Scenario Questions' }
      ]
    },
    {
      title: 'Cultural Fit Enhancement',
      description: 'Practice more questions related to cultural fit and company values',
      status: 'not-started',
      resources: [
        { type: 'video', title: 'Understanding Company Culture' },
        { type: 'practice', title: 'Cultural Fit Interview Questions' }
      ]
    },
    {
      title: 'Technical Knowledge Review',
      description: 'Continue practicing technical knowledge questions',
      status: 'completed',
      resources: [
        { type: 'practice', title: 'Advanced Technical Questions' },
        { type: 'guide', title: 'System Design Interview Guide' }
      ]
    }
  ];

  const getColorClass = (colorName) => {
    const colorMap = {
      'green': 'bg-emerald-500',
      'blue': 'bg-blue-500',
      'yellow': 'bg-amber-500',
      'orange': 'bg-orange-500'
    };
    
    return colorMap[colorName] || 'bg-gray-500';
  };
  
  const getTextColorClass = (colorName) => {
    const colorMap = {
      'green': 'text-emerald-600',
      'blue': 'text-blue-600',
      'yellow': 'text-amber-600',
      'orange': 'text-orange-600'
    };
    
    return colorMap[colorName] || 'text-gray-600';
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'in-progress':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'not-started':
        return <Circle className="w-5 h-5 text-gray-300" />;
      default:
        return <Circle className="w-5 h-5 text-gray-300" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100">
        <div className="flex">
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'skills' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills Overview
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'recommendations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('recommendations')}
          >
            Recommendations
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {activeTab === 'skills' ? 'Skills Assessment' : 'Improvement Plan'}
          </h3>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Last updated: July 15, 2025
            </span>
          </div>
        </div>
        
        {activeTab === 'skills' ? (
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className={`inline-block w-3 h-3 rounded-full ${getColorClass(skill.color)} mr-2`}></span>
                    <span className="font-medium text-gray-700">{skill.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`${getTextColorClass(skill.color)} text-sm font-medium`}>
                      {skill.status}
                    </span>
                    <span className="text-gray-900 font-bold">{skill.score}%</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`${getColorClass(skill.color)} h-2.5 rounded-full transition-all duration-500 ease-in-out group-hover:opacity-90`} 
                    style={{ width: `${skill.score}%` }}
                  ></div>
                </div>
                
                <div className="mt-1 text-xs text-gray-500">
                  {skill.improvement}
                </div>
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <Award className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Overall Performance</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Your overall interview readiness is <span className="font-bold">Good</span>. Continue improving on the recommended areas to increase your chances of success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100 group hover:border-blue-100 hover:bg-blue-50 transition-all">
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 mt-1">
                    {getStatusIcon(rec.status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{rec.title}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
                        {rec.status === 'completed' ? 'Completed' : rec.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 text-sm mt-1">
                      {rec.description}
                    </p>
                    
                    <div className="mt-3 space-y-2">
                      {rec.resources.map((resource, i) => (
                        <div key={i} className="flex items-center">
                          {resource.type === 'article' && <BookOpen className="w-4 h-4 text-gray-400 mr-2" />}
                          {resource.type === 'video' && <Target className="w-4 h-4 text-gray-400 mr-2" />}
                          {resource.type === 'practice' && <TrendingUp className="w-4 h-4 text-gray-400 mr-2" />}
                          {resource.type === 'guide' && <BookOpen className="w-4 h-4 text-gray-400 mr-2" />}
                          <span className="text-xs text-blue-600 hover:underline cursor-pointer">
                            {resource.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
