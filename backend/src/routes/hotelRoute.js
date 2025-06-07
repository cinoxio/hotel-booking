import express from "express"

import { protectedRoute } from '../middleware/authMiddleware.js'
import { registerHotel } from '../controllers/hotelController.js'

const hotelRouter = express.Router()
hotelRouter.post('/', protectedRoute, registerHotel)

export default hotelRouter
