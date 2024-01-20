import AppLayout from '@/layouts/AppLayout/AppLayout'
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}

export default PrivateRoute
