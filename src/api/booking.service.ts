import { FetchClient } from '@utils/fetchClient.util';
import {
  BookingPayload,
  CreateBookingResponse,
  ApiResponse,
} from '@types/common.ts';
import { API_ENDPOINTS } from '@constants/api.constants';

export class BookingService {
  private readonly bookingEndpoint = API_ENDPOINTS.booking;
  private readonly bookingByIdEndpoint = API_ENDPOINTS.bookingById;

  constructor(private client: FetchClient) {}

  async createBooking(
    payload: BookingPayload,
  ): Promise<ApiResponse<CreateBookingResponse>> {
    return this.client.request<CreateBookingResponse>(this.bookingEndpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getBookingById(
    bookingId: number,
  ): Promise<ApiResponse<BookingPayload>> {
    return this.client.request<BookingPayload>(
      this.bookingByIdEndpoint(bookingId),
      {
        method: 'GET',
      },
    );
  }

  async updateBooking(
    bookingId: number,
    payload: BookingPayload,
    token: string,
  ): Promise<ApiResponse<BookingPayload>> {
    return this.client.request<BookingPayload>(
      this.bookingByIdEndpoint(bookingId),
      {
        method: 'PUT',
        headers: {
          Cookie: `token=${token}`,
        },
        body: JSON.stringify(payload),
      },
    );
  }

  async deleteBooking(
    bookingId: number,
    token: string,
  ): Promise<ApiResponse<string>> {
    return this.client.request<string>(this.bookingByIdEndpoint(bookingId), {
      method: 'DELETE',
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}
