# Authentication Integration Setup

This document explains how the authentication system is integrated between the Django backend and React frontend.

## Backend (Django) Configuration

The Django backend uses:
- **Custom User Model**: `user_management.Users` extending `AbstractUser`
- **JWT Authentication**: Using `djangorestframework-simplejwt`
- **Email as Username**: Users authenticate with email instead of username
- **Custom Token Serializer**: `CustomTokenObtainPairSerializer` for login

### API Endpoints

- `POST /api/v1/login/` - User login (returns JWT tokens)
- `POST /api/v1/register/` - User registration
- `GET /api/v1/profile/` - Get user profile (authenticated)
- `PUT /api/v1/profile/` - Update user profile (authenticated)
- `POST /api/v1/token/refresh/` - Refresh access token

### User Model Fields

```python
class Users(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    profile_image = models.ImageField()
    availability = models.JSONField(default=list)
    is_banned = models.BooleanField(default=False)
    is_privete = models.BooleanField(default=False)
```

## Frontend (React) Configuration

The React frontend uses:
- **Zustand Store**: `authStore` for state management
- **JWT Token Storage**: Session storage for tokens
- **Automatic Token Refresh**: Handles expired tokens
- **Protected Routes**: Redirects unauthenticated users

### Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:8000
```

### Authentication Flow

1. **Login**: User submits email/password → receives JWT tokens → stores tokens → fetches user profile
2. **Registration**: User submits registration data → receives JWT tokens → stores tokens → fetches user profile
3. **Token Refresh**: Automatic refresh when access token expires
4. **Logout**: Removes tokens from storage

### Key Components

- `AuthContext`: Provides authentication state to components
- `LoginModal`: Login form component
- `RegisterModal`: Registration form component
- `useAuth`: Custom hook for authentication
- `authStore`: Zustand store for auth state

## Usage

### Protected Routes

```tsx
import { useAuth } from '../hooks/useAuth';

const ProtectedComponent = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <div>Welcome, {user?.first_name}!</div>;
};
```

### Making Authenticated API Calls

```tsx
import { userApi } from '../utils/api';

const updateProfile = async (data) => {
  try {
    const updatedUser = await userApi.updateProfile(data);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

## Token Management

- **Access Token**: Short-lived (7 days), used for API requests
- **Refresh Token**: Long-lived (30 days), used to get new access tokens
- **Automatic Refresh**: Handled by the API utility functions
- **Storage**: Tokens stored in session storage

## Error Handling

- **401 Unauthorized**: Automatically attempts token refresh
- **Token Expired**: Refreshes token and retries request
- **Refresh Failed**: Redirects to login page
- **Network Errors**: Shows user-friendly error messages

## Security Features

- **HTTPS**: Use HTTPS in production
- **Token Expiration**: Short-lived access tokens
- **Automatic Logout**: On token refresh failure
- **CSRF Protection**: Django's built-in CSRF protection
- **CORS Configuration**: Configured for frontend domain 