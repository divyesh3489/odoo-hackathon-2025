import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { GlassInput } from '../components/common/GlassInput';
import { Bell, Shield, User, Moon, Sun, Globe, Trash2 } from 'lucide-react';
import { useLocation } from 'wouter';
import { useToast } from '../hooks/use-toast';

const Settings = () => {
  const { isAuthenticated, user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      swapRequests: true,
      messages: true,
      reminders: false,
    },
    privacy: {
      profileVisibility: 'public',
      showLocation: true,
      showEmail: false,
      showRating: true,
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC',
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleSaveSettings = () => {
    // In a real app, you'd save these settings to your backend
    toast({
      title: "Settings saved!",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, you'd call your delete account API
      toast({
        title: "Account deletion requested",
        description: "Your account deletion request has been submitted.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100/50 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Account Settings</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <GlassInput
                    label="Email Address"
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="bg-gray-50/50"
                  />
                  <GlassInput
                    label="Username"
                    value={user?.username || ''}
                    readOnly
                    className="bg-gray-50/50"
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <h3 className="font-medium text-gray-800">Change Password</h3>
                    <p className="text-sm text-gray-600">Update your password regularly for security</p>
                  </div>
                  <GlassButton variant="secondary">
                    Update Password
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100/50 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
              </div>

              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {key === 'email' && 'Receive notifications via email'}
                        {key === 'push' && 'Receive push notifications in your browser'}
                        {key === 'swapRequests' && 'Get notified about new swap requests'}
                        {key === 'messages' && 'Get notified about new messages'}
                        {key === 'reminders' && 'Receive reminders about upcoming swaps'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            [key]: e.target.checked
                          }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100/50 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Privacy</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Profile Visibility</h3>
                    <p className="text-sm text-gray-600">Control who can see your profile</p>
                  </div>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      privacy: {
                        ...prev.privacy,
                        profileVisibility: e.target.value
                      }
                    }))}
                    className="px-3 py-2 glass-input text-gray-700"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>

                {['showLocation', 'showEmail', 'showRating'].map((key) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {key === 'showLocation' && 'Show Location'}
                        {key === 'showEmail' && 'Show Email'}
                        {key === 'showRating' && 'Show Rating'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {key === 'showLocation' && 'Display your location on your profile'}
                        {key === 'showEmail' && 'Make your email visible to other users'}
                        {key === 'showRating' && 'Display your rating and reviews'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy[key as keyof typeof settings.privacy] as boolean}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          privacy: {
                            ...prev.privacy,
                            [key]: e.target.checked
                          }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-teal-100/50 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-teal-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Preferences</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Theme</h3>
                    <p className="text-sm text-gray-600">Choose your preferred theme</p>
                  </div>
                  <select
                    value={settings.preferences.theme}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        theme: e.target.value
                      }
                    }))}
                    className="px-3 py-2 glass-input text-gray-700"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Language</h3>
                    <p className="text-sm text-gray-600">Select your preferred language</p>
                  </div>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        language: e.target.value
                      }
                    }))}
                    className="px-3 py-2 glass-input text-gray-700"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Timezone</h3>
                    <p className="text-sm text-gray-600">Your local timezone</p>
                  </div>
                  <select
                    value={settings.preferences.timezone}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        timezone: e.target.value
                      }
                    }))}
                    className="px-3 py-2 glass-input text-gray-700"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <GlassCard className="p-6 border-red-200/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-100/50 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Danger Zone</h2>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-600">Delete Account</h3>
                  <p className="text-sm text-gray-600">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <GlassButton
                  variant="secondary"
                  onClick={handleDeleteAccount}
                  className="text-red-600 border-red-200/50 hover:bg-red-50/50"
                >
                  Delete Account
                </GlassButton>
              </div>
            </GlassCard>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-end"
          >
            <GlassButton
              variant="primary"
              onClick={handleSaveSettings}
              className="px-8"
            >
              Save Settings
            </GlassButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
