import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../contexts/AppContext';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { SkillTag } from '../components/common/SkillTag';
import { SwapRequestModal } from '../components/Swap/SwapRequestModal';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  MessageCircle, 
  Award, 
  Users, 
  Eye,
  Mail,
  Shield
} from 'lucide-react';
import { User } from '../types';

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { isAuthenticated, user: currentUser } = useAuth();
  const { fetchUserById } = useApp();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate('/search');
      return;
    }
    
    // Mock user data - in real app, this would come from fetchUserById
    const mockUser: User = {
      id: parseInt(id),
      username: 'emilyr',
      email: 'emily.rodriguez@example.com',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      location: 'Austin, TX',
      bio: 'Creative designer with 8+ years of experience in graphic design, photography, and digital art. I love sharing my knowledge and learning new skills from others. Currently exploring web development and looking to trade my design expertise for programming skills.',
      profilePhoto: '',
      rating: 4.9,
      completedSwaps: 18,
      isActive: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    };

    setUser(mockUser);
    setIsLoading(false);
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-pulse">
            <GlassCard className="p-8">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <GlassCard className="p-12 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">User not found</h1>
            <p className="text-gray-600 mb-6">The user you're looking for doesn't exist or has been removed.</p>
            <GlassButton onClick={() => navigate('/search')}>
              Back to Search
            </GlassButton>
          </GlassCard>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;

  // Mock skills data
  const offeredSkills = [
    'Graphic Design',
    'Photography',
    'Adobe Photoshop',
    'UI/UX Design',
    'Brand Identity',
    'Digital Art'
  ];

  const wantedSkills = [
    'React Development',
    'JavaScript',
    'Web Development',
    'TypeScript',
    'Node.js'
  ];

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      reviewer: 'Sarah Johnson',
      rating: 5,
      comment: 'Emily is an amazing teacher! Her photography skills are exceptional and she explained complex concepts in a very understandable way.',
      date: '2024-01-10T00:00:00Z',
      swapTitle: 'Photography for React Development'
    },
    {
      id: 2,
      reviewer: 'Marcus Chen',
      rating: 5,
      comment: 'Great experience learning design principles from Emily. She\'s patient, knowledgeable, and very professional.',
      date: '2024-01-05T00:00:00Z',
      swapTitle: 'Graphic Design for Python'
    },
    {
      id: 3,
      reviewer: 'Alex Thompson',
      rating: 4,
      comment: 'Emily has a great eye for design and shared valuable insights about the creative process.',
      date: '2023-12-28T00:00:00Z',
      swapTitle: 'UI/UX Design for JavaScript'
    }
  ];

  const availability = [
    { day: 'Monday', times: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'] },
    { day: 'Tuesday', times: ['10:00 AM - 1:00 PM'] },
    { day: 'Wednesday', times: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'] },
    { day: 'Thursday', times: ['10:00 AM - 1:00 PM'] },
    { day: 'Friday', times: ['9:00 AM - 12:00 PM'] },
    { day: 'Saturday', times: ['10:00 AM - 2:00 PM'] },
    { day: 'Sunday', times: ['Not available'] }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    {user.profilePhoto ? (
                      <img
                        src={user.profilePhoto}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center border-4 border-white/30 shadow-lg">
                        <span className="text-4xl font-bold text-white">
                          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">
                          {user.firstName} {user.lastName}
                        </h1>
                        <div className="flex items-center justify-center sm:justify-start space-x-4 text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{user.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Member since Jan 2024</span>
                          </div>
                        </div>
                      </div>
                      {!isOwnProfile && isAuthenticated && (
                        <div className="flex space-x-2 mt-4 sm:mt-0">
                          <GlassButton
                            onClick={() => setIsSwapModalOpen(true)}
                            variant="primary"
                            className="hover-lift"
                          >
                            Request Swap
                          </GlassButton>
                          <GlassButton
                            onClick={() => {/* Handle message */}}
                            variant="secondary"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </GlassButton>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-center sm:justify-start space-x-6 mb-4">
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center space-x-1">
                          {renderStars(user.rating)}
                        </div>
                        <span className="text-lg font-semibold text-gray-800">{user.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600">{user.completedSwaps} swaps</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-green-600" />
                        <span className="text-gray-600">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">{user.bio}</p>
              </GlassCard>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Skills</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Offering</h3>
                    <div className="flex flex-wrap gap-2">
                      {offeredSkills.map((skill, index) => (
                        <SkillTag key={index} skill={skill} type="offered" />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Looking to Learn</h3>
                    <div className="flex flex-wrap gap-2">
                      {wantedSkills.map((skill, index) => (
                        <SkillTag key={index} skill={skill} type="wanted" />
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Reviews</h2>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200/50 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {review.reviewer.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{review.reviewer}</h4>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{review.comment}</p>
                      <p className="text-sm text-gray-500 font-medium">{review.swapTitle}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Availability</h2>
                <div className="space-y-3">
                  {availability.map((day) => (
                    <div key={day.day} className="flex justify-between items-start">
                      <span className="font-medium text-gray-700 w-20">{day.day}</span>
                      <div className="flex-1">
                        {day.times.map((time, index) => (
                          <div key={index} className={`text-sm ${
                            time === 'Not available' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {time}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">Available upon request</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600">Verified member</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Profile views: 156</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-medium text-gray-800">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Response Time</span>
                    <span className="font-medium text-gray-800">2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Skills Offered</span>
                    <span className="font-medium text-gray-800">{offeredSkills.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-medium text-gray-800">95%</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Swap Request Modal */}
      {isSwapModalOpen && (
        <SwapRequestModal
          isOpen={isSwapModalOpen}
          onClose={() => setIsSwapModalOpen(false)}
          targetUserId={user.id}
        />
      )}
    </div>
  );
};

export default UserDetail;