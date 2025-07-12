import { motion } from 'framer-motion';
import { Clock, User, CheckCircle, XCircle, Calendar, MessageSquare } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { SkillTag } from '../common/SkillTag';
import { SwapRequest } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { useToast } from '../../hooks/use-toast';

interface SwapRequestCardProps {
  swapRequest: SwapRequest;
  type: 'incoming' | 'outgoing' | 'active' | 'completed';
  className?: string;
}

export const SwapRequestCard = ({ swapRequest, type, className = '' }: SwapRequestCardProps) => {
  const { acceptSwapRequest, rejectSwapRequest, completeSwapRequest } = useApp();
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100/50 text-yellow-700 border-yellow-200/50';
      case 'accepted':
        return 'bg-green-100/50 text-green-700 border-green-200/50';
      case 'rejected':
        return 'bg-red-100/50 text-red-700 border-red-200/50';
      case 'completed':
        return 'bg-blue-100/50 text-blue-700 border-blue-200/50';
      case 'cancelled':
        return 'bg-gray-100/50 text-gray-700 border-gray-200/50';
      default:
        return 'bg-gray-100/50 text-gray-700 border-gray-200/50';
    }
  };

  const handleAccept = async () => {
    try {
      await acceptSwapRequest(swapRequest.id);
      toast({
        title: "Request accepted!",
        description: "The swap request has been accepted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async () => {
    try {
      await rejectSwapRequest(swapRequest.id);
      toast({
        title: "Request rejected",
        description: "The swap request has been rejected.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleComplete = async () => {
    try {
      await completeSwapRequest(swapRequest.id);
      toast({
        title: "Swap completed!",
        description: "The skill swap has been marked as completed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete swap. Please try again.",
        variant: "destructive",
      });
    }
  };

  const otherUser = type === 'incoming' ? swapRequest.fromUser : swapRequest.toUser;
  const offeredSkill = type === 'incoming' ? swapRequest.offeredSkill : swapRequest.requestedSkill;
  const requestedSkill = type === 'incoming' ? swapRequest.requestedSkill : swapRequest.offeredSkill;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-6 hover:bg-white/25 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">
                {otherUser?.firstName} {otherUser?.lastName}
              </h4>
              <p className="text-sm text-gray-600">
                {type === 'incoming' ? 'Wants to learn from you' : 'You want to learn from them'}
              </p>
            </div>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border ${getStatusColor(swapRequest.status)}`}>
            {swapRequest.status.charAt(0).toUpperCase() + swapRequest.status.slice(1)}
          </span>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {type === 'incoming' ? 'They offer:' : 'You offer:'}
              </p>
              <SkillTag skill={offeredSkill?.name || 'Unknown Skill'} type="offered" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                {type === 'incoming' ? 'You teach:' : 'They teach:'}
              </p>
              <SkillTag skill={requestedSkill?.name || 'Unknown Skill'} type="wanted" />
            </div>
          </div>

          {swapRequest.message && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5" />
                <p className="text-sm text-gray-700">{swapRequest.message}</p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {swapRequest.preferredTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{swapRequest.preferredTime}</span>
              </div>
            )}
            {swapRequest.duration && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{swapRequest.duration}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {new Date(swapRequest.createdAt).toLocaleDateString()}
          </p>
          
          <div className="flex space-x-2">
            {type === 'incoming' && swapRequest.status === 'pending' && (
              <>
                <GlassButton
                  onClick={handleReject}
                  variant="secondary"
                  size="sm"
                  className="text-red-600 hover:bg-red-50/50"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </GlassButton>
                <GlassButton
                  onClick={handleAccept}
                  variant="primary"
                  size="sm"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Accept
                </GlassButton>
              </>
            )}
            
            {type === 'active' && swapRequest.status === 'accepted' && (
              <GlassButton
                onClick={handleComplete}
                variant="primary"
                size="sm"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Mark Complete
              </GlassButton>
            )}
            
            {type === 'completed' && (
              <GlassButton
                variant="secondary"
                size="sm"
                className="text-blue-600"
              >
                Rate & Review
              </GlassButton>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
