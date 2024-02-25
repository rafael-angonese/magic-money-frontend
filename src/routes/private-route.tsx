import React, { useEffect } from 'react'

import { Loader2 } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '@/store/use-auth-store'

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

  return <Outlet />
}

export default PrivateRoute
