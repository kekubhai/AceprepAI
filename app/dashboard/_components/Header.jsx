"use client"

import { UserButton, useUser } from '@clerk/nextjs';
import { Bell, Search, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Header = () => {
  const { user } = useUser();
  const path = usePathname();
  
  const menuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Questions', href: '/dashboard/questions' },
    { label: 'Upgrade', href: '/dashboard/upgrade' },
    { label: 'How it works', href: '/dashboard/working' }
  ];

  return (
    <div className="h-16 border-b border-gray-100 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <Link href="/dashboard">
          <Image
            src="/logo.svg"
            alt="AcePrep"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
        </Link>
        
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-6">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} 
                  className={`text-sm font-medium transition-colors ${
                    path === item.href 
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative max-w-md hidden lg:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search interviews, questions..." 
            className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Settings className="h-5 w-5 text-gray-600" />
        </button>
        
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Header
