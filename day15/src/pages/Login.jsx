// Day 15: Login Page
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, error, loading, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.identifier || !formData.password) {
      return;
    }

    setIsLoading(true);
    
    const result = await login(formData.identifier, formData.password);
    
    if (result.success) {
      navigate(from, { replace: true });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <span className="text-2xl">🔐</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email/Username Input */}
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                Email or Username
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                required
                value={formData.identifier}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email or username"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-400">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading || !formData.identifier || !formData.password}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign up now
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-blue-400">💡</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-800">Demo Credentials</h4>
                <div className="mt-1 text-sm text-blue-700">
                  <p><strong>Email:</strong> demo@example.com</p>
                  <p><strong>Password:</strong> DemoPass123!</p>
                  <p className="text-xs mt-1 opacity-75">
                    Register a new account or use these demo credentials
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;