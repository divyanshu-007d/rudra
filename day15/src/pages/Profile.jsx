// Day 15: Profile Page
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update profile (in real app, this would call updateProfile from AuthContext)
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsChangingPassword(false);
    setProfileData({
      username: user?.username || '',
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || ''
    });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your account settings and personal information.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Message */}
          {message.text && (
            <div className={`rounded-md p-4 ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}>
                    {message.type === 'success' ? '✅' : '⚠️'}
                  </span>
                </div>
                <div className="ml-3">
                  <p className={`text-sm ${
                    message.type === 'success' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Profile Information */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleProfileSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Picture */}
                <div className="md:col-span-2 flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-gray-600">
                      {profileData.username ? profileData.username.charAt(0).toUpperCase() : '👤'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Profile Picture</p>
                    <button
                      type="button"
                      disabled={!isEditing}
                      className="mt-1 text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                    >
                      Change photo
                    </button>
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="City, Country"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Website */}
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={profileData.website}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="https://yourwebsite.com"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* Profile Form Buttons */}
              {isEditing && (
                <div className="mt-6 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Password Change */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Password</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Update your password to keep your account secure.
                </p>
              </div>
              {!isChangingPassword && (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="text-sm bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Change Password
                </button>
              )}
            </div>

            {isChangingPassword && (
              <form onSubmit={handlePasswordSubmit} className="p-6">
                <div className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Password Form Buttons */}
                <div className="mt-6 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </form>
            )}

            {!isChangingPassword && (
              <div className="p-6">
                <p className="text-sm text-gray-600">
                  Last changed: Never
                </p>
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Account Actions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <button
                  onClick={() => alert('Export data functionality would be implemented here')}
                  className="w-full text-left px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Export Account Data</p>
                      <p className="text-sm text-gray-600">Download a copy of your account data</p>
                    </div>
                    <span className="text-gray-400">📁</span>
                  </div>
                </button>

                <button
                  onClick={() => alert('Delete account functionality would be implemented here')}
                  className="w-full text-left px-4 py-3 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-900">Delete Account</p>
                      <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                    </div>
                    <span className="text-red-400">🗑️</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;