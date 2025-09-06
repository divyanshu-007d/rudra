// Day 15: Dashboard Page
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 1,
    activeUsers: 1,
    newSignups: 1
  });
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      action: 'Account created',
      timestamp: new Date(),
      details: 'Welcome to the platform!'
    }
  ]);

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = () => {
      // Simulate API call with timeout
      setTimeout(() => {
        setStats({
          totalUsers: Math.floor(Math.random() * 1000) + 100,
          activeUsers: Math.floor(Math.random() * 50) + 10,
          newSignups: Math.floor(Math.random() * 20) + 1
        });

        setRecentActivity([
          {
            id: 1,
            action: 'Profile updated',
            timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
            details: 'User information was updated successfully'
          },
          {
            id: 2,
            action: 'Login successful',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            details: 'Signed in from new device'
          },
          {
            id: 3,
            action: 'Account created',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            details: 'Welcome to the platform!'
          }
        ]);
      }, 1000);
    };

    loadDashboardData();
  }, []);

  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const handleQuickAction = (action) => {
    alert(`${action} clicked! This would navigate to the respective section.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user?.username}! 👋
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Here's what's happening with your account today.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  Last login: {formatRelativeTime(new Date(Date.now() - 10 * 60 * 1000))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats and Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Users */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl">👥</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Active Users */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">✅</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Today</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                  </div>
                </div>
              </div>

              {/* New Signups */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-xl">⭐</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">New Signups</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.newSignups}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => handleQuickAction('View Profile')}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl mb-2">👤</span>
                    <span className="text-sm font-medium text-gray-700">View Profile</span>
                  </button>
                  
                  <button
                    onClick={() => handleQuickAction('Settings')}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl mb-2">⚙️</span>
                    <span className="text-sm font-medium text-gray-700">Settings</span>
                  </button>
                  
                  <button
                    onClick={() => handleQuickAction('Analytics')}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl mb-2">📊</span>
                    <span className="text-sm font-medium text-gray-700">Analytics</span>
                  </button>
                  
                  <button
                    onClick={() => handleQuickAction('Support')}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl mb-2">🎧</span>
                    <span className="text-sm font-medium text-gray-700">Support</span>
                  </button>
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
              </div>
              <div className="p-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Username</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.username}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Member Since</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Account Status</dt>
                    <dd className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm">📝</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.details}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatRelativeTime(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Platform Status</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Server Status</span>
                    <span className="inline-flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <span className="inline-flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API Status</span>
                    <span className="inline-flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Operational
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;