import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../contexts/AppContext';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { Bell, BellRing, MessageCircle, CheckCircle, Clock, Filter, MoreHorizontal } from 'lucide-react';
import { useLocation } from 'wouter';
import { useToast } from '../hooks/use-toast';

interface NotificationItem {
  id: number;
  type: 'swap_request' | 'swap_accepted' | 'swap_completed' | 'message' | 'reminder' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  user?: {
    name: string;
    avatar?: string;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
}

const Notifications = () => {
  const { isAuthenticated } = useAuth();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'unread' | 'swap_request' | 'message'>('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  // Mock notifications data
  const mockNotifications: NotificationItem[] = [
    {
      id: 1,
      type: 'swap_request',
      title: 'New Swap Request',
      message: 'Marcus Chen wants to swap Python skills for your React expertise.',
      isRead: false,
      createdAt: '2024-01-15T10:30:00Z',
      user: {
        name: 'Marcus Chen',
        avatar: '',
      },
      action: {
        label: 'View Request',
        onClick: () => navigate('/swap-requests'),
      },
    },
    {
      id: 2,
      type: 'swap_accepted',
      title: 'Swap Request Accepted',
      message: 'Emily Rodriguez accepted your photography swap request!',
      isRead: false,
      createdAt: '2024-01-15T09:15:00Z',
      user: {
        name: 'Emily Rodriguez',
        avatar: '',
      },
      action: {
        label: 'Schedule Session',
        onClick: () => navigate('/swap-requests'),
      },
    },
    {
      id: 3,
      type: 'swap_completed',
      title: 'Swap Completed',
      message: 'Your JavaScript tutoring session with Alex is now complete. Please leave a review.',
      isRead: true,
      createdAt: '2024-01-14T16:45:00Z',
      user: {
        name: 'Alex Thompson',
        avatar: '',
      },
      action: {
        label: 'Leave Review',
        onClick: () => toast({ title: 'Review submitted!', description: 'Thank you for your feedback.' }),
      },
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message',
      message: 'Sarah Johnson sent you a message about the upcoming design workshop.',
      isRead: true,
      createdAt: '2024-01-14T14:20:00Z',
      user: {
        name: 'Sarah Johnson',
        avatar: '',
      },
      action: {
        label: 'Reply',
        onClick: () => toast({ title: 'Feature coming soon!', description: 'Messaging will be available soon.' }),
      },
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Upcoming Session',
      message: 'Your photography session with Emily is scheduled for tomorrow at 2:00 PM.',
      isRead: false,
      createdAt: '2024-01-14T12:00:00Z',
    },
    {
      id: 6,
      type: 'system',
      title: 'Profile Update',
      message: 'Your profile has been updated successfully. Your new skills are now visible to other users.',
      isRead: true,
      createdAt: '2024-01-14T10:30:00Z',
    },
  ];

  const filteredNotifications = mockNotifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'swap_request':
        return <MessageCircle className="w-5 h-5 text-blue-600" />;
      case 'swap_accepted':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'swap_completed':
        return <CheckCircle className="w-5 h-5 text-purple-600" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-teal-600" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-amber-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const handleMarkAsRead = (id: number) => {
    markNotificationAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
    toast({
      title: 'All notifications marked as read',
      description: 'Your notification list has been updated.',
    });
  };

  return (
    <div className="min-h-screen pt-8 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
                <p className="text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <GlassButton
                onClick={handleMarkAllAsRead}
                variant="secondary"
                size="sm"
              >
                Mark All Read
              </GlassButton>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <GlassCard className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter by</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'unread', label: 'Unread' },
                { key: 'swap_request', label: 'Swap Requests' },
                { key: 'message', label: 'Messages' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    filter === key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/20 text-gray-700 hover:bg-white/30'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassCard className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No notifications</h3>
                <p className="text-gray-600">
                  {filter === 'all' 
                    ? 'You\'re all caught up! No new notifications to show.'
                    : `No ${filter === 'unread' ? 'unread' : filter.replace('_', ' ')} notifications found.`
                  }
                </p>
              </GlassCard>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <GlassCard 
                  className={`p-6 transition-all hover:shadow-lg ${
                    !notification.isRead ? 'border-blue-200/50 bg-blue-50/10' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {notification.user?.avatar ? (
                        <img
                          src={notification.user.avatar}
                          alt={notification.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {formatTime(notification.createdAt)}
                          </span>
                          {!notification.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-1 rounded-full hover:bg-white/20 transition-colors"
                              title="Mark as read"
                            >
                              <BellRing className="w-4 h-4 text-blue-600" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3 leading-relaxed">
                        {notification.message}
                      </p>
                      
                      {notification.action && (
                        <GlassButton
                          onClick={notification.action.onClick}
                          variant="secondary"
                          size="sm"
                          className="hover-lift"
                        >
                          {notification.action.label}
                        </GlassButton>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;