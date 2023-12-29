import React, { ReactNode } from 'react'

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  return (
    <>
      <div className="flex min-h-screen bg-white text-black dark:text-white dark:bg-black">
        {children}
      </div>
    </>
  )
}

export default RootLayout
