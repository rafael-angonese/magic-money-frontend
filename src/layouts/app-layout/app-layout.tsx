import Header from '@/components/header/header'
import React, { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col">{children}</div>
    </>
  )
}

export default AppLayout
