import AppLayout from '@/layouts/AppLayout/AppLayout'
import { useAuthStore } from '@/store/useAuthStore'
import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isLoadingCheck, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoadingCheck) {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    )
  }

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
