import { FetchClient } from '@utils/fetchClient.util';
import { AuthRequest, AuthResponse, ApiResponse } from '@types/common';
import { CONFIG } from '@config/config';
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

  async getToken(
    credentials: AuthRequest = CONFIG.DEFAULT_CREDENTIALS,
  ): Promise<string> {
    const response = await this.createToken(credentials);

    const isValidTokenFormat = (token: unknown): token is string => {
      return typeof token === 'string' && token.trim().length > 0;
    };

    const token = response.body?.token;

    if (response.status !== 200 || !isValidTokenFormat(token)) {
      throw new Error(
        `[AuthService] Invalid or missing token in response. Status: ${response.status}`,
      );
    }
    return token;
  }
}
