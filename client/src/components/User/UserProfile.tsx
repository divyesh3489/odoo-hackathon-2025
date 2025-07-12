import { motion } from 'framer-motion';
import { Star, MapPin, User, Calendar, Award } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { SkillTag } from '../common/SkillTag';
import { User as UserType } from '../../types';

interface UserProfileProps {
  user: UserType;
  onRequestSwap: (userId: number) => void;
  isOwnProfile?: boolean;
  className?: string;
}

export const UserProfile = ({ 
  user, 
  onRequestSwap, 
  isOwnProfile = false, 
  className = '' 
}: UserProfileProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className="p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
          {/* Profile Photo & Basic Info */}
          <div className="flex-shrink-0 mb-6 lg:mb-0">
            <div className="relative">
              {user.profile_image ? (
                <img
                  src={user.profile_image}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white/50"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center border-4 border-white/50">
                  <User className="w-16 h-16 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {user.first_name} {user.last_name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">4.5</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-green-500" />
                  <span>0 swaps completed</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>Joined {new Date(user.date_joined).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            

            {/* Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {/* Mock skills - replace with actual user skills */}
                  <SkillTag skill="React Development" type="offered" />
                  <SkillTag skill="UI/UX Design" type="offered" />
                  <SkillTag skill="JavaScript" type="offered" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Looking to Learn</h3>
                <div className="flex flex-wrap gap-2">
                  {/* Mock skills - replace with actual user skills */}
                  <SkillTag skill="Digital Marketing" type="wanted" />
                  <SkillTag skill="Content Writing" type="wanted" />
                  <SkillTag skill="SEO" type="wanted" />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Availability</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {user.availability && user.availability.length > 0 ? (
                  user.availability.map((time) => (
                    <div key={time} className="px-3 py-1 bg-green-100/50 text-green-700 rounded-lg text-sm text-center">
                      {time}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-1 bg-gray-100/50 text-gray-500 rounded-lg text-sm text-center">
                    No availability set
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {!isOwnProfile && (
              <div className="flex space-x-4">
                <GlassButton
                  onClick={() => onRequestSwap(user.id)}
                  variant="primary"
                  className="flex-1"
                >
                  Request Skill Swap
                </GlassButton>
                <GlassButton className="px-6">
                  Send Message
                </GlassButton>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
