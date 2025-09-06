// Day 15: Navigation Component
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">🔐</span>
              <span className="ml-2 text-xl font-bold text-gray-900">Day 15</span>
            </Link>

            {/* Main navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActiveRoute('/') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActiveRoute('/dashboard') 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActiveRoute('/profile') 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    Profile
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* User info */}
                <div className="hidden md:flex md:items-center md:space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.firstName?.charAt(0) || user?.username?.charAt(0) || '?'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.username}
                  </span>
                </div>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveRoute('/login')
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveRoute('/register')
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isAuthenticated && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActiveRoute('/dashboard')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActiveRoute('/profile')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;