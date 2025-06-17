import { userApiClient } from './apiClient';
import { CreateUserRequest, User, UpdateUserRequest } from '../types/api';

export class UserService {
  // Create user (authenticated)
  async createUser(userData: CreateUserRequest): Promise<User> {
    return userApiClient.post<User>('/private/user', userData);
  }

  // Get current authenticated user
  async getCurrentUser(): Promise<User> {
    return userApiClient.get<User>('/private/user');
  }

  // Update current authenticated user
  async updateCurrentUser(updateData: UpdateUserRequest): Promise<User> {
    return userApiClient.put<User>('/private/user', updateData);
  }

  // Delete current authenticated user
  async deleteCurrentUser(): Promise<void> {
    await userApiClient.delete<void>('/private/user');
  }

  // Get public user by ID
  async getUserById(id: string): Promise<User> {
    return userApiClient.get<User>(`/public/user/${id}`, false);
  }

  // List all public users
  async listUsers(): Promise<User[]> {
    return userApiClient.get<User[]>('/public/users', false);
  }

  // Search public users (all params required as strings)
  async searchUsers(
  name: string,
  q: string,
  location: string,
  role: string
): Promise<User[]> {
  const params = new URLSearchParams({
    name: name ?? "",
    q: q ?? "",
    location: location ?? "",
    role: role ?? ""
  }).toString();
  return userApiClient.get<User[]>(`/public/users/search?${params}`, false);
}
}

export const userService = new UserService();
