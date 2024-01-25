import { queryClient } from '@/lib/query-client'
import AppRouter from '@/routes/app-router'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
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
