import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import AdminPage from '../Pages/AdminPage';

const PrivateRoutes = ({ searchTerm, onSearchChange }: { searchTerm: string; onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role === 'admin') {
    return (
      <AdminPage searchTerm={searchTerm} onSearchChange={onSearchChange}>
        <Outlet />
      </AdminPage>
    );
  }

  if (role === 'client') {
    return <Navigate to="/productPage" />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoutes;
