import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '@/store/use-auth-store'

const PublicRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PublicRoute
