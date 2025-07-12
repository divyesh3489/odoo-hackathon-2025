import { User } from '../types';

const ACCESS_TOKEN_KEY = 'skillswap_access_token';
const REFRESH_TOKEN_KEY = 'skillswap_refresh_token';
const USER_KEY = 'skillswap_user';

export const setToken = (accessToken: string, refreshToken?: string) => {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const getToken = (): string | null => {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeToken = () => {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
};

export const setUser = (user: User) => {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = sessionStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;
  
  // Check if token is expired
  return !isTokenExpired(token);
};

export const decodeToken = (token: string) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.access, refreshToken);
      return data.access;
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
  }

  return null;
};
