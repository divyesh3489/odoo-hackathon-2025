import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Zap, Menu, X, Bell, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { GlassButton } from '../common/GlassButton';
import { useApp } from '../../contexts/AppContext';
import { LoginModal } from '../Auth/LoginModal';
import { RegisterModal } from '../Auth/RegisterModal';
import { ForgotPasswordModal } from '../Auth/ForgotPasswordModal';

export const Navigation = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { notifications } = useApp();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">SkillSwap</h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/search">
              <a className={`transition-colors ${location === '/search' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                Browse Skills
              </a>
            </Link>
            <Link href="/how-it-works">
              <a className={`transition-colors ${location === '/how-it-works' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                How It Works
              </a>
            </Link>
            <Link href="/community">
              <a className={`transition-colors ${location === '/community' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                Community
              </a>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Link href="/notifications">
                  <motion.div
                    className="relative p-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bell className="w-5 h-5 text-gray-700" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </motion.div>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <motion.button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {user?.profile_image ? (
                      <img
                        src={user.profile_image}
                        alt={user.first_name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="text-gray-700 font-medium hidden sm:block">
                      {user?.first_name}
                    </span>
                  </motion.button>

                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white/25 backdrop-blur-lg border border-white/30 rounded-xl shadow-xl py-2"
                    >
                      <Link href="/dashboard">
                        <a className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-white/20 transition-colors">
                          <User className="w-4 h-4" />
                          <span>Dashboard</span>
                        </a>
                      </Link>
                      <Link href="/profile">
                        <a className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-white/20 transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>Profile</span>
                        </a>
                      </Link>
                      <Link href="/settings">
                        <a className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-white/20 transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </a>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-white/20 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <>
                <GlassButton
                  onClick={() => setIsLoginOpen(true)}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign In
                </GlassButton>
                <GlassButton
                  onClick={() => setIsRegisterOpen(true)}
                  variant="primary"
                  className="hover-lift"
                >
                  Get Started
                </GlassButton>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 py-4 border-t border-white/20"
          >
            <div className="flex flex-col space-y-2">
              <Link href="/search">
                <a className="block px-4 py-2 text-gray-700 hover:bg-white/20 rounded-lg transition-colors">
                  Browse Skills
                </a>
              </Link>
              <Link href="/how-it-works">
                <a className="block px-4 py-2 text-gray-700 hover:bg-white/20 rounded-lg transition-colors">
                  How It Works
                </a>
              </Link>
              <Link href="/community">
                <a className="block px-4 py-2 text-gray-700 hover:bg-white/20 rounded-lg transition-colors">
                  Community
                </a>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        onSwitchToForgotPassword={() => {
          setIsLoginOpen(false);
          setIsForgotPasswordOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onSwitchToLogin={() => {
          setIsForgotPasswordOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </nav>
  );
};
