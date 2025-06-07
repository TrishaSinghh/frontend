
import { apiClient } from './apiClient';
import { CreateUserTagRequest, UserTag, UpdateUserTagRequest } from '../types/api';

/**
 * User Tag service for handling user-tag relationship operations
 */
export class UserTagService {
  /**
   * Link a user and tag
   * @param userTagData - User-tag relationship data
   * @returns Promise containing the created user-tag relationship
   * @throws ApiError if creation fails
   * 
   * @example
   * ```typescript
   * try {
   *   const userTag = await userTagService.createUserTag({
   *     userId: '123',
   *     tagId: '789'
   *   });
   *   console.log('User-tag relationship created:', userTag);
   * } catch (error) {
   *   console.error('User-tag creation failed:', error.message);
   * }
   * ```
   */
  async createUserTag(userTagData: CreateUserTagRequest): Promise<UserTag> {
    return apiClient.post<UserTag>('/user/tag', userTagData);
  }

  /**
   * Get user-tag relationship by ID
   * @param id - User-tag relationship ID
   * @returns Promise containing user-tag relationship data
   * @throws ApiError if relationship not found or request fails
   */
  async getUserTagById(id: string): Promise<UserTag> {
    return apiClient.get<UserTag>(`/user/tag/${id}`);
  }

  /**
   * Update user-tag relationship
   * @param id - User-tag relationship ID
   * @param updateData - Data to update
   * @returns Promise containing updated user-tag relationship data
   * @throws ApiError if update fails
   */
  async updateUserTag(id: string, updateData: UpdateUserTagRequest): Promise<UserTag> {
    return apiClient.put<UserTag>(`/user/tag/${id}`, updateData);
  }

  /**
   * Delete user-tag relationship
   * @param id - User-tag relationship ID
   * @returns Promise that resolves when deletion is successful
   * @throws ApiError if deletion fails
   */
  async deleteUserTag(id: string): Promise<void> {
    await apiClient.delete<void>(`/user/tag/${id}`);
  }
}

export const userTagService = new UserTagService();
