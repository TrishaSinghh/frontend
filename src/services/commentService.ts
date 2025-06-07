import { apiClient } from './apiClient';
import { CreateCommentRequest, Comment, UpdateCommentRequest } from '../types/api';

/**
 * Comment service for handling comment operations
 */
export class CommentService {
  /**
   * Create a new comment
   * @param commentData - Comment data
   * @returns Promise containing the created comment
   * @throws ApiError if creation fails
   */
  async createComment(commentData: CreateCommentRequest): Promise<Comment> {
    return apiClient.post<Comment>('/comment', commentData);
  }

  /**
   * Get comment by ID
   * @param id - Comment ID
   * @returns Promise containing comment data
   * @throws ApiError if comment not found or request fails
   */
  async getCommentById(id: string): Promise<Comment> {
    return apiClient.get<Comment>(`/comment/${id}`);
  }

  /**
   * Update comment
   * @param id - Comment ID
   * @param updateData - Data to update
   * @returns Promise containing updated comment data
   * @throws ApiError if update fails
   */
  async updateComment(id: string, updateData: UpdateCommentRequest): Promise<Comment> {
    return apiClient.put<Comment>(`/comment/${id}`, updateData);
  }

  /**
   * Delete comment
   * @param id - Comment ID
   * @returns Promise that resolves when deletion is successful
   * @throws ApiError if deletion fails
   */
  async deleteComment(id: string): Promise<void> {
    await apiClient.delete<void>(`/comment/${id}`);
  }
}

export const commentService = new CommentService();
