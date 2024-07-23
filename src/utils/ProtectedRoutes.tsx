import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import AdminPage from '../Pages/AdminPage';

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <AdminPage>
      <Outlet />
    </AdminPage>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
