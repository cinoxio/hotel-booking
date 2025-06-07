import User from '../models/user-model.js';

// GET API/USER
export const getUser = async (req, res) => {
    try {
        console.log('👤 getUser controller started');
        console.log('👤 req.user:', req.user ? 'Present' : 'Missing');

        if (!req.user) {
            console.log('❌ req.user is missing in controller');
            return res.status(401).json({
                success: false,
                message: 'User not found in request',
            });
        }

        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;

        console.log('👤 User data:', {
            id: req.user._id,
            role: role,
            citiesCount: recentSearchedCities?.length || 0,
        });

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

// GET API/USER
// export const getUser = async (req, res) => {
//     try {
//         console.log('User from middleware:', req.user); // Debug
//         const role = req.user.role;
//         const recentSearchedCities = req.user.recentSearchedCities;

//         console.log('Sending response:', { role, recentSearchedCities }); // Debug
//         return res.json({ success: true, role, recentSearchedCities });
//     } catch (error) {
//         console.error('getUser error:', error); // Debug
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Internal Server Error',
//         });
//     }
// };

// // User recent search cities
// export const storeRecentSearchCities = async (req, res) => {
//     try {
//         const { recentSearchedCities } = req.body;
//         const user = await req.user;

//         // ✅ FIXED: Check property name consistency
//         if (user.recentSearchedCities.length < 3) {
//             // If less than 3 cities, add the new city
//             user.recentSearchedCities.push(recentSearchedCities);
//         } else {
//             // If 3 cities already exist, remove the oldest one and add the new city
//             user.recentSearchedCities.shift();
//             user.recentSearchedCities.push(recentSearchedCities);
//         }
//         await user.save();
//         return res.status(200).json({success:true, message: 'Recent searched cities updated successfully.'});
//     } catch (error) {
//         res.status(500).json({success:false, message: error.message || 'Internal Server Error'});
//     }
// }


export const storeRecentSearchCities = async (req, res) => {
    try {
        const { recentSearchedCities } = req.body;
        const user = req.user;

        // Check if the city already exists to avoid duplicates
        if (!user.recentSearchedCities.includes(recentSearchedCities)) {
            if (user.recentSearchedCities.length < 3) {
                user.recentSearchedCities.push(recentSearchedCities);
            } else {
                user.recentSearchedCities.shift();
                user.recentSearchedCities.push(recentSearchedCities);
            }

            await user.save();
        }

        return res.status(200).json({
            success: true,
            message: 'Recent searched cities updated successfully.',
            recentSearchedCities: user.recentSearchedCities,
        });
    } catch (error) {
        console.error('❌ storeRecentSearchCities error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
