import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AppLayout from '@/layouts/app-layout/app-layout'
import RootLayout from '@/layouts/root-layout/root-layout'
import { EditBankAccountPage } from '@/pages/bank-accounts/edit/edit-bank-account-page'
import { ListBankAccountsPage } from '@/pages/bank-accounts/list/list-bank-accounts-page'
import { NewBankAccountPage } from '@/pages/bank-accounts/new/new-bank-account-page'
import { ListCategoriesPage } from '@/pages/categories/list/list-categories-page'
import { EditDocumentPage } from '@/pages/documents/edit/edit-document-page'
import { ListDocumentsPage } from '@/pages/documents/list/list-documents-page'
import { NewDocumentPage } from '@/pages/documents/new/new-document-page'
import HomePage from '@/pages/home/home-page'
import LoginPage from '@/pages/login/login-page'
import ListTransactionsPage from '@/pages/transactions/list/list-transactions-page'
import { ListUsersPage } from '@/pages/users/list/list-users-page'
import PrivateRoute from '@/routes/private-route'
import PublicRoute from '@/routes/public-route'

const AppRouter: React.FC = () => {
  return (
    <RootLayout>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/transactions" element={<ListTransactionsPage />} />

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

              <Route path="/documents" element={<ListDocumentsPage />} />
              <Route path="/documents/new" element={<NewDocumentPage />} />
              <Route
                path="/documents/edit/:id"
                element={<EditDocumentPage />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RootLayout>
  )
}

export default AppRouter
