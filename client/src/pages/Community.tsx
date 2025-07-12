import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { UserCard } from '../components/User/UserCard';
import { 
  Users, 
  TrendingUp, 
  Award, 
  MessageCircle, 
  Calendar,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock community stats
  const stats = [
    { icon: Users, label: 'Active Members', value: '12,847', growth: '+15%' },
    { icon: TrendingUp, label: 'Swaps This Month', value: '2,341', growth: '+23%' },
    { icon: Award, label: 'Skills Shared', value: '456', growth: '+8%' },
    { icon: MessageCircle, label: 'Messages Sent', value: '89,234', growth: '+31%' }
  ];

  // Mock featured members
  const featuredMembers = [
    {
      id: 1,
      first_name: 'Sarah',
      last_name: 'Johnson',
      username: 'sarahj',
      email: 'sarah@example.com',
      profile_image: '',
      availability: ['weekdays', 'evenings'],
      is_banned: false,
      is_privete: false,
      is_active: true,
      is_staff: false,
      is_superuser: false,
      date_joined: '2024-01-15T00:00:00Z',
      last_login: '2024-01-15T00:00:00Z',
      skills: ['React', 'JavaScript', 'UI/UX Design']
    },
    {
      id: 2,
      first_name: 'Marcus',
      last_name: 'Chen',
      username: 'marcusc',
      email: 'marcus@example.com',
      profile_image: '',
      availability: ['weekends', 'mornings'],
      is_banned: false,
      is_privete: false,
      is_active: true,
      is_staff: false,
      is_superuser: false,
      date_joined: '2024-01-15T00:00:00Z',
      last_login: '2024-01-15T00:00:00Z',
      skills: ['Python', 'Machine Learning', 'Data Analysis']
    },
    {
      id: 3,
      first_name: 'Emily',
      last_name: 'Rodriguez',
      username: 'emilyr',
      email: 'emily@example.com',
      profile_image: '',
      availability: ['weekdays', 'afternoons'],
      is_banned: false,
      is_privete: false,
      is_active: true,
      is_staff: false,
      is_superuser: false,
      date_joined: '2024-01-15T00:00:00Z',
      last_login: '2024-01-15T00:00:00Z',
      skills: ['Photography', 'Graphic Design', 'Digital Art']
    }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'swap_completed',
      user: 'Alex Thompson',
      activity: 'completed a JavaScript swap with Maria Santos',
      time: '2 hours ago',
      rating: 5
    },
    {
      id: 2,
      type: 'new_member',
      user: 'David Kim',
      activity: 'joined the community',
      time: '4 hours ago',
      skills: ['Flutter', 'Mobile Development']
    },
    {
      id: 3,
      type: 'skill_added',
      user: 'Lisa Park',
      activity: 'added Digital Marketing to their skills',
      time: '6 hours ago'
    },
    {
      id: 4,
      type: 'swap_scheduled',
      user: 'James Wilson',
      activity: 'scheduled a Python swap with Rachel Adams',
      time: '8 hours ago'
    },
    {
      id: 5,
      type: 'milestone',
      user: 'Sofia Garcia',
      activity: 'reached 50 completed swaps!',
      time: '12 hours ago'
    }
  ];

  // Mock trending skills
  const trendingSkills = [
    { name: 'React Development', swaps: 156, growth: '+25%' },
    { name: 'Python Programming', swaps: 143, growth: '+18%' },
    { name: 'UI/UX Design', swaps: 128, growth: '+22%' },
    { name: 'Digital Marketing', swaps: 97, growth: '+45%' },
    { name: 'Photography', swaps: 89, growth: '+12%' },
    { name: 'Data Analysis', swaps: 76, growth: '+35%' }
  ];

  // Mock upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Web Development Workshop',
      date: '2024-01-20T14:00:00Z',
      attendees: 45,
      maxAttendees: 50,
      host: 'Sarah Johnson',
      description: 'Learn modern web development practices and React best practices.'
    },
    {
      id: 2,
      title: 'Python for Beginners',
      date: '2024-01-22T16:00:00Z',
      attendees: 32,
      maxAttendees: 40,
      host: 'Marcus Chen',
      description: 'Introduction to Python programming for complete beginners.'
    },
    {
      id: 3,
      title: 'Photography Masterclass',
      date: '2024-01-25T18:00:00Z',
      attendees: 28,
      maxAttendees: 30,
      host: 'Emily Rodriguez',
      description: 'Advanced photography techniques and composition tips.'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Activities' },
    { key: 'swaps', label: 'Swaps' },
    { key: 'members', label: 'New Members' },
    { key: 'skills', label: 'Skills' },
    { key: 'events', label: 'Events' }
  ];

  const filteredActivities = selectedCategory === 'all' 
    ? recentActivities 
    : recentActivities.filter(activity => {
        if (selectedCategory === 'swaps') return activity.type.includes('swap');
        if (selectedCategory === 'members') return activity.type === 'new_member';
        if (selectedCategory === 'skills') return activity.type === 'skill_added';
        if (selectedCategory === 'events') return activity.type === 'event';
        return true;
      });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'swap_completed':
        return <Award className="w-5 h-5 text-green-600" />;
      case 'new_member':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'skill_added':
        return <Star className="w-5 h-5 text-purple-600" />;
      case 'swap_scheduled':
        return <Calendar className="w-5 h-5 text-orange-600" />;
      case 'milestone':
        return <TrendingUp className="w-5 h-5 text-red-600" />;
      default:
        return <MessageCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            SkillSwap Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with passionate learners and skilled teachers from around the world. 
            Share knowledge, build relationships, and grow together.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <GlassCard key={index} className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {stat.label}
              </div>
              <div className="text-xs text-green-600 font-medium">
                {stat.growth} this month
              </div>
            </GlassCard>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Members */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Featured Members</h2>
                <Link href="/search">
                  <GlassButton variant="secondary" size="sm">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </GlassButton>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredMembers.map((member) => (
                  <UserCard
                    key={member.id}
                    user={member}
                    onRequestSwap={() => {}}
                    className="transform hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-1 glass-input text-sm"
                  >
                    {categories.map(category => (
                      <option key={category.key} value={category.key}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <GlassCard className="p-6">
                <div className="space-y-4">
                  {filteredActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/20 transition-colors">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800">
                          <span className="font-medium">{activity.user}</span> {activity.activity}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-3 h-3" />
                          <span>{activity.time}</span>
                          {activity.rating && (
                            <>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span>{activity.rating}</span>
                              </div>
                            </>
                          )}
                          {activity.skills && (
                            <>
                              <span>•</span>
                              <span>{activity.skills.join(', ')}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Trending Skills</h2>
              <GlassCard className="p-6">
                <div className="space-y-4">
                  {trendingSkills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{skill.name}</div>
                        <div className="text-sm text-gray-600">{skill.swaps} swaps</div>
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        {skill.growth}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <GlassCard key={event.id} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{event.title}</h3>
                      <span className="text-xs text-gray-500">
                        {event.attendees}/{event.maxAttendees}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="text-gray-600">
                        by {event.host}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>

            {/* Join Community CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <GlassCard className="p-6 text-center bg-gradient-to-r from-blue-600/10 to-teal-600/10 border-blue-200/50">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Ready to Join?
                </h3>
                <p className="text-gray-600 mb-4">
                  Start connecting with amazing people and expand your skills today.
                </p>
                <Link href="/search">
                  <GlassButton variant="primary" className="w-full">
                    Get Started
                  </GlassButton>
                </Link>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;