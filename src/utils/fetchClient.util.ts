import { ApiResponse } from '@types/common';

export class FetchClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers = new Headers(options.headers || {});
    if (
      !headers.has('Content-Type') &&
      options.body &&
      typeof options.body === 'string'
    ) {
      headers.set('Content-Type', 'application/json');
    }
    if (!headers.has('Accept')) {
      headers.set('Accept', 'application/json');
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const rawText = await response.text();
    let body: T = {} as T;

    if (rawText) {
      try {
        body = JSON.parse(rawText) as T;
      } catch {
        body = rawText as unknown as T;
      }
    }

    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      body,
      rawText,
    };
  }
}
