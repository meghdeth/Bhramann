import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { updateProfile, changePassword, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);

// Update profile
router.put('/profile', protect, updateProfile);
// Change password
router.put('/password', protect, changePassword);
// Get current user profile
router.get('/profile', protect, getProfile);

export default router;
