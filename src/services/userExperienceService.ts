
import { apiClient } from './apiClient';
import { CreateUserExperienceRequest, UserExperience, UpdateUserExperienceRequest } from '../types/api';

/**
 * User Experience service for handling user experience operations
 */
export class UserExperienceService {
  /**
   * Add experience to user profile
   * @param experienceData - Experience data
   * @returns Promise containing the created experience record
   * @throws ApiError if creation fails
   * 
   * @example
   * ```typescript
   * try {
   *   const experience = await userExperienceService.createUserExperience({
   *     title: 'Resident Physician',
   *     description: 'Internal medicine residency program',
   *     startDate: '2024-06-01',
   *     endDate: '2027-05-31',
   *     institutionId: '789'
   *   });
   *   console.log('Experience added:', experience);
   * } catch (error) {
   *   console.error('Experience creation failed:', error.message);
   * }
   * ```
   */
  async createUserExperience(experienceData: CreateUserExperienceRequest): Promise<UserExperience> {
    return apiClient.post<UserExperience>('/user/experience', experienceData);
  }

  /**
   * Get experience by ID
   * @param id - Experience ID
   * @returns Promise containing experience data
   * @throws ApiError if experience not found or request fails
   */
  async getUserExperienceById(id: string): Promise<UserExperience> {
    return apiClient.get<UserExperience>(`/user/experience/${id}`);
  }

  /**
   * Update experience
   * @param id - Experience ID
   * @param updateData - Data to update
   * @returns Promise containing updated experience data
   * @throws ApiError if update fails
   */
  async updateUserExperience(id: string, updateData: UpdateUserExperienceRequest): Promise<UserExperience> {
    return apiClient.put<UserExperience>(`/user/experience/${id}`, updateData);
  }

  /**
   * Delete experience
   * @param id - Experience ID
   * @returns Promise that resolves when deletion is successful
   * @throws ApiError if deletion fails
   */
  async deleteUserExperience(id: string): Promise<void> {
    await apiClient.delete<void>(`/user/experience/${id}`);
  }
}

export const userExperienceService = new UserExperienceService();
