import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../contexts/AppContext';
import { SwapRequestCard } from '../components/Swap/SwapRequestCard';
import { GlassCard } from '../components/common/GlassCard';
import { Clock, MessageCircle, CheckCircle, X } from 'lucide-react';
import { useLocation } from 'wouter';

const SwapRequests = () => {
  const { isAuthenticated } = useAuth();
  const { swapRequests, fetchSwapRequests } = useApp();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<'pending' | 'incoming' | 'active' | 'completed' | 'cancelled'>('pending');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    fetchSwapRequests();
  }, [isAuthenticated, navigate, fetchSwapRequests]);

  if (!isAuthenticated) {
    return null;
  }

  // Mock data for demonstration
  const mockRequests = [
    {
      id: 1,
      fromUserId: 2,
      toUserId: 1,
      offeredSkillId: 1,
      requestedSkillId: 2,
      message: 'Hi! I would love to learn React development from you. I have solid experience in Python and data science that I can teach in return.',
      status: 'pending' as const,
      preferredTime: 'Weekends, Morning',
      duration: '2 hours',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
      fromUser: {
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
      toUser: {
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
      offeredSkill: { id: 1, name: 'Python', category: 'Programming', description: 'Python programming language' },
      requestedSkill: { id: 2, name: 'React Development', category: 'Web Development', description: 'React.js framework' },
    },
    {
      id: 2,
      fromUserId: 1,
      toUserId: 3,
      offeredSkillId: 2,
      requestedSkillId: 3,
      message: 'I\'m interested in learning photography techniques. I can teach you React development and UI/UX design principles.',
      status: 'accepted' as const,
      preferredTime: 'Weekdays, Evening',
      duration: '3 hours',
      createdAt: '2024-01-10T00:00:00Z',
      updatedAt: '2024-01-12T00:00:00Z',
      fromUser: {
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
      toUser: {
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
      offeredSkill: { id: 2, name: 'React Development', category: 'Web Development', description: 'React.js framework' },
      requestedSkill: { id: 3, name: 'Photography', category: 'Creative', description: 'Photography techniques' },
    },
  ];

  const filterRequests = (requests: typeof mockRequests, tab: string) => {
    switch (tab) {
      case 'pending':
        return requests.filter(req => req.status === 'pending' && req.fromUserId === 1); // Outgoing
      case 'incoming':
        return requests.filter(req => req.status === 'pending' && req.toUserId === 1); // Incoming
      case 'active':
        return requests.filter(req => req.status === 'accepted');
      case 'completed':
        return requests.filter(req => req.status === 'completed');
      case 'cancelled':
        return requests.filter(req => req.status === 'rejected' || req.status === 'cancelled');
      default:
        return requests;
    }
  };

  const filteredRequests = filterRequests(mockRequests, activeTab);

  const tabs = [
    { id: 'pending', label: 'Pending Requests', icon: Clock, count: filterRequests(mockRequests, 'pending').length },
    { id: 'incoming', label: 'Incoming Requests', icon: MessageCircle, count: filterRequests(mockRequests, 'incoming').length },
    { id: 'active', label: 'Active Swaps', icon: CheckCircle, count: filterRequests(mockRequests, 'active').length },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: filterRequests(mockRequests, 'completed').length },
    { id: 'cancelled', label: 'Cancelled', icon: X, count: filterRequests(mockRequests, 'cancelled').length },
  ];

  return (
    <div className="min-h-screen pt-8 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Swap Requests</h1>
          <p className="text-gray-600">
            Manage your skill swap requests and track your progress
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <GlassCard className="p-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                    {tab.count > 0 && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activeTab === tab.id
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-100/50 text-blue-600'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {filteredRequests.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No {activeTab} requests
              </h3>
              <p className="text-gray-600">
                {activeTab === 'pending' && 'You don\'t have any pending requests.'}
                {activeTab === 'incoming' && 'You don\'t have any incoming requests.'}
                {activeTab === 'active' && 'You don\'t have any active swaps.'}
                {activeTab === 'completed' && 'You haven\'t completed any swaps yet.'}
                {activeTab === 'cancelled' && 'You don\'t have any cancelled requests.'}
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredRequests.map((request) => (
                <SwapRequestCard
                  key={request.id}
                  swapRequest={request}
                  type={
                    activeTab === 'incoming' ? 'incoming' :
                    activeTab === 'active' ? 'active' :
                    activeTab === 'completed' ? 'completed' :
                    'outgoing'
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapRequests;
