import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import ClientPage from './pages/client'
import ProtectedRoute from './components/protectedRoute'

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
      <Route index path="/login" element={<LoginPage />} />
    </Routes>
  )
}