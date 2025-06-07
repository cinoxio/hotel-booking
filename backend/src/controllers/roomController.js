import { v2 as cloudinary } from 'cloudinary';
import User from '../models/user-model.js';
import Room from '../models/room-model.js';
import Hotel from '../models/hotel-model.js';

export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities, description } = req.body;
        const owner = req.user._id;

        const hotel = await Hotel.findOne({ owner });

        if (!hotel) {
            return res.status(400).json({
                success: false,
                message: 'No hotel found for this owner',
            });
        }

        // upload images to cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path, {
                folder: 'hotel-images',
            });
            return response.secure_url;
        });

        const images = await Promise.all(uploadImages);

        const newRoom = await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            description: description || '',
            amenities: JSON.parse(amenities),
            images,
        });

        res.status(201).json({
            success: true,
            message: 'Room created successfully',
            room: newRoom,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error',
        });
    }
}


export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true })
            .populate({
                path: 'hotel',
                populate: { path: 'owner', select: 'username image' }, // ✅ FIXED: Use correct field names
            })
            .sort({ createdAt: -1 });
        res.status(200).json({success: true, rooms});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const getOwnerRooms = async (req, res) => {
    try {
        // const hotelData = await Hotel.find({ owner: req.user._id });
      const hotelData = await Hotel.findOne({ owner: req.user._id }); // ✅ FIXED: Use findOne instead of find

        const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate("hotel");
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};


export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body; // ✅ FIXED: Correct destructuring
        const roomData = await Room.findById(roomId);

        if (!roomData) {
            return res
                .status(404)
                .json({ success: false, message: 'Room not found' });
        }

        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();

        res.status(200).json({
            success: true,
            message: `Room is now ${
                roomData.isAvailable ? 'available' : 'unavailable'
            }`,
            room: roomData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error',
        });
    }
};
