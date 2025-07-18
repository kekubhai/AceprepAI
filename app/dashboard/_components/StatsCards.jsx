"use client"

import { BarChart, Clock, Target } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      title: "Total Interviews",
      value: "12",
      change: "+20%",
      trend: "up",
      description: "vs. previous month",
      icon: <Target className="w-5 h-5" />,
      color: "blue"
    },
    {
      title: "Average Score",
      value: "86%",
      change: "+5%",
      trend: "up",
      description: "vs. previous month",
      icon: <BarChart className="w-5 h-5" />,
      color: "green"
    },
    {
      title: "Practice Hours",
      value: "8.5",
      change: "+2.5",
      trend: "up",
      description: "vs. previous month",
      icon: <Clock className="w-5 h-5" />,
      color: "purple"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <div className="flex items-center mt-1">
                <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-1.5">{stat.description}</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
              <div className={`text-${stat.color}-600`}>{stat.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
