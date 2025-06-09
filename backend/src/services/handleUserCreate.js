
import User from '../models/User.js';

export const handleUserCreated = async (data) => {
  try {
    const {
      id,
      email_addresses,
      username,
      image_url,
    } = data;

    // Get primary email
    const primaryEmail = email_addresses.find(email => email.id === data.primary_email_address_id);

    const newUser = new User({
      _id: id, // Using Clerk ID as MongoDB _id
      email: primaryEmail?.email_address || '',
      username: `${data.first_name || ''} ${data.last_name || ''}`.trim() ||
                data.username ||
                'User',
      image: image_url || null,
      role: 'user', // Default role
      recentSearchedCities: []
    }); // Added missing closing brace

    await newUser.save();
    console.log(`User created in database: ${newUser.email}`);

    // You can add additional logic here like:
    // - Send welcome email
    // - Create user preferences
    // - Initialize user data

  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
