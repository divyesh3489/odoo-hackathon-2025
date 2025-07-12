import { useState } from 'react';
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

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  location: z.string().optional(),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: authRegister, isLoading, error } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, terms, ...userData } = data;
      await authRegister(userData);
      toast({
        title: "Welcome to SkillSwap!",
        description: "Your account has been created successfully.",
      });
      onClose();
      reset();
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white/25 backdrop-blur-lg border border-white/30 rounded-2xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Join SkillSwap</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <GlassInput
              label="First Name"
              placeholder="John"
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <GlassInput
              label="Last Name"
              placeholder="Doe"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
          </div>

          <GlassInput
            label="Email"
            type="email"
            placeholder="john@example.com"
            {...register('email')}
            error={errors.email?.message}
          />

          <div className="relative">
            <GlassInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
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

          <div className="relative">
            <GlassInput
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <GlassInput
            label="Location (Optional)"
            placeholder="City, State"
            {...register('location')}
            error={errors.location?.message}
          />

          <div>
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                {...register('terms')}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
              />
              <span className="text-sm text-gray-700">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-600 text-sm mt-1">{errors.terms.message}</p>
            )}
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50/50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <GlassButton
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="sm" /> : 'Create Account'}
          </GlassButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
