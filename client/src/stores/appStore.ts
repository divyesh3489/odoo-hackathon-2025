import { create } from 'zustand';
import { AppState, User, Skill, SwapRequest, Notification } from '../types';
import { userApi, skillsApi, swapApi, notificationsApi } from '../utils/api';

interface AppStore extends AppState {
  // Users
  fetchUsers: (params?: any) => Promise<void>;
  fetchUserById: (id: number) => Promise<User>;
  
  // Skills
  fetchSkills: () => Promise<void>;
  fetchUserSkills: (userId: number) => Promise<void>;
  addUserSkill: (skillData: any) => Promise<void>;
  removeUserSkill: (skillId: number) => Promise<void>;
  
  // Swap Requests
  fetchSwapRequests: () => Promise<void>;
  createSwapRequest: (requestData: any) => Promise<void>;
  updateSwapRequest: (id: number, data: any) => Promise<void>;
  acceptSwapRequest: (id: number) => Promise<void>;
  rejectSwapRequest: (id: number) => Promise<void>;
  completeSwapRequest: (id: number) => Promise<void>;
  
  // Notifications
  fetchNotifications: () => Promise<void>;
  markNotificationAsRead: (id: number) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  
  // Search
  updateSearchFilters: (filters: Partial<AppState['searchFilters']>) => void;
  
  // Utils
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  users: [],
  skills: [],
  swapRequests: [],
  notifications: [],
  searchFilters: {
    query: '',
    category: '',
    location: '',
    skillType: 'all',
  },
  isLoading: false,
  error: null,

  // Users
  fetchUsers: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const users = await userApi.getUsers(params);
      set({ users, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  fetchUserById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userApi.getUserById(id);
      set({ isLoading: false });
      return user;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Skills
  fetchSkills: async () => {
    set({ isLoading: true, error: null });
    try {
      const skills = await skillsApi.getSkills();
      set({ skills, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  fetchUserSkills: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const userSkills = await skillsApi.getUserSkills(userId);
      set({ isLoading: false });
      return userSkills;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  addUserSkill: async (skillData) => {
    set({ isLoading: true, error: null });
    try {
      await skillsApi.addUserSkill(skillData);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  removeUserSkill: async (skillId) => {
    set({ isLoading: true, error: null });
    try {
      await skillsApi.removeUserSkill(skillId);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Swap Requests
  fetchSwapRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const swapRequests = await swapApi.getSwapRequests();
      set({ swapRequests, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  createSwapRequest: async (requestData) => {
    set({ isLoading: true, error: null });
    try {
      const newRequest = await swapApi.createSwapRequest(requestData);
      const { swapRequests } = get();
      set({ 
        swapRequests: [...swapRequests, newRequest],
        isLoading: false 
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateSwapRequest: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedRequest = await swapApi.updateSwapRequest(id, data);
      const { swapRequests } = get();
      set({ 
        swapRequests: swapRequests.map(req => 
          req.id === id ? updatedRequest : req
        ),
        isLoading: false 
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  acceptSwapRequest: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await swapApi.acceptSwapRequest(id);
      const { swapRequests } = get();
      set({ 
        swapRequests: swapRequests.map(req => 
          req.id === id ? { ...req, status: 'accepted' as const } : req
        ),
        isLoading: false 
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  rejectSwapRequest: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await swapApi.rejectSwapRequest(id);
      const { swapRequests } = get();
      set({ 
        swapRequests: swapRequests.map(req => 
          req.id === id ? { ...req, status: 'rejected' as const } : req
        ),
        isLoading: false 
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  completeSwapRequest: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await swapApi.completeSwapRequest(id);
      const { swapRequests } = get();
      set({ 
        swapRequests: swapRequests.map(req => 
          req.id === id ? { ...req, status: 'completed' as const } : req
        ),
        isLoading: false 
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Notifications
  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const notifications = await notificationsApi.getNotifications();
      set({ notifications, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  markNotificationAsRead: async (id) => {
    try {
      await notificationsApi.markAsRead(id);
      const { notifications } = get();
      set({ 
        notifications: notifications.map(notif => 
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  markAllNotificationsAsRead: async () => {
    try {
      await notificationsApi.markAllAsRead();
      const { notifications } = get();
      set({ 
        notifications: notifications.map(notif => ({ ...notif, isRead: true }))
      });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  // Search
  updateSearchFilters: (filters) => {
    const { searchFilters } = get();
    set({ 
      searchFilters: { ...searchFilters, ...filters }
    });
  },

  // Utils
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
