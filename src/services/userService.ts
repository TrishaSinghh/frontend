
import { apiClient } from './apiClient';
import { CreateUserRequest, User, UpdateUserRequest } from '../types/api';

/**
 * User service for handling user profile operations
 */
export class UserService {
  /**
   * Create a new user profile
   * @param userData - User profile data
   * @returns Promise containing the created user
   * @throws ApiError if creation fails
   * 
   * @example
   * ```typescript
   * try {
   *   const user = await userService.createUser({
   *     firstName: 'John',
   *     lastName: 'Doe',
   *     specialization: 'Cardiology'
   *   });
   *   console.log('User created:', user);
   * } catch (error) {
   *   console.error('User creation failed:', error.message);
   * }
   * ```
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    return apiClient.post<User>('/user', userData);
  }

  /**
   * Get user by ID
   * @param id - User ID
   * @returns Promise containing user data
   * @throws ApiError if user not found or request fails
   * 
   * @example
   * ```typescript
   * try {
   *   const user = await userService.getUserById('123');
   *   console.log('User found:', user);
   * } catch (error) {
   *   console.error('User not found:', error.message);
   * }
   * ```
   */
  async getUserById(id: string): Promise<User> {
    return apiClient.get<User>(`/user/${id}`);
  }

  /**
   * Update user profile
   * @param id - User ID
   * @param updateData - Data to update
   * @returns Promise containing updated user data
   * @throws ApiError if update fails
   * 
   * @example
   * ```typescript
   * try {
   *   const updatedUser = await userService.updateUser('123', {
   *     firstName: 'Jane',
   *     specialization: 'Neurology'
   *   });
   *   console.log('User updated:', updatedUser);
   * } catch (error) {
   *   console.error('User update failed:', error.message);
   * }
   * ```
   */
  async updateUser(id: string, updateData: UpdateUserRequest): Promise<User> {
    return apiClient.put<User>(`/user/${id}`, updateData);
  }

  /**
   * Delete user profile
   * @param id - User ID
   * @returns Promise that resolves when deletion is successful
   * @throws ApiError if deletion fails
   * 
   * @example
   * ```typescript
   * try {
   *   await userService.deleteUser('123');
   *   console.log('User deleted successfully');
   * } catch (error) {
   *   console.error('User deletion failed:', error.message);
   * }
   * ```
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete<void>(`/user/${id}`);
  }
}

export const userService = new UserService();
