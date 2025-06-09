
// Middleware to check if user has admin or owner role
const requireAdminOrOwner = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (!['admin', 'owner'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Admin or Owner access required' });
  }

  next();
};

module.exports = { protectRoute, requireAdminOrOwner };

// ===================================
// User Routes
// File: routes/users.js

const express = require('express');
const { protectRoute, requireAdminOrOwner } = require('../middleware/protectRoute');
const router = express.Router();

// Get current user profile
router.get('/profile', protectRoute, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

// Get user by ID (Admin/Owner only)
router.get('/:userId', protectRoute, requireAdminOrOwner, async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user by MongoDB _id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      requestedBy: {
        _id: req.user._id,
        role: req.user.role
      }
    });

  } catch (error) {
    console.error('Get user error:', error);

    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    res.status(500).json({ error: 'Failed to get user' });
  }
});
