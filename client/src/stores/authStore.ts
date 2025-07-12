import { create } from 'zustand';
import { User, AuthState } from '../types';
import { authApi, userApi } from '../utils/api';
import { setToken, removeToken, setUser, getUser, getToken } from '../utils/auth';

interface AuthStore extends AuthState {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  loadUser: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response: any = await authApi.login(credentials);
      const access_token = response.access_token || response.data?.access_token;
      const refresh_token = response.refresh_token || response.data?.refresh_token;
      const userRaw = response.user || (response.data && typeof response.data === 'object' && !Array.isArray(response.data) && !response.data.access_token ? response.data : undefined);
      const user = (userRaw && typeof userRaw === 'object') ? (userRaw as User) : null;

      setToken(access_token, refresh_token);
      if (user) {
        setUser(user);
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error: any) {
      let errorMsg = error.message || 'Login failed';
      if (error?.status && error?.status >= 400 && error?.status < 500) {
        try {
          const errorData = error?.response ? await error.response.json() : error;
          if (errorData?.error && typeof errorData.error === 'object') {
            // Flatten all error messages from all fields
            errorMsg = Object.values(errorData.error).flat().join(' ');
          } else if (errorData?.error) {
            errorMsg = errorData.error;
          } else if (errorData?.message) {
            errorMsg = errorData.message;
          }
        } catch {}
      }
      set({
        isLoading: false,
        error: errorMsg,
        isAuthenticated: false,
        user: null,
      });
      throw new Error(errorMsg);
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response: any = await authApi.register(userData);
      const access_token = response.access_token || response.data?.access_token;
      const refresh_token = response.refresh_token || response.data?.refresh_token;
      const userRaw = response.user || (response.data && typeof response.data === 'object' && !Array.isArray(response.data) && !response.data.access_token ? response.data : undefined);
      const user = (userRaw && typeof userRaw === 'object') ? (userRaw as User) : null;

      setToken(access_token, refresh_token);
      if (user) {
        setUser(user);
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error: any) {
      let errorMsg = error.message || 'Registration failed';
      if (error?.status && error?.status >= 400 && error?.status < 500) {
        try {
          console.log(error);
          const errorData = error?.response ? await error.response.json() : error;
          if (errorData?.error && typeof errorData.error === 'object') {
            // Flatten all error messages from all fields
            errorMsg = Object.values(errorData.error).flat().join(' ');
          } else if (errorData?.error) {
            errorMsg = errorData.error;
          } else if (errorData?.message) {
            errorMsg = errorData.message;
          }
        } catch {}
      }
      set({
        isLoading: false,
        error: errorMsg,
        isAuthenticated: false,
        user: null,
      });
      throw new Error(errorMsg);
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeToken();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.forgotPassword(email);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Failed to send reset email',
      });
      throw error;
    }
  },

  loadUser: async () => {
    const token = getToken();
    if (token) {
      try {
        const userRaw = await userApi.getProfile();
        const user = (userRaw && typeof userRaw === 'object') ? (userRaw as User) : null;
        if (user) setUser(user);
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        removeToken();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } else {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
