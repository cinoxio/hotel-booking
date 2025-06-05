import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        _id: { type: String, required: true }, // Fine if using Clerk IDs
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true }, // Add unique constraint
        image: { type: String }, // Make optional
        role: { type: String, enum: ['user', 'hotelOwner'], default: 'user' },
        recentSearchedCities: [{ type: String }], // Remove required from array items
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
