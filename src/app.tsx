import React from 'react'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/query-client'
import AppRouter from '@/routes/app-router'
import './index.css'

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </>
  )
}

export default App
