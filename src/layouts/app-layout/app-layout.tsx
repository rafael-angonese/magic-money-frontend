import Header from '@/components/header/header'
import { Sidebar } from '@/components/sidebar/sidebar'
import { useAccountStore } from '@/store/use-account-store'
import React from 'react'
import { Outlet, RouteProps } from 'react-router-dom'

const AppLayout: React.FC<RouteProps> = () => {
  const { account } = useAccountStore()
  return (
    <>
      <Header />
      <div className="flex flex-1 h-[calc(100vh-5rem)]">
        {account && <Sidebar />}
        <main className="flex-1 overflow-y-auto text-foreground bg-background">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default AppLayout
