import { Routes, Route, Outlet } from 'react-router-dom'
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

import ReportMontlyPage from './pages/reports/pages/report-montly-page'
import ReportDailyRPage from './pages/reports/pages/report-daily-page'
import { ClientHistoryPage } from './pages/client/pages/history'
import { PaymentsPrintPage } from './pages/prints/pages/payments'
import { LoansPrint } from './pages/prints/pages/loans'

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
        <Route path="/arrears/:loanId" element={<CreateArrearPage />} />
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/clients/create" element={<CreateClientPage />} />
        <Route path="/clients/update/:id" element={<UpdateClientPage />} />
        <Route path="/clients/history/:id" element={<ClientHistoryPage />} />
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
        <Route path="/report/montly" element={<ReportMontlyPage />} />
        <Route path="/report/daily" element={<ReportDailyRPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/prints"
        element={
          <ProtectedRouteElement>
            <Outlet />
          </ProtectedRouteElement>
        }
      >
        <Route path="payments/:paymentId" element={<PaymentsPrintPage />} />
        <Route path="loans/:loanId" element={<LoansPrint />} />
      </Route>
    </Routes>
  )
}
