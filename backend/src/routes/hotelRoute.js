import express from 'express';
import { registerHotel } from '../controllers/hotelController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const hotelRouter = express.Router();  // Changed from registerRouter to hotelRouter

hotelRouter.post('/', protectRoute, registerHotel);

export default hotelRouter;

