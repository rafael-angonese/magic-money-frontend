import RootLayout from '@/layouts/root-layout/root-layout'
import HomePage from '@/pages/home/home-page'
import LoginPage from '@/pages/login/login-page'
import PrivateRoute from '@/routes/private-route'
import PublicRoute from '@/routes/public-route'
import SelectAccountGroup from '@/routes/select-account-group'
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
            <Route element={<SelectAccountGroup />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/teste" element={<HomePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RootLayout>
  )
}

export default AppRouter
