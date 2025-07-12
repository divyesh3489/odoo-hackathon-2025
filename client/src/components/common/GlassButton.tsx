import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const GlassButton = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
}: GlassButtonProps) => {
  const variants = {
    default: 'glass-button text-gray-700',
    primary: 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg',
    secondary: 'bg-white/30 backdrop-blur-sm border border-white/40 text-gray-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      type={type}
      className={cn(
        'rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {children}
    </motion.button>
  );
};
