import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick 
}: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        'glass-card',
        hover && 'cursor-pointer hover-lift',
        className
      )}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02 } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.div>
  );
};
