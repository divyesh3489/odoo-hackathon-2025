import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  CheckCircle, 
  UserPlus, 
  Calendar, 
  Star,
  Clock
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

interface ActivityItem {
  id: string;
  type: 'message' | 'swap_completed' | 'new_user' | 'swap_scheduled' | 'review_received';
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

interface ActivityCardProps {
  activities: ActivityItem[];
  className?: string;
}

export const ActivityCard = ({ activities, className = '' }: ActivityCardProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message':
        return MessageCircle;
      case 'swap_completed':
        return CheckCircle;
      case 'new_user':
        return UserPlus;
      case 'swap_scheduled':
        return Calendar;
      case 'review_received':
        return Star;
      default:
        return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'bg-blue-100/50 text-blue-600';
      case 'swap_completed':
        return 'bg-green-100/50 text-green-600';
      case 'new_user':
        return 'bg-purple-100/50 text-purple-600';
      case 'swap_scheduled':
        return 'bg-teal-100/50 text-teal-600';
      case 'review_received':
        return 'bg-yellow-100/50 text-yellow-600';
      default:
        return 'bg-gray-100/50 text-gray-600';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return time.toLocaleDateString();
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Recent Activity</h4>
        
        <div className="space-y-3">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No recent activity</p>
            </div>
          ) : (
            activities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              const colorClass = getActivityColor(activity.type);
              
              return (
                <motion.div
                  key={activity.id}
                  className="flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/15 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.description}</p>
                  </div>
                  
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </motion.div>
              );
            })
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};
