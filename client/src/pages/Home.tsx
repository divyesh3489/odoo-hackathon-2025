import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import { SearchBar } from '../components/common/SearchBar';
import { UserCard } from '../components/User/UserCard';
import { Pagination } from '../components/common/Pagination';
import { SwapRequestModal } from '../components/Swap/SwapRequestModal';
import { LoginModal } from '../components/Auth/LoginModal';
import { RegisterModal } from '../components/Auth/RegisterModal';
import { ForgotPasswordModal } from '../components/Auth/ForgotPasswordModal';
import { GlassCard } from '../components/common/GlassCard';
import { Users, CheckCircle, Star } from 'lucide-react';

const Home = () => {
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  
  // Mock data for demonstration
  const mockUsers = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      location: 'San Francisco, CA',
      rating: 4.9,
      completedSwaps: 23,
      profilePhoto: '',
      bio: 'Passionate developer with expertise in React and UI/UX design.',
      isActive: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
    {
      id: 2,
      firstName: 'Marcus',
      lastName: 'Chen',
      email: 'marcus@example.com',
      location: 'New York, NY',
      rating: 4.8,
      completedSwaps: 31,
      profilePhoto: '',
      bio: 'Data scientist with a passion for machine learning and Python.',
      isActive: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
    {
      id: 3,
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily@example.com',
      location: 'Austin, TX',
      rating: 4.9,
      completedSwaps: 18,
      profilePhoto: '',
      bio: 'Creative designer specializing in graphic design and photography.',
      isActive: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
  ];

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleRequestSwap = (userId: number) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setSelectedUserId(userId);
  };

  const popularSkills = [
    { name: 'Web Development', color: 'blue' },
    { name: 'Digital Marketing', color: 'green' },
    { name: 'Graphic Design', color: 'purple' },
    { name: 'Photography', color: 'orange' },
    { name: 'Data Science', color: 'pink' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-12 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Exchange Skills,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Build Community
              </span>
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Connect with skilled professionals, learn new abilities, and share your expertise in a collaborative environment.
            </motion.p>

            <SearchBar onSearch={handleSearch} className="mb-8" />

            {/* Popular Skills Tags */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {popularSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100/50 backdrop-blur-sm border border-blue-200/50 text-blue-700 rounded-full text-sm hover:bg-blue-100/70 transition-colors cursor-pointer"
                  onClick={() => handleSearch(skill.name)}
                >
                  {skill.name}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Users Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h3
            className="text-3xl font-bold text-gray-800 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Connect with Skilled Professionals
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {mockUsers.map((user) => (
              <UserCard
                key={user.id}
                user={{
                  ...user,
                  username: `${user.firstName} ${user.lastName}`,
                }}
                onRequestSwap={handleRequestSwap}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-50/30 to-teal-50/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.h3
              className="text-3xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Your Skill Exchange Dashboard
            </motion.h3>
            <motion.p
              className="text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Manage your swaps, track progress, and build your professional network
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Swaps</p>
                  <p className="text-2xl font-bold text-gray-800">3</p>
                </div>
                <div className="w-12 h-12 bg-blue-100/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Swaps</p>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                </div>
                <div className="w-12 h-12 bg-green-100/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-gray-800">4.8</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
        onSwitchToForgotPassword={() => {
          setShowLoginModal(false);
          setShowForgotPasswordModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />

      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        onSwitchToLogin={() => {
          setShowForgotPasswordModal(false);
          setShowLoginModal(true);
        }}
      />

      {selectedUserId && (
        <SwapRequestModal
          isOpen={!!selectedUserId}
          onClose={() => setSelectedUserId(null)}
          targetUserId={selectedUserId}
        />
      )}
    </div>
  );
};

export default Home;
