import { apiClient } from './apiClient';
import {
  Connection,
  CreateConnectionRequest,
  AcceptConnectionRequest,
  ApiError,
} from '../types/api';

/**
 * Connection service for handling connection operations
 */
export class ConnectionService {
  /**
   * Create a new connection request
   * @param connectionData - Connection data
   * @returns Promise containing the created connection
   * @throws ApiError if creation fails
   */
  async createConnection(connectionData: CreateConnectionRequest): Promise<Connection> {
    return apiClient.post<Connection>('/connection', connectionData);
  }

  /**
   * Get all connections
   * @returns Promise containing list of connections
   * @throws ApiError if request fails
   */
  async getConnections(): Promise<Connection[]> {
    return apiClient.get<Connection[]>('/connection');
  }

  /**
   * Delete a connection by ID
   * @param id - Connection ID
   * @returns Promise that resolves when deletion is successful
   * @throws ApiError if deletion fails
   */
  async deleteConnection(id: string): Promise<void> {
    await apiClient.delete<void>(`/connection/${id}`);
  }

  /**
   * Accept a connection request by ID
   * @param id - Connection ID
   * @returns Promise containing the updated connection
   * @throws ApiError if update fails
   */
  async acceptConnection(id: string): Promise<Connection> {
    return apiClient.patch<Connection>(`/connection/${id}/accept`);
  }

  /**
   * Get all accepted connections
   * @returns Promise containing list of accepted connections
   * @throws ApiError if request fails
   */
  async getAcceptedConnections(): Promise<Connection[]> {
    return apiClient.get<Connection[]>('/connection/accepted');
  }
}

export const connectionService = new ConnectionService();
