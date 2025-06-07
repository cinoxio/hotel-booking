import express from 'express';
import {
    createRoom,
    getRooms,
    getOwnerRooms,
    getRoomById,
    toggleRoomAvailability
} from '../controllers/roomController.js';
import { protectedRoute } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const roomRouter = express.Router();

roomRouter.post('/create', protectedRoute, upload.array('images', 5), createRoom);
roomRouter.get('/', getRooms);
roomRouter.get('/owner', protectedRoute, getOwnerRooms);
roomRouter.get('/:id', getRoomById);
roomRouter.put('/toggle-availability', protectedRoute, toggleRoomAvailability);

export default roomRouter;
