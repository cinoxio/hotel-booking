import { Webhook } from 'svix';
import User from '../models/User.js';

export const clerkWebhooks = async (req, res) => {
    try {
        console.log('📥 Webhook received:', req.headers['svix-id']);
        // Create svix instance with clerk webhook secret
        const wbHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        if (!wbHook) {
            console.log(
                'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
            );
        }
        // Getting Headers
        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        };

        console.log('🔍 Headers received:', Object.keys(headers));

        // Verify webhook and get verified event data
        const evt = wbHook.verify(JSON.stringify(req.body), headers);
        const { data, type } = evt;

        console.log('✅ Webhook verified. Type:', type, 'User ID:', data.id);

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

        console.log('👤 Processing user data:', {
            id: userData._id,
            email: userData.email,
            username: userData.username,
        });

        // Switch Cases for different Events
        switch (type) {
            case 'user.created': {
                const newUser = await User.create(userData);
                console.log('✅ User created successfully:', newUser._id);
                break;
            }
            case 'user.updated': {
                const updatedUser = await User.findByIdAndUpdate(
                    data.id,
                    userData,
                    { new: true }
                );
                console.log('✅ User updated successfully:', updatedUser?._id);
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                console.log('✅ User deleted successfully:', data.id);
                break;
            }
            default:
                console.log(`⚠️ Unhandled webhook type: ${type}`);
                break;
        }

        res.status(200).json({
            success: true,
            message: 'Webhook received and processed successfully.',
        });
    } catch (error) {
        console.error('❌ Webhook error:', error.message);
        console.error('Stack trace:', error.stack);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
