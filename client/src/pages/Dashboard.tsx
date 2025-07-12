import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { ActivityCard } from '../components/Dashboard/ActivityCard';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { Users, CheckCircle, Star, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import { useLocation } from 'wouter';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [, navigate] = useLocation();

  if (!isAuthenticated) {
    return null;
  }

  // Mock data for demonstration
  const mockActivities = [
    {
      id: '1',
      type: 'message' as const,
      title: 'New swap request from John Doe',
      description: 'Wants to learn React Development',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      user: { name: 'John Doe' },
    },
    {
      id: '2',
      type: 'swap_completed' as const,
      title: 'Completed swap with Alice Smith',
      description: 'Photography session finished',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      user: { name: 'Alice Smith' },
    },
    {
      id: '3',
      type: 'review_received' as const,
      title: 'New review received',
      description: 'Rated 5 stars for UI/UX Design teaching',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const mockUpcomingSwaps = [
    {
      id: '1',
      title: 'React Development Session',
      participant: 'Sarah Johnson',
      date: 'Tomorrow, 2:00 PM',
      skill: 'React Development',
    },
    {
      id: '2',
      title: 'Photography Workshop',
      participant: 'Mike Wilson',
      date: 'Friday, 10:00 AM',
      skill: 'Photography',
    },
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.first_name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your skill swaps
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Swaps"
            value={3}
            icon={Users}
            color="blue"
            change={{ value: 12, trend: 'up' }}
          />
          <StatsCard
            title="Completed Swaps"
            value={12}
            icon={CheckCircle}
            color="green"
            change={{ value: 8, trend: 'up' }}
          />
          <StatsCard
            title="Average Rating"
            value="4.8"
            icon={Star}
            color="yellow"
            change={{ value: 5, trend: 'up' }}
          />
          <StatsCard
            title="Skills Taught"
            value={7}
            icon={TrendingUp}
            color="purple"
            change={{ value: 2, trend: 'up' }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Swaps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Upcoming Swaps</h3>
                  <GlassButton
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/swap-requests')}
                  >
                    View All
                  </GlassButton>
                </div>
                
                <div className="space-y-3">
                  {mockUpcomingSwaps.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No upcoming swaps scheduled</p>
                    </div>
                  ) : (
                    mockUpcomingSwaps.map((swap) => (
                      <div
                        key={swap.id}
                        className="flex items-center space-x-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/15 transition-colors"
                      >
                        <div className="w-10 h-10 bg-blue-100/50 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{swap.title}</h4>
                          <p className="text-sm text-gray-600">
                            with {swap.participant} • {swap.date}
                          </p>
                        </div>
                        <GlassButton size="sm" variant="secondary">
                          Join
                        </GlassButton>
                      </div>
                    ))
                  )}
                </div>
              </GlassCard>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <GlassButton
                    variant="primary"
                    className="justify-start"
                    onClick={() => navigate('/search')}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Find New Skills
                  </GlassButton>
                  <GlassButton
                    variant="secondary"
                    className="justify-start"
                    onClick={() => navigate('/profile')}
                  >
                    <Star className="w-5 h-5 mr-2" />
                    Update Profile
                  </GlassButton>
                  <GlassButton
                    variant="secondary"
                    className="justify-start"
                    onClick={() => navigate('/swap-requests')}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    View Requests
                  </GlassButton>
                  <GlassButton
                    variant="secondary"
                    className="justify-start"
                    onClick={() => navigate('/settings')}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Manage Schedule
                  </GlassButton>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ActivityCard activities={mockActivities} />
            
            {/* Achievement Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Skill Sharer
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    You've completed 10+ skill swaps! Keep sharing your knowledge.
                  </p>
                  <div className="w-full bg-gray-200/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    15/20 swaps to next level
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
