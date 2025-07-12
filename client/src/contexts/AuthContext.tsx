import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuthStore } from '../stores/authStore';
import { userApi } from '../utils/api';
import { getToken, setUser } from '../utils/auth';
import { User } from '../types';

const AuthContext = createContext<ReturnType<typeof useAuthStore> | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authStore = useAuthStore();

  useEffect(() => {
    // Initialize auth state on app load - only run once on mount
    const initAuth = async () => {
      const token = getToken();
      
      if (token) {
        try {
          const userProfile = await userApi.getProfile();
          
          if (userProfile && typeof userProfile === 'object') {
            const user = userProfile as User;
            setUser(user);
          }
        } catch (error) {
          console.error('AuthProvider: Profile API error:', error);
        }
      }
      
      // Also call the store's loadUser method
      await authStore.loadUser();
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty - we only want this to run once on mount

  return (
    <AuthContext.Provider value={authStore}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
