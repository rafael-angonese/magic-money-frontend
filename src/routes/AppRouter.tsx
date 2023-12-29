import RootLayout from '@/layouts/RootLayout/RootLayout'
import HomePage from '@/pages/home/HomePage'
import LoginPage from '@/pages/login/LoginPage'
import PrivateRoute from '@/routes/PrivateRoute'
import PublicRoute from '@/routes/PublicRoute'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AppRouter: React.FC = () => {
  return (
    <RootLayout>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/teste" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RootLayout>
  )
}

export default AppRouter
