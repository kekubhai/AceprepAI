"use client"

import { useUser } from '@clerk/nextjs';
import { 
  Layout, Home, BookOpen, BarChart3, Settings, 
  BellRing, Mic, BookMarked, Crown, 
  LogOut, ChevronRight, ChevronLeft
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
  const { user } = useUser();
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      href: "/dashboard",
      color: "text-blue-500",
      bgColor: "bg-blue-100"
    },
    {
      title: "My Interviews",
      icon: <BookOpen className="w-5 h-5" />,
      href: "/dashboard/interviews",
      color: "text-purple-500",
      bgColor: "bg-purple-100"
    },
    {
      title: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      href: "/dashboard/analytics",
      color: "text-green-500",
      bgColor: "bg-green-100"
    },
    {
      title: "Resources",
      icon: <BookMarked className="w-5 h-5" />,
      href: "/dashboard/resources",
      color: "text-amber-500",
      bgColor: "bg-amber-100"
    },
    {
      title: "Upgrade",
      icon: <Crown className="w-5 h-5" />,
      href: "/dashboard/upgrade",
      color: "text-rose-500",
      bgColor: "bg-rose-100"
    },
    {
      title: "Settings",
      icon: <Settings className="w-5 h-5" />,
      href: "/dashboard/settings",
      color: "text-gray-500",
      bgColor: "bg-gray-100"
    }
  ];

  return (
    <div className={`h-screen sticky top-0 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col`}>
      {/* Toggle Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)} 
        className="absolute -right-3 top-12 p-1.5 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo and Brand */}
      <div className={`p-4 ${collapsed ? 'justify-center' : 'justify-start'} flex items-center border-b border-gray-200`}>
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">
          A
        </div>
        {!collapsed && (
          <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AcePrep</span>
        )}
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={user?.imageUrl || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face'}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{user?.fullName || 'User Name'}</span>
              <span className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress || 'user@example.com'}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3 text-white">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Free Plan</span>
                <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">2/5 used</span>
              </div>
              <div className="w-full h-1.5 bg-white bg-opacity-20 rounded-full mt-2">
                <div className="h-1.5 bg-white rounded-full" style={{width: '40%'}}></div>
              </div>
              <Link href="/dashboard/upgrade" className="mt-2 text-xs text-white/90 flex items-center hover:text-white">
                Upgrade to Pro
                <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item, index) => {
            const isActive = path === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-3 py-3 rounded-lg transition-all duration-200 group
                  ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <div className={`${isActive ? 'text-white' : item.color} ${!isActive && 'group-hover:text-gray-900'}`}>
                  {item.icon}
                </div>
                {!collapsed && (
                  <span className="ml-3 font-medium">{item.title}</span>
                )}
                {!collapsed && isActive && (
                  <div className="ml-auto bg-white bg-opacity-30 p-1 rounded-md">
                    <ChevronRight size={14} />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        {collapsed ? (
          <button className="w-full p-2 text-gray-500 hover:bg-gray-100 rounded-lg flex justify-center">
            <LogOut size={20} />
          </button>
        ) : (
          <button className="w-full px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg flex items-center">
            <LogOut size={20} className="mr-2" />
            <span>Sign out</span>
          </button>
        )}
      </div>
    </div>
  );
}
