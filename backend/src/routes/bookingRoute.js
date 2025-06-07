import express from 'express';
import {
    checkAvailabilityAPI,
    createBooking,
    getHotelBookings,
    getUserBookings,
} from '../controllers/bookingController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protectRoute, createBooking);
bookingRouter.get('/user', protectRoute, getUserBookings);
bookingRouter.get('/hotel', protectRoute, getHotelBookings);

export default bookingRouter;
