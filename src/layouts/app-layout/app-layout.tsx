import React from 'react'

import { Outlet, RouteProps } from 'react-router-dom'

import Header from '@/components/header/header'
import { Sidebar } from '@/components/sidebar/sidebar'

const AppLayout: React.FC<RouteProps> = () => {
  return (
    <>
      <Header />
      <div className="flex flex-1 h-[calc(100vh-5rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto text-foreground bg-background">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default AppLayout
