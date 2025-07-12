import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'teal';
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  className?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  change, 
  className = '' 
}: StatsCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-100/50 text-blue-600',
    green: 'bg-green-100/50 text-green-600',
    yellow: 'bg-yellow-100/50 text-yellow-600',
    purple: 'bg-purple-100/50 text-purple-600',
    teal: 'bg-teal-100/50 text-teal-600',
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-6 hover:bg-white/25 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold text-gray-800">{value}</p>
              {change && (
                <span className={`text-sm font-medium ${
                  change.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change.trend === 'up' ? '+' : '-'}{Math.abs(change.value)}%
                </span>
              )}
            </div>
          </div>
          
          <div className={`w-12 h-12 rounded-xl backdrop-blur-sm flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
