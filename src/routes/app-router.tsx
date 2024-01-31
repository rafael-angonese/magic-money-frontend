import RootLayout from '@/layouts/root-layout/root-layout'
import { EditBankAccountPage } from '@/pages/bank-accounts/edit/edit-bank-account-page'
import { ListBankAccountsPage } from '@/pages/bank-accounts/list/list-bank-accounts-page'
import { NewBankAccountPage } from '@/pages/bank-accounts/new/new-bank-account-page'
import { ListCategoriesPage } from '@/pages/categories/list/list-categories-page'
import HomePage from '@/pages/home/home-page'
import LoginPage from '@/pages/login/login-page'
import { TransactionsPage } from '@/pages/transactions/transactions-page'
import { ListUsersPage } from '@/pages/users/list/list-users-page'
import { ListAccountsPage } from '@/repositories/accounts/list/list-accounts-page'
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
              <Route path="/transactions" element={<TransactionsPage />} />

              <Route path="/bank-accounts" element={<ListBankAccountsPage />} />
              <Route
                path="/bank-accounts/new"
                element={<NewBankAccountPage />}
              />
              <Route
                path="/bank-accounts/edit/:id"
                element={<EditBankAccountPage />}
              />

              <Route path="/categories" element={<ListCategoriesPage />} />

              <Route path="/users" element={<ListUsersPage />} />

              <Route path="/accounts" element={<ListAccountsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RootLayout>
  )
}

export default AppRouter
