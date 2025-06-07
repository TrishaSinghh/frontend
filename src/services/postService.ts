
import { apiClient } from './apiClient';
import { CreatePostRequest, Post, UpdatePostRequest } from '../types/api';

/**
 * Post service for handling post operations
 */
export class PostService {
  /**
   * Create a new post
   * @param postData - Post data
   * @returns Promise containing the created post
   * @throws ApiError if creation fails
   * 
   * @example
   * ```typescript
   * try {
   *   const post = await postService.createPost({
   *     content: 'This is my first post!',
   *     userId: '123'
   *   });
   *   console.log('Post created:', post);
   * } catch (error) {
   *   console.error('Post creation failed:', error.message);
   * }
   * ```
   */
  async createPost(postData: CreatePostRequest): Promise<Post> {
    return apiClient.post<Post>('/post', postData);
  }

  /**
   * Get post by ID
   * @param id - Post ID
   * @returns Promise containing post data
   * @throws ApiError if post not found or request fails
   * 
   * @example
   * ```typescript
   * try {
   *   const post = await postService.getPostById('456');
   *   console.log('Post found:', post);
   * } catch (error) {
   *   console.error('Post not found:', error.message);
   * }
   * ```
   */
  async getPostById(id: string): Promise<Post> {
    return apiClient.get<Post>(`/post/${id}`);
  }

  /**
   * Update post
   * @param id - Post ID
   * @param updateData - Data to update
   * @returns Promise containing updated post data
   * @throws ApiError if update fails
   * 
   * @example
   * ```typescript
   * try {
   *   const updatedPost = await postService.updatePost('456', {
   *     content: 'Updated post content'
   *   });
   *   console.log('Post updated:', updatedPost);
   * } catch (error) {
   *   console.error('Post update failed:', error.message);
   * }
   * ```
   */
  async updatePost(id: string, updateData: UpdatePostRequest): Promise<Post> {
    return apiClient.put<Post>(`/post/${id}`, updateData);
  }

  /**
   * Delete post
   * @param id - Post ID
   * @returns Promise that resolves when deletion is successful
   * @throws ApiError if deletion fails
   * 
   * @example
   * ```typescript
   * try {
   *   await postService.deletePost('456');
   *   console.log('Post deleted successfully');
   * } catch (error) {
   *   console.error('Post deletion failed:', error.message);
   * }
   * ```
   */
  async deletePost(id: string): Promise<void> {
    await apiClient.delete<void>(`/post/${id}`);
  }
}

export const postService = new PostService();
