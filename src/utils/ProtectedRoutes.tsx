import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import AdminPage from '../Pages/AdminPage';

const PrivateRoutes = ({ searchTerm, onSearchChange }: { searchTerm: string; onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <AdminPage searchTerm={searchTerm} onSearchChange={onSearchChange}>
      <Outlet />
    </AdminPage>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
