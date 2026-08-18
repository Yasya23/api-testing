import { FetchClient } from '@utils/fetchClient.util';
import { AuthRequest, AuthResponse, ApiResponse } from '@types/common';
import { API_ENDPOINTS } from '@constants/api.constants';

export class AuthService {
  private readonly authEndpoint = API_ENDPOINTS.auth;
  constructor(private client: FetchClient) {}

  async createToken(
    credentials: AuthRequest,
  ): Promise<ApiResponse<AuthResponse>> {
    return this.client.request<AuthResponse>(this.authEndpoint, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }
}
