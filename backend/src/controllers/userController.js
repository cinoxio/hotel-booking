import User from '../models/user-model.js';

// GET API/USER
export const getUser = async (req, res) => {
    try {

        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;

        const response = { success: true, role, recentSearchedCities };
        console.log('✅ Sending response:', response);

        return res.json(response);
    } catch (error) {
        console.error('❌ getUser error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};



export const storeRecentSearchCities = async (req, res) => {
    try {
        const { recentSearchedCity } = req.body;
        const user = req.user;

        // Check if the city already exists to avoid duplicates
            if (user.recentSearchedCities.length < 3) {
                user.recentSearchedCities.push(recentSearchedCity);
            } else {
                user.recentSearchedCities.shift();
                user.recentSearchedCities.push(recentSearchedCity);
        }
        await user.save()
        return res.status(200).json({
            success: true,
            message: 'Recent searched cities updated successfully.',
            recentSearchedCities: user.recentSearchedCities,
        });
    } catch (error) {
        console.error('❌ storeRecentSearchCities error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error in Recent search cities',
        });
    }
};
