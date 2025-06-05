import { Webhook } from 'svix';
import User from '../models/user-model.js';
import { connectDB } from '../configs/db.js';

export const clerkWebhooks = async (req, res) => {
    try {
        // Ensure database connection
        await connectDB();

        // Create svix instance with clerk webhook secret
        const wbHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Getting Headers
        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        };

        // Verify webhook and get verified event data
        const evt = wbHook.verify(req.body, headers);
        const { data, type } = evt;

        // Prepare user data with safe access to nested properties
        const userData = {
            _id: data.id,
            email:
                data.email_addresses?.[0]?.email_address ||
                data.primary_email_address?.email_address ||
                '',
            username:
                `${data.first_name || ''} ${data.last_name || ''}`.trim() ||
                data.username ||
                'User',
            image: data.image_url || null,
        };

        // Switch Cases for different Events
        switch (type) {
            case 'user.created': {
                await User.create(userData);
                break;
            }
            case 'user.updated': {
                await User.findByIdAndUpdate(data.id, userData, { new: true });
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:
                console.log(`Unhandled webhook type: ${type}`);
                break;
        }

        res.status(200).json({
            success: true,
            message: 'Webhook received and processed successfully.',
        });
    } catch (error) {
        console.error('Webhook error:', error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// import { Webhook } from 'svix';
// import User from '../models/user-model.js';
// import { connectDB } from '../configs/db.js';

// export const clerkWebhooks = async (req, res) => {
//     try {
//         // Ensure database connection
//         await connectDB();
//         // Create svix instance with clerk webhook secret
//         const wbHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//         // Getting Headers for verification
//         const headers = {
//             'svix-id': req.headers['svix-id'],
//             'svix-timestamp': req.headers['svix-timestamp'],
//             'svix-signature': req.headers['svix-signature'],
//         };

//         // Verify webhook signature
//         const evt = wbHook.verify(req.body, headers);
//         const { data, type } = evt;

//         // Helper function to get first valid value from array
//         const getFirstValid = (arr) =>
//             arr.find((item) => item && item.trim && item.trim());

//         // Extract user data from webhook payload
//         const extractUserData = (userData) => {
//             const possibleEmails = [
//                 userData?.email_addresses?.[0]?.email_address,
//                 userData?.email_addresses?.[0]?.email,
//                 userData?.primary_email_address?.email_address,
//                 userData?.primary_email_address?.email,
//                 userData?.email,
//             ];

//             const possibleNames = [
//                 userData?.username,
//                 `${userData?.first_name || ''} ${
//                     userData?.last_name || ''
//                 }`.trim(),
//                 userData?.name,
//                 userData?.full_name,
//             ];

//             const possibleImages = [
//                 userData?.image_url,
//                 userData?.profile_image_url,
//                 userData?.avatar_url,
//             ];

//             return {
//                 _id: userData.id,
//                 email: getFirstValid(possibleEmails) || '',
//                 username: getFirstValid(possibleNames) || 'User',
//                 image: getFirstValid(possibleImages) || null,
//             };
//         };

//         // Process webhook events
//         switch (type) {
//             case 'user.created': {
//                 const userData = extractUserData(data);

//                 // Validate required fields
//                 if (!userData.email) {
//                     throw new Error('Email is required for user creation');
//                 }

//                 const newUser = await User.create(userData);

//                 // Log success for monitoring (optional)
//                 if (process.env.NODE_ENV === 'development') {
//                     console.log(`✅ User created: ${newUser._id}`);
//                 }
//                 break;
//             }

//             case 'user.updated': {
//                 const userData = extractUserData(data);

//                 const updatedUser = await User.findByIdAndUpdate(
//                     data.id,
//                     userData,
//                     { new: true, upsert: true }
//                 );

//                 if (process.env.NODE_ENV === 'development') {
//                     console.log(`✅ User updated: ${updatedUser._id}`);
//                 }
//                 break;
//             }

//             case 'user.deleted': {
//                 await User.findByIdAndDelete(data.id);

//                 if (process.env.NODE_ENV === 'development') {
//                     console.log(`✅ User deleted: ${data.id}`);
//                 }
//                 break;
//             }

//             default:
//                 // Log unhandled events for monitoring
//                 if (process.env.NODE_ENV === 'development') {
//                     console.log(`ℹ️ Unhandled webhook type: ${type}`);
//                 }
//                 break;
//         }

//         // Send success response
//         res.status(200).json({
//             success: true,
//             message: 'Webhook processed successfully',
//         });
//     } catch (error) {
//         // Log errors for monitoring
//         console.error('❌ Webhook error:', error.message);

//         // Send error response
//         return res.status(500).json({
//             success: false,
//             message: 'Webhook processing failed',
//             ...(process.env.NODE_ENV === 'development' && {
//                 error: error.message,
//             }),
//         });
//     }
// };
