import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute: React.FC = () => {
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />
  }

  return <Outlet />
}

export default PrivateRoute
