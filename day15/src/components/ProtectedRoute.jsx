// Day 15: Protected Route Component
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If route requires authentication but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login with the current location as state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route doesn't require authentication but user is authenticated (e.g., login page)
  if (!requireAuth && isAuthenticated) {
    // Redirect to dashboard or previous location
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return children;
};

export default ProtectedRoute;