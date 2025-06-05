import { Webhook } from 'svix';
import User from '../models/user-model.js';
import { connectDB } from '../configs/db.js';

export const clerkWebhooks = async (req, res) => {
    try {
        console.log('=== RAW WEBHOOK DEBUG ===');
        console.log('Headers:', req.headers);
        console.log('Raw Body:', req.body.toString());
        console.log('========================');

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

        // Get raw body for verification
        const payload = req.body;

        // Verify webhook
        const evt = wbHook.verify(payload, headers);

        console.log('=== VERIFIED EVENT ===');
        console.log('Full event:', JSON.stringify(evt, null, 2));
        console.log('====================');

        // Getting data from verified event
        const { data, type } = evt;

        // Try different ways to access user data
        console.log('=== DATA EXTRACTION ATTEMPTS ===');
        console.log('Type:', type);
        console.log('Data keys:', Object.keys(data || {}));

        // Try different email field names
        const possibleEmails = [
            data?.email_addresses?.[0]?.email_address,
            data?.email_addresses?.[0]?.email,
            data?.primary_email_address?.email_address,
            data?.primary_email_address?.email,
            data?.email
        ];
        console.log('Possible emails:', possibleEmails);

        // Try different name combinations
        const possibleNames = [
            data?.username,
            `${data?.first_name || ''} ${data?.last_name || ''}`.trim(),
            data?.name,
            data?.full_name
        ];
        console.log('Possible names:', possibleNames);

        // Try different image URLs
        const possibleImages = [
            data?.image_url,
            data?.profile_image_url,
            data?.avatar_url
        ];
        console.log('Possible images:', possibleImages);
        console.log('===============================');

        // Get the first non-empty value
        const getFirstValid = (arr) => arr.find(item => item && item.trim && item.trim());

        const userData = {
            _id: data.id,
            email: getFirstValid(possibleEmails) || 'no-email@example.com',
            username: getFirstValid(possibleNames) || 'Unknown User',
            image: getFirstValid(possibleImages) || null,
        };

        console.log('=== FINAL USER DATA ===');
        console.log('userData to save:', JSON.stringify(userData, null, 2));
        console.log('=====================');

        // Switch Cases for different Events
        switch (type) {
            case 'user.created': {
                console.log('Creating user:', userData._id);
                const newUser = await User.create(userData);
                console.log('User created successfully:', newUser);
                break;
            }
            case 'user.updated': {
                console.log('Updating user:', userData._id);
                const updatedUser = await User.findByIdAndUpdate(
                    data.id,
                    userData,
                    { new: true, upsert: true }
                );
                console.log('User updated successfully:', updatedUser);
                break;
            }
            case 'user.deleted': {
                console.log('Deleting user:', data.id);
                await User.findByIdAndDelete(data.id);
                console.log('User deleted successfully');
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
        console.error('Webhook error:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// import { Webhook } from 'svix';
// import User from '../models/user-model.js';


// export const clerkWebhooks = async (req, res) => {
//     try {
//         // Create xvis instance with clerk webhook secret
//         const wbHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//         // Getting Headers
//         const headers = {
//             'svix-id': req.headers['svix-id'],
//             'svix-timestamp': req.headers['svix-timestamp'],
//             'svix-signature': req.headers['svix-signature'],
//         };

//         // Verify Headers
//         await wbHook.verify(JSON.stringify(req.body), headers);
//         // Getting data from request body
//         const { data, type } = req.body;

//         const userData = {
//             _id: data.id,
//             email: data.email_addresses[0].email.address,
//             username: data.first_name + ' ' + data.last_name,
//             image: data.image_url || null,
//         };

//         // Switch Cases for different Events

//         switch (type) {
//             case 'user.created': {
//                 await User.create(userData);
//                 break;
//             }
//             case 'user.updated': {
//                 await User.findByIdAndUpdate(data.id, userData);
//                 break;
//             }
//             case 'user.deleted':
//                 {
//                     await User.findByIdAndDelete(data.id);
//                     break;
//                 }
//                 console.log(`Unhandled webhook type: ${type}`);
//              default:break;
//                 }

//                 res.status(200).json({
//                     success: true,
//                     message: 'Webhook received and processed successfully.',
//              });
//          } catch (error) {
//         console.log(error.message);
//        return res.status(500).json({success: false, message: error.message });
//     }
// };



