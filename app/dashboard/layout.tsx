import React, { ReactNode } from 'react';
import Sidebar from './_components/Sidebar';


interface DashBoardLayoutProps {
  children: ReactNode;
}

const DashBoardLayout: React.FC<DashBoardLayoutProps> = ({children}) => {
  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 overflow-y-auto'>
        
        <div className='mx-auto max-w-7xl p-6'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
