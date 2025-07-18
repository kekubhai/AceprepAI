"use client"

import { UserButton } from '@clerk/nextjs';
import { Bell, Search } from 'lucide-react';
import { useState } from 'react';

export default function DashboardHeader({ title, subtitle }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col space-y-6 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search interviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          {/* Notifications */}
          <button className="p-2 bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile Button */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
