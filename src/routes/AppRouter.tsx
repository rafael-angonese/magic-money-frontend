import HomePage from '@/pages/Home/HomePage'
import LoginPage from '@/pages/Login/LoginPage'
import PrivateRoute from '@/routes/PrivateRoute'
import PublicRoute from '@/routes/PublicRoute'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AppRouter: React.FC = () => {
  return (
    <>
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
    </>
  )
}

export default AppRouter
