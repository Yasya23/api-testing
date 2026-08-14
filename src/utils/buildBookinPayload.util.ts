import { BookingPayload } from '@types/common';

export function buildBookingPayload(
  bookingPayload: BookingPayload,
  overrides: Partial<BookingPayload>,
): BookingPayload {
  return {
    ...bookingPayload,
    ...overrides,
  };
}
