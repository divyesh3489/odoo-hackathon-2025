import { motion } from 'framer-motion';
import { Star, MapPin, User } from 'lucide-react';
import { Link } from 'wouter';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { SkillTag } from '../common/SkillTag';
import { User as UserType } from '../../types';

interface UserCardProps {
  user: UserType;
  onRequestSwap: (userId: number) => void;
  className?: string;
}

export const UserCard = ({ user, onRequestSwap, className = '' }: UserCardProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-6 hover:bg-white/25 transition-all hover-lift">
        <Link href={`/user/${user.id}`}>
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              {user.profile_image ? (
                <img
                  src={user.profile_image}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/50"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center border-2 border-white/50">
                  <User className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                {user.first_name} {user.last_name}
              </h4>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <span>@{user.username}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-700">4.5</span>
                <span className="text-xs text-gray-500">• 0 swaps</span>
              </div>
            </div>
          </div>
        </Link>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Skills Offered:</p>
            <div className="flex flex-wrap gap-1">
              {/* Mock skills - replace with actual user skills */}
              <SkillTag skill="React Development" type="offered" />
              <SkillTag skill="UI/UX Design" type="offered" />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Looking for:</p>
            <div className="flex flex-wrap gap-1">
              {/* Mock skills - replace with actual user skills */}
              <SkillTag skill="Digital Marketing" type="wanted" />
              <SkillTag skill="Content Writing" type="wanted" />
            </div>
          </div>
        </div>

        <GlassButton
          onClick={() => onRequestSwap(user.id)}
          className="w-full mt-4 text-gray-700"
        >
          Request Swap
        </GlassButton>
      </GlassCard>
    </motion.div>
  );
};
