import User from  "../models/User.js"

export const handleUserDeleted=async(data)=> {
  try {
    const { id } = data;

    const deletedUser = await User.findByIdAndDelete(id); // Direct _id lookup

    if (!deletedUser) {
      console.warn(`User not found for deletion: ${id}`);
      return;
    }

    console.log(`User deleted from database: ${deletedUser.email}`);

  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}
