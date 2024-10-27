import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '@/hooks/useAuthContext';
import LoadingScreen from "@/utils/loadingScreen";
import useRouteAuth from '@/hooks/useRoutesContext';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();
  const route = useRouteAuth();

  if (isAuthenticated === null) {
    // Optionally render a loading spinner or nothing while checking authentication
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (route === null) {
    return <LoadingScreen />;
  }

  if (!route) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
