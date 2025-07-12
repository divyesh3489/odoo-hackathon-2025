import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { GlassButton } from '../common/GlassButton';
import { GlassInput } from '../common/GlassInput';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useToast } from '../../hooks/use-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const ForgotPasswordModal = ({ 
  isOpen, 
  onClose, 
  onSwitchToLogin 
}: ForgotPasswordModalProps) => {
  const [emailSent, setEmailSent] = useState(false);
  const { forgotPassword, isLoading, error } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data.email);
      setEmailSent(true);
      toast({
        title: "Email sent!",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    reset();
    setEmailSent(false);
    onClose();
  };

  const handleBackToLogin = () => {
    reset();
    setEmailSent(false);
    onSwitchToLogin();
  };

  if (!isOpen) return null;

  return (
    <div className="relative h-100 inset-0 bg-dark backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white backdrop-blur-lg border border-white/30 rounded-2xl p-8 w-full max-w-md shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {emailSent ? 'Check Your Email' : 'Reset Password'}
          </h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {emailSent ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100/50 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-700">
              We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
            </p>
            <GlassButton
              onClick={handleBackToLogin}
              variant="primary"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </GlassButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="text-gray-700 mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <GlassInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              error={errors.email?.message}
            />

            {error && (
              <div className="text-red-600 text-sm bg-red-50/50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <GlassButton
                type="button"
                onClick={handleBackToLogin}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </GlassButton>
              <GlassButton
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Send Reset Email'}
              </GlassButton>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
