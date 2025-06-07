import { apiClient } from './apiClient';
import { LoginRequest, RegisterRequest } from '../types/api';

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  specialty: string;
  userType: 'doctor' | 'healthcare';
}

export interface AuthResponse {
  success?: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
    specialty: string;
  };
}

/**
 * Authentication service for handling user login and registration
 */
export class AuthService {
  /**
   * Login user with email and password
   */
async login(credentials: LoginRequest): Promise<{ token: string; userId: string }> {
  try {
    const response = await apiClient.post<{ token: string; userId: string }>('/auth/login', credentials, false);

    if (response && response.token) {
      apiClient.setToken(response.token);
      return response; // { token, userId }
    }
    throw new Error('Invalid email or password. Please check your credentials and try again.');
  } catch (error: any) {
    throw new Error(error?.message || 'Login error');
  }
}
  /**
   * Register a new user (sign up)
   * Accepts any 200/201 or message as success, does NOT expect token or success field
   */
 async signup(userData: SignupRequest): Promise<void> {
  try {
    const response = await apiClient.post('/auth/register', userData, false);

    // Accept empty response, string, or message as success
    if (
      response === undefined ||
      response === null ||
      (typeof response === 'object' && Object.keys(response).length === 0) ||
      typeof response === 'string' ||
      (typeof response === 'object' && 'message' in response)
    ) {
      return;
    } else {
      throw new Error('Signup failed');
    }
  } catch (error: any) {
    throw new Error(error?.message || 'Signup error');
  }
}



  /**
   * Register a new user (legacy method name for compatibility)
   */
  async register(userData: RegisterRequest): Promise<void> {
    await apiClient.post<void>('/auth/register', userData, false);
  }

  /**
   * Logout user by clearing the stored JWT token
   */
  logout(): void {
    apiClient.clearToken(); // Clears 'pharminc_auth_token'
  }

  /**
   * Check if user is currently authenticated
   */
  isAuthenticated(): boolean {
    return localStorage.getItem('pharminc_auth_token') !== null;
  }
}

export const authService = new AuthService();
