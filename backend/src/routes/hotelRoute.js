import express from 'express';

import { registerHotel } from '../controllers/hotelController.js';
import { protectedRoute } from '../middlewares/authMiddleware.js';

const hotelRouter = express.Router();
hotelRouter.post('/', protectedRoute, registerHotel);

export default hotelRouter;
