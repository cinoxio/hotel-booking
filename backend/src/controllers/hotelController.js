import Hotel from '../models/hotel-model.js';
import User from '../models/user-model.js';

export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const owner = req.user._id;

        const hotel = await Hotel.findOne({ owner })

        if (hotel) {
            return res.status(400).json({ success: false, message: 'Hotel already registered' });
        }
        // ✅ FIXED: Use await with Hotel.create() OR create then save, not both
        const newHotel = await Hotel.create({
            name,
            address,
            contact,
            city,
            owner,
        });

        await User.findByIdAndUpdate(owner, { role: 'hotelOwner' });

        res.status(200).json({success: true, message: 'Hotel registered successfully', hotel: newHotel});
    } catch (error) { // ✅ FIXED: Use 'error' instead of 'err'
        console.error(error);
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
}

