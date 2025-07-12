import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { GlassButton } from '../common/GlassButton';
import { GlassInput } from '../common/GlassInput';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useApp } from '../../contexts/AppContext';
import { useToast } from '../../hooks/use-toast';
import { swapApi } from '../../utils/api';

const swapRequestSchema = z.object({
  offeredSkill: z.string().min(1, 'Please select a skill you can offer'),
  requestedSkill: z.string().min(1, 'Please select a skill you want to learn'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredDay: z.string().optional(),
  preferredTime: z.string().optional(),
  duration: z.string().optional(),
});

type SwapRequestFormData = z.infer<typeof swapRequestSchema>;

interface SwapRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUserId: number;
}

export const SwapRequestModal = ({ isOpen, onClose, targetUserId }: SwapRequestModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SwapRequestFormData>({
    resolver: zodResolver(swapRequestSchema),
  });

  const onSubmit = async (data: SwapRequestFormData) => {
    setIsLoading(true);
    try {
      await swapApi.createSwapRequest({
        toUserId: targetUserId,
        ...data,
      });
      
      toast({
        title: "Request sent!",
        description: "Your skill swap request has been sent successfully.",
      });
      
      handleClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
        className="bg-white/25 backdrop-blur-lg border border-white/30 rounded-2xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Request Skill Swap</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Skill to Offer
            </label>
            <select
              {...register('offeredSkill')}
              className="w-full px-4 py-3 glass-input text-gray-700"
            >
              <option value="">Select a skill you can teach</option>
              <option value="web-dev">Web Development</option>
              <option value="ui-ux">UI/UX Design</option>
              <option value="marketing">Digital Marketing</option>
              <option value="photography">Photography</option>
              <option value="writing">Content Writing</option>
            </select>
            {errors.offeredSkill && (
              <p className="text-red-600 text-sm mt-1">{errors.offeredSkill.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill You Want to Learn
            </label>
            <select
              {...register('requestedSkill')}
              className="w-full px-4 py-3 glass-input text-gray-700"
            >
              <option value="">Select a skill you want to learn</option>
              <option value="photography">Photography</option>
              <option value="writing">Content Writing</option>
              <option value="data-science">Data Science</option>
              <option value="marketing">Digital Marketing</option>
              <option value="design">Graphic Design</option>
            </select>
            {errors.requestedSkill && (
              <p className="text-red-600 text-sm mt-1">{errors.requestedSkill.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              {...register('message')}
              rows={4}
              className="w-full px-4 py-3 glass-input text-gray-700"
              placeholder="Tell them about your experience and what you'd like to learn..."
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
            <div className="grid grid-cols-2 gap-4">
              <select
                {...register('preferredDay')}
                className="px-4 py-3 glass-input text-gray-700"
              >
                <option value="">Select day</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="evenings">Evenings</option>
                <option value="mornings">Mornings</option>
                <option value="afternoons">Afternoons</option>
                <option value="nights">Nights</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
              <select
                {...register('preferredTime')}
                className="px-4 py-3 glass-input text-gray-700"
              >
                <option value="">Select time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Duration
            </label>
            <select
              {...register('duration')}
              className="w-full px-4 py-3 glass-input text-gray-700"
            >
              <option value="">Select duration</option>
              <option value="1-hour">1 Hour</option>
              <option value="2-hours">2 Hours</option>
              <option value="half-day">Half Day</option>
              <option value="full-day">Full Day</option>
              <option value="multiple-sessions">Multiple Sessions</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <GlassButton
              type="button"
              onClick={handleClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </GlassButton>
            <GlassButton
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size="sm" /> : 'Send Request'}
            </GlassButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
