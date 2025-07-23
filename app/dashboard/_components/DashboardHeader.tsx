import Image from 'next/image';
import React, { FC } from 'react';

interface DashboardHeaderProps {
  userName?: string;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({ userName }) => {
  return (
    <header className="flex items-center justify-between py-6 px-8 bg-white border-b border-gray-100">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome{userName ? `, ${userName}` : ''}!</h1>
        <p className="text-gray-500 text-sm mt-1">Your personalized interview dashboard</p>
      </div>
      <div>
        <Image src="/logo.svg" alt="AcePrep Logo" className="h-8 w-auto" width={20} height={20} />
      </div>
    </header>
  );
};

export default DashboardHeader;
