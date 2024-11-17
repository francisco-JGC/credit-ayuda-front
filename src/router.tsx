import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/protectedRoute'
import { ReactNode } from 'react'

import HomePage from './pages/home'
import LoginPage from './pages/login'

import ClientPage from './pages/client'
import CreateClientPage from './pages/client/createClientPage'
import UpdateClientPage from './pages/client/updateClientPage'

import RoutesPage from './pages/routes'
import CreateRoutePage from './pages/routes/createRoutePage'
import UpdateRoutePage from './pages/routes/updateRoutePage'

import LoanPage from './pages/loan'
import CreateLoanPage from './pages/loan/createLoanPage'
import DetailsLoanPage from './pages/loan/detailsLoanPage'
import { DashboardLayout } from './components/root-layout'
import { PaymentsPage } from './pages/payments/page'
import { RequestsPage } from './pages/requests/pages'
import { CreateArrearPage } from './pages/arrears/pages/create-arrear'
import { ProfilePage } from './pages/profile/pages/profile-page'
import { UsersPage } from './pages/users/pages/users-page'
import MyRoutePage from './pages/routes/myRoutePage'

function ProtectedRouteElement({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRouteElement>
            <DashboardLayout />
          </ProtectedRouteElement>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/clients/create" element={<CreateClientPage />} />
        <Route path="/clients/update/:id" element={<UpdateClientPage />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/routes/create" element={<CreateRoutePage />} />
        <Route path="/routes/update/:id" element={<UpdateRoutePage />} />
        <Route path="/routes/my-route/" element={<MyRoutePage />} />
        <Route path="/loans" element={<LoanPage />} />
        <Route path="/loans/create" element={<CreateLoanPage />} />
        <Route path="/loans/details/:id" element={<DetailsLoanPage />} />
        <Route path="/loans/payments/:id" element={<PaymentsPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/arrears/create/:loanId" element={<CreateArrearPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}
