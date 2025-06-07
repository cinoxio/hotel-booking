import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Clerk user ID
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    image: { type: String, default: null },
    role: { type: String, enum: ['user', 'hotelOwner'], default: 'user' },
    recentSearchedCities: [{ type: String }]
}, { timestamps: true });

// Only create if it doesn't exist
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
