import React, { FC } from 'react';

interface Stat {
  label: string;
  value: number | string;
  icon: string;
}

const stats: Stat[] = [
  {
    label: 'Interviews',
    value: 12,
    icon: '🗂️',
  },
  {
    label: 'Questions Answered',
    value: 87,
    icon: '❓',
  },
  {
    label: 'Success Rate',
    value: '78%',
    icon: '🏆',
  },
  {
    label: 'Avg. Score',
    value: 4.2,
    icon: '⭐',
  },
];

const StatsCards: FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
          <div className="text-3xl mb-2">{stat.icon}</div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
