import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { GlassButton } from '../common/GlassButton';
import { GlassInput } from '../common/GlassInput';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useToast } from '../../hooks/use-toast';
import { useLocation } from 'wouter';
import { getToken, getRefreshToken } from '../../utils/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}

export const LoginModal = ({ 
  isOpen, 
  onClose, 
  onSwitchToRegister, 
  onSwitchToForgotPassword 
}: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error: errorStore } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      onClose();
      reset();
      // Log tokens for debugging
      console.log('Access Token:', getToken());
      console.log('Refresh Token:', getRefreshToken());
      navigate('/');
    } catch (error) {
      toast({
        title: "Login failed",
        description: errorStore || (error instanceof Error ? error.message : "An error occurred"),
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white backdrop-blur-lg border border-white/30 rounded-2xl p-8 w-full max-w-md shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Welcome Back</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <GlassInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            error={errors.email?.message}
          />

          <div className="relative">
            <GlassInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              error={errors.password?.message}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            <button
              type="button"
              onClick={onSwitchToForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </button>
          </div>

          {errorStore && (
            <div className="text-red-600 text-sm bg-red-50/50 p-3 rounded-lg">
              {errorStore}
            </div>
          )}

          <GlassButton
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="sm" /> : 'Sign In'}
          </GlassButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
