'use client'
import Image from 'next/image';
import React from 'react';
import { SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';

const Sidebar: React.FC = () => {
  const { user, isSignedIn } = useUser();

  return (
    <aside className="w-60 bg-white border-r border-gray-100 min-h-screen flex flex-col shadow-sm">
      {/* Logo */}


      {/* User Info */}
      {isSignedIn && user && (
        <div className="flex flex-col items-center py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <Image
            src={user.imageUrl || '/avatar-placeholder.png'}
            alt={user.fullName || 'User'}
            width={64}
            height={64}
            className="rounded-full border-2 border-blue-200 shadow"
          />
          <div className="mt-3 text-base font-semibold text-gray-900">{user.fullName}</div>
          <div className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</div>
        </div>
      )}
      <nav className="flex-1 py-6 px-4">
        <ul className="space-y-2">
          <li>
           
          </li>
          <li>
            <Link href="/dashboard/interview" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">
              <span className="mr-3">📝</span>
              Interviews
            </Link>
          </li>
          <li>
            <Link href="/dashboard/skills" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">
              <span className="mr-3">💡</span>
              Skills Bank
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <Button variant='destructive' className='w-full'>
          <SignOutButton />
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
