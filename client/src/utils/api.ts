import axios, { AxiosResponse, AxiosError } from 'axios';
import { getToken, removeToken, refreshAccessToken } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const token = getToken();
      if (token) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          // Retry the request with the new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } else {
          // Refresh failed, remove tokens but don't redirect for profile endpoint
          removeToken();
          if (!originalRequest.url?.includes('/api/v1/profile/')) {
            window.location.href = '/';
          }
          throw new ApiError(401, 'Authentication required');
        }
      }
    }

    if (error.response?.status === 401) {
      removeToken();
      // Don't redirect for profile endpoint during app initialization
      if (!originalRequest?.url?.includes('/api/v1/profile/')) {
        window.location.href = '/';
      }
      throw new ApiError(401, 'Authentication required');
    }

    // Handle other errors
    const errorData = error.response?.data as any || {};
    throw new ApiError(
      error.response?.status || 500,
      errorData.message || errorData.detail || error.message || 'Network error'
    );
  }
);

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.get(endpoint);
    return response.data;
  },

  post: async <T>(endpoint: string, data?: any): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.post(endpoint, data);
    return response.data;
  },

  put: async <T>(endpoint: string, data?: any): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.put(endpoint, data);
    return response.data;
  },

  patch: async <T>(endpoint: string, data?: any): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.patch(endpoint, data);
    return response.data;
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.delete(endpoint);
    return response.data;
  },
};

// Auth API calls - Updated for Django backend
export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    return api.post('/api/v1/login/', credentials);
  },

  register: async (userData: any) => {
    return api.post('/api/v1/register/', userData);
  },

  logout: async () => {
    // Django JWT doesn't require a logout endpoint, we just remove the token
    return Promise.resolve({ message: 'Logged out successfully' });
  },

  forgotPassword: async (email: string) => {
    return api.post('/api/v1/forgot-password/', { email });
  },

  resetPassword: async (token: string, password: string) => {
    return api.post('/api/v1/reset-password/', { token, password });
  },

  refreshToken: async () => {
    return api.post('/api/v1/token/refresh/');
  },
};

// User API calls - Updated for Django backend
export const userApi = {
  getProfile: async () => {
    return api.get('/api/v1/profile/');
  },

  updateProfile: async (data: any) => {
    return api.put('/api/v1/profile/', data);
  },

  getUsers: async (params?: any) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return api.get(`/api/v1/users/${queryString}`);
  },

  getUserById: async (id: number) => {
    return api.get(`/api/v1/users/${id}/`);
  },

  uploadProfilePhoto: async (file: File) => {
    const formData = new FormData();
    formData.append('profile_image', file);
    
    const response = await axiosInstance.put('/api/v1/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};

// Skills API calls - Updated for Django backend
export const skillsApi = {
  getSkills: async () => {
    return api.get('/api/skills/');
  },

  getUserSkills: async (userId: number) => {
    return api.get(`/api/users/${userId}/skills/`);
  },

  addUserSkill: async (skillData: any) => {
    return api.post('/api/users/skills/', skillData);
  },

  removeUserSkill: async (skillId: number) => {
    return api.delete(`/api/users/skills/${skillId}/`);
  },
};

// Swap requests API calls - Updated for Django backend
export const swapApi = {
  getSwapRequests: async () => {
    return api.get('/api/swap-requests/');
  },

  createSwapRequest: async (requestData: any) => {
    return api.post('/api/swap-requests/', requestData);
  },

  updateSwapRequest: async (id: number, data: any) => {
    return api.put(`/api/swap-requests/${id}/`, data);
  },

  deleteSwapRequest: async (id: number) => {
    return api.delete(`/api/swap-requests/${id}/`);
  },

  acceptSwapRequest: async (id: number) => {
    return api.patch(`/api/swap-requests/${id}/accept/`);
  },

  rejectSwapRequest: async (id: number) => {
    return api.patch(`/api/swap-requests/${id}/reject/`);
  },

  completeSwapRequest: async (id: number) => {
    return api.patch(`/api/swap-requests/${id}/complete/`);
  },
};

// Reviews API calls - Updated for Django backend
export const reviewsApi = {
  createReview: async (reviewData: any) => {
    return api.post('/api/reviews/', reviewData);
  },

  getReviews: async (userId: number) => {
    return api.get(`/api/users/${userId}/reviews/`);
  },
};

// Notifications API calls - Updated for Django backend
export const notificationsApi = {
  getNotifications: async () => {
    return api.get('/api/notifications/');
  },

  markAsRead: async (id: number) => {
    return api.patch(`/api/notifications/${id}/read/`);
  },

  markAllAsRead: async () => {
    return api.patch('/api/notifications/read-all/');
  },
};
