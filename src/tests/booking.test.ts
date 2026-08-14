import { describe, it, before } from 'node:test';

import { CONFIG } from '@config/config';
import { ApiAssert } from '@utils/assertions.util';
import { FetchClient } from '@utils/fetchClient.util';

import { AuthService } from '@api/auth.service';
import { BookingService } from '@api/booking.service';
import { bookingData } from '@test-data/booking.data';

describe('Restful Booker API Automated Test Suite', () => {
  let fetchClient: FetchClient;
  let authService: AuthService;
  let bookingService: BookingService;

  let authToken: string;
  let createdBookingId: number;

  before(() => {
    fetchClient = new FetchClient(CONFIG.BASE_URL);
    authService = new AuthService(fetchClient);
    bookingService = new BookingService(fetchClient);
  });

  // Scenario 1: Authentication
  it('1. Should generate an authentication token successfully', async () => {
    const response = await authService.createToken(CONFIG.DEFAULT_CREDENTIALS);

    ApiAssert.status(response, 200);
    ApiAssert.headerContains(response, 'content-type', 'application/json');
    ApiAssert.exists(response.body.token, 'Response body token property');

    ApiAssert.isEqual(
      typeof response.body.token,
      'string',
      'Token should be a string',
    );

    authToken = response.body.token;
  });

  // Scenario 2: Create Booking
  it('2. Should create a new booking', async () => {
    const response = await bookingService.createBooking(bookingData.initial);

    ApiAssert.status(response, 200);
    ApiAssert.headerContains(response, 'content-type', 'application/json');
    ApiAssert.exists(response.body.bookingid, 'Bookingid');

    ApiAssert.isEqual(
      typeof response.body.bookingid,
      'number',
      'Bookingid should be a number',
    );

    ApiAssert.isDeepEqual(response.body.booking, bookingData.initial);

    createdBookingId = response.body.bookingid;
  });

  // Scenario 3: Get Created Booking by ID
  it('3. Should fetch the created booking by ID', async () => {
    ApiAssert.exists(createdBookingId, 'createdBookingId');

    const response = await bookingService.getBookingById(createdBookingId);

    ApiAssert.status(response, 200);
    ApiAssert.headerContains(response, 'content-type', 'application/json');
    ApiAssert.isDeepEqual(response.body, bookingData.initial);
  });

  // Scenario 4: Update Booking
  it('4. Should update the created booking using auth token', async () => {
    ApiAssert.exists(createdBookingId, 'createdBookingId');
    ApiAssert.exists(authToken, 'authToken');

    const response = await bookingService.updateBooking(
      createdBookingId,
      bookingData.updated,
      authToken,
    );

    ApiAssert.status(response, 200);

    ApiAssert.headerContains(response, 'content-type', 'application/json');

    ApiAssert.isDeepEqual(response.body, bookingData.updated);
  });

  // Scenario 5: Remove Booking & Verify Deletion
  it('5. Should remove the booking and confirm it no longer exists', async () => {
    ApiAssert.exists(createdBookingId, 'createdBookingId');
    ApiAssert.exists(authToken, 'authToken');

    // DELETE request
    const deleteResponse = await bookingService.deleteBooking(
      createdBookingId,
      authToken,
    );

    ApiAssert.status(deleteResponse, 201, 'Expected status 201 for DELETE');

    ApiAssert.isEqual(
      deleteResponse.statusText,
      'Created',
      'DELETE response status text should be "Created"',
    );

    const getResponse = await bookingService.getBookingById(createdBookingId);

    ApiAssert.status(
      getResponse,
      404,
      'Expected status 404 for deleted resource',
    );
  });
});
