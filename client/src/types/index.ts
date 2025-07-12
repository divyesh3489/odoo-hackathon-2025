export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_image?: string;
  availability: string[];
  is_banned: boolean;
  is_privete: boolean;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
  last_login?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  description?: string;
}

export interface UserSkill {
  id: number;
  userId: number;
  skillId: number;
  type: 'offered' | 'wanted';
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  skill?: Skill;
}

export interface SwapRequest {
  id: number;
  fromUserId: number;
  toUserId: number;
  offeredSkillId: number;
  requestedSkillId: number;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  preferredTime?: string;
  duration?: string;
  createdAt: string;
  updatedAt: string;
  fromUser?: User;
  toUser?: User;
  offeredSkill?: Skill;
  requestedSkill?: Skill;
}

export interface Review {
  id: number;
  swapRequestId: number;
  reviewerId: number;
  revieweeId: number;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewer?: User;
  reviewee?: User;
}

export interface Notification {
  id: number;
  userId: number;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  users: User[];
  skills: Skill[];
  swapRequests: SwapRequest[];
  notifications: Notification[];
  searchFilters: {
    query: string;
    category: string;
    location: string;
    skillType: 'offered' | 'wanted' | 'all';
  };
  isLoading: boolean;
  error: string | null;
}
