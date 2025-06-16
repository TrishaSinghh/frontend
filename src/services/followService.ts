import { apiClient } from './apiClient';
import { Follow, CreateFollowRequest, ApiError } from '../types/api';

/**
 * Follow service for handling follow operations
 */
export class FollowService {
  /**
   * Follow a user
   * @param followData - Follow data
   * @returns Promise containing the created follow relationship
   * @throws ApiError if creation fails
   */
  async followUser(followData: CreateFollowRequest): Promise<Follow> {
    return apiClient.post<Follow>('/follow', followData);
  }

  /**
   * Unfollow a user by ID
   * @param id - Follow relationship ID
   * @returns Promise that resolves when unfollow is successful
   * @throws ApiError if deletion fails
   */
  async unfollowUser(id: string): Promise<void> {
    await apiClient.delete<void>(`/follow/${id}`);
  }

  /**
   * Get all follow relationships
   * @returns Promise containing list of follow relationships
   * @throws ApiError if request fails
   */
  async getFollows(): Promise<Follow[]> {
    return apiClient.get<Follow[]>('/follow');
  }
}

export const followService = new FollowService();
