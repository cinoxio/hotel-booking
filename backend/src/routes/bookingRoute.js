import express from 'express';
import {
    checkAvailabilityAPI,
    createBooking,
    getUserBookings,
    getHotelBookings
} from '../controllers/bookingController.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protectedRoute, createBooking);
bookingRouter.get('/user', protectedRoute, getUserBookings);
bookingRouter.get('/hotel', protectedRoute, getHotelBookings);

export default bookingRouter;
