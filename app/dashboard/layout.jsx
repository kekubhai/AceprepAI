import React from 'react';
import Sidebar from './_components/Sidebar';
import Header from './_components/Header';

const DashBoardLayout = ({children}) => {
  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 overflow-y-auto'>
        <Header />
        <div className='mx-auto max-w-7xl p-6'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashBoardLayout
