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
        <Route path="/loans" element={<LoanPage />} />
        <Route path="/loans/create" element={<CreateLoanPage />} />
        <Route path="/loans/details/:id" element={<DetailsLoanPage />} />
        <Route path="/loans/payments/:id" element={<PaymentsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}
