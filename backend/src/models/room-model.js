import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
    {
        hotel: {
            type: String,
            required: true,
            ref: 'Hotel',
        },
        roomType: { type: String, required: true },
        description: { type: String, default: '' }, // ✅ FIXED: Removed duplicate
        pricePerNight: {
            type: Number,
            required: true,
        },
        amenities: { type: Array, required: true },
        images: [{ type: String, required: true }],
        isAvailable: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);
export default Room;
