import express from 'express';
import { signup, login, verifyOtp, resendOtp } from '../controllers/authController.js';
import { updateProfile, changePassword, getProfile } from '../controllers/authController.js';
import { forgotPassword, resetPassword } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
// Signup
router.post('/signup', signup);
// Login
router.post('/login', login);
// Verify OTP
router.post('/verify-otp', verifyOtp);
//Forgot password
router.post('/forgot-password', forgotPassword);
//Forgot password page
router.post('/reset-password/:token', resetPassword);
// Update profile
router.put('/profile', protect, updateProfile);
// Change password
router.put('/password', protect, changePassword);
// Get current user profile
router.get('/profile', protect, getProfile);
// Resend OTP
router.post('/resend-otp', resendOtp);

export default router;
