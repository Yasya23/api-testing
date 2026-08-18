import { BookingPayload } from '@types/common';

function buildBookingPayload(
  bookingPayload: BookingPayload,
  overrides: Partial<BookingPayload>,
): BookingPayload {
  return {
    ...bookingPayload,
    ...overrides,
  };
}

const initialBookingData: BookingPayload = {
  firstname: 'Jim',
  lastname: 'Brown',
  totalprice: 111,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-01-01',
    checkout: '2026-01-10',
  },
  additionalneeds: 'Breakfast',
};

const updatedBookingData: BookingPayload = buildBookingPayload(
  initialBookingData,
  {
    firstname: 'Jami',
    totalprice: 501,
    depositpaid: false,
    bookingdates: {
      checkin: '2026-01-01',
      checkout: '2026-01-19',
    },
    additionalneeds: 'Late Checkout & Dinner',
  },
);

export const bookingData = {
  initial: initialBookingData,
  updated: updatedBookingData,
};
