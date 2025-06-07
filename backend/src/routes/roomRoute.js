import express from 'express';
import {
    createRoom,
    getOwnerRooms,
    getRoomById,
    getRooms,
    toggleRoomAvailability,
} from '../controllers/roomController.js';
import { protectRoute} from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const roomRouter = express.Router();

roomRouter.post(
    '/',
    upload.array('images', 4),
    protectRoute,
    createRoom
);
roomRouter.get('/', getRooms);
roomRouter.get('/owner', protectRoute, getOwnerRooms);
roomRouter.put('/toggle-availability', protectRoute, toggleRoomAvailability);
// roomRouter.get('/:id', getRoomById);

export default roomRouter;
