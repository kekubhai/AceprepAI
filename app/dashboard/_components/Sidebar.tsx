import Image from 'next/image';
import React, { FC } from 'react';

const Sidebar: FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-gray-100">
        <Image src="/logo.svg" alt="AcePrep Logo" className="h-10 w-auto" width={10} height={10} />
      </div>
      <nav className="flex-1 py-6 px-4">
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">
              <span className="mr-3">🏠</span>
              Dashboard
            </a>
          </li>
          <li>
            <a href="/dashboard/interview" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">
              <span className="mr-3">📝</span>
              Interviews
            </a>
          </li>
          <li>
            <a href="/dashboard/skills" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">
              <span className="mr-3">💡</span>
              Skills Assessment
            </a>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-100">
        <a href="/" className="block text-center text-blue-600 hover:underline text-sm">Back to Home</a>
      </div>
    </aside>
  );
};

export default Sidebar;
