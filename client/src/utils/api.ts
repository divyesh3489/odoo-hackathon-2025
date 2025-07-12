import { getToken, removeToken, refreshAccessToken } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  let token = getToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  let response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // If token is expired, try to refresh it
  if (response.status === 401 && token) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      // Retry the request with the new token
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${newToken}`,
      };
      response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    } else {
      // Refresh failed, remove tokens and redirect
      removeToken();
      window.location.href = '/';
      throw new ApiError(401, 'Authentication required');
    }
  }

  if (response.status === 401) {
    removeToken();
    window.location.href = '/';
    throw new ApiError(401, 'Authentication required');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.message || errorData.detail || `HTTP error! status: ${response.status}`
    );
  }

  return response;
};

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await apiRequest(endpoint);
    return response.json();
  },

  post: async <T>(endpoint: string, data?: any): Promise<T> => {
    const response = await apiRequest(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  put: async <T>(endpoint: string, data?: any): Promise<T> => {
    const response = await apiRequest(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  patch: async <T>(endpoint: string, data?: any): Promise<T> => {
    const response = await apiRequest(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await apiRequest(endpoint, {
      method: 'DELETE',
    });
    return response.json();
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
    
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/profile/`, {
      method: 'PUT',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to upload photo');
    }

    return response.json();
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
