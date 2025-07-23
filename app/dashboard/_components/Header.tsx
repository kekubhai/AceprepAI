import Image from 'next/image';
import React, { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="flex items-center justify-between py-4 px-8 bg-white border-b border-gray-100">
      <div>
        <h1 className="text-xl font-bold text-gray-900">AcePrep Dashboard</h1>
      </div>
      <div>
        <Image src="/logo.svg" alt="AcePrep Logo" className="h-8 w-auto" width={20} height={20} />
      </div>
    </header>
  );
};

export default Header;
