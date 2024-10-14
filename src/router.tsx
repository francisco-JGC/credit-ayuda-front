import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home'
import LoginPage from './pages/login'

export default function Router() {

  return (
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route index path="/login" element={<LoginPage />} />
    </Routes>
  )
}