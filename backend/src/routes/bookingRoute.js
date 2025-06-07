import express from 'express';
import {
    checkAvailabilityAPI,
    createBooking,
    getHotelBookings,
    getUserBookings,
} from '../controllers/bookingController.js';
import { protectedRoute } from '../middlewares/authMiddleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protectedRoute, createBooking);
bookingRouter.get('/user', protectedRoute, getUserBookings);
bookingRouter.get('/hotel', protectedRoute, getHotelBookings);

export default bookingRouter;
