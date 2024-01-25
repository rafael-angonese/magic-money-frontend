import { ThemeProvider } from '@/components/ui/theme/theme-provider'
import React, { ReactNode } from 'react'

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen bg-white text-black dark:text-white dark:bg-black">
          {children}
        </div>
      </ThemeProvider>
    </>
  )
}

export default RootLayout
