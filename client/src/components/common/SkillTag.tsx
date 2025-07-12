import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillTagProps {
  skill: string;
  type?: 'offered' | 'wanted';
  onRemove?: () => void;
  className?: string;
}

export const SkillTag = ({ 
  skill, 
  type = 'offered', 
  onRemove, 
  className = '' 
}: SkillTagProps) => {
  const typeStyles = {
    offered: 'bg-emerald-100/50 text-emerald-700 border-emerald-200/50',
    wanted: 'bg-blue-100/50 text-blue-700 border-blue-200/50',
  };

  return (
    <motion.span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border',
        typeStyles[type],
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
    >
      {skill}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 p-0.5 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </motion.span>
  );
};
