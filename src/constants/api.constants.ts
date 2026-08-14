export const API_ENDPOINTS = {
  auth: '/auth',
  booking: '/booking',
  bookingById: (id: number) => `${API_ENDPOINTS.booking}/${id}`,
} as const;
