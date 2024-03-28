import Sidebar from '@/components/dashboard-layout/Sidebar'
import React, { ReactNode } from 'react'

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" flex h-screen flex-col   md:flex-row md:overflow-hidden">
      <div className=" w-20 flex-none border-gray-600 md:border-r lg:w-64">
        <Sidebar />
      </div>

      <div className="max-w-container mx-auto  w-full flex-1 flex-grow p-2 sm:p-2 md:mt-0 md:overflow-y-auto md:p-4">
        {children}
      </div>
    </div>
  )
}
export default DashboardLayout
