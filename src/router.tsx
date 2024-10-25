import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import { ReactNode } from 'react';

import HomePage from './pages/home';
import LoginPage from './pages/login';

import ClientPage from './pages/client';
import CreateClientPage from './pages/client/createClientPage';
import UpdateClientPage from './pages/client/updateClientPage';

import RoutesPage from './pages/routes';
import CreateRoutePage from './pages/routes/createRoutePage';
import UpdateRoutePage from './pages/routes/updateRoutePage';

import LoanPage from './pages/loan';
import CreateLoanPage from './pages/loan/createLoanPage';
import DetailsLoanPage from './pages/loan/detailsLoanPage';

function ProtectedRouteElement({ element }: { element: ReactNode }) {
  return <ProtectedRoute>{element}</ProtectedRoute>;
}

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRouteElement element={<HomePage />} />} />
      <Route path="/clients" element={<ProtectedRouteElement element={<ClientPage />} />} />
      <Route path="/clients/create" element={<ProtectedRouteElement element={<CreateClientPage />} />} />
      <Route path="/clients/update/:id" element={<ProtectedRouteElement element={<UpdateClientPage />} />} />
      <Route path="/routes" element={<ProtectedRouteElement element={<RoutesPage />} />} />
      <Route path="/routes/create" element={<ProtectedRouteElement element={<CreateRoutePage />} />} />
      <Route path="/routes/update/:id" element={<ProtectedRouteElement element={<UpdateRoutePage />} />} />
      <Route path="/loans" element={<ProtectedRouteElement element={<LoanPage />} />} />
      <Route path="/loans/create" element={<ProtectedRouteElement element={<CreateLoanPage />} />} />
      <Route path="/loans/details/:id" element={<ProtectedRouteElement element={<DetailsLoanPage />} />} />

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
