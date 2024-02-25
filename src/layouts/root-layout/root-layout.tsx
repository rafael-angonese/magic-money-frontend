import React, { ReactNode } from 'react'

import { ThemeProvider } from '@/components/ui/theme/theme-provider'

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider>
        <div className="flex flex-col h-screen w-screen antialiased">
          {children}
        </div>
      </ThemeProvider>
    </>
  )
}

export default RootLayout
