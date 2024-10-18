import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import ClientPage from './pages/client'
import ProtectedRoute from './components/protectedRoute'
import CreateClientPage from './pages/client/createClientPage'
import RoutesPage from './pages/routes'
import CreateRoutePage from './pages/routes/createRoutePage'
import LoanPage from './pages/loan'
import CreateLoanPage from './pages/loan/createLoanPage'

export default function Router() {

  return (
    <Routes>
      <Route index path="/" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />

      <Route index path="/clients" element={
        <ProtectedRoute>
          <ClientPage />
        </ProtectedRoute>
      } />

      <Route path='/clients/create' element={
        <ProtectedRoute>
          <CreateClientPage />
        </ProtectedRoute>
      } />

      <Route path='/routes' element={
        <ProtectedRoute>
          <RoutesPage />
        </ProtectedRoute>
      } />

      <Route path='/routes/create' element={
        <ProtectedRoute>
          <CreateRoutePage />
        </ProtectedRoute>
      } />

      <Route path='/loans' element={
        <ProtectedRoute>
          <LoanPage />
        </ProtectedRoute>
      } />

      <Route path='/loans/create' element={
        <ProtectedRoute>
          <CreateLoanPage />
        </ProtectedRoute>
      } />


      <Route index path="/login" element={<LoginPage />} />
    </Routes>
  )
}