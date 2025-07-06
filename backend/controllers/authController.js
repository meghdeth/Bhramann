import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPEmail(email, otp) {
  // Configure your transporter (use real credentials in production)
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });
  
  await transporter.sendMail({
    from: `"Bhramann" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Bhramann Login Code",
    text: `Your Bhramann login code is: ${otp}
  
  This code will expire in 10 minutes. If you did not request this, you can ignore this email.
  
  — The Bhramann Team`,
    html: `
      <div style="font-family:Arial, sans-serif; color:#333; line-height:1.5; max-width:600px; margin:0 auto; padding:20px;">
        <h1 style="color:#0297CF; margin-bottom:0.5em;">Your Bhramann Login Code</h1>
        <p>Hi there,</p>
        <p>Use the following one-time password (OTP) to complete your login:</p>
        <div style="margin:20px 0; text-align:center;">
          <span style="
            display:inline-block;
            background:#f0f4f8;
            padding:15px 25px;
            font-size:32px;
            font-weight:bold;
            letter-spacing:4px;
            border-radius:6px;
            color:#0297CF;
          ">${otp}</span>
        </div>
        <p style="color:#666;">This code will expire in <strong>10 minutes</strong>. For your security, do not share it with anyone.</p>
        <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />
        <p style="font-size:14px; color:#999;">
          If you didn't request this code, you can ignore this email.<br/>
          Need help? <a href="https://bhramann.com/support" style="color:#0297CF;">Contact us</a>
        </p>
        <p style="font-size:12px; color:#aaa; margin-top:40px;">© ${new Date().getFullYear()} Bhramann. All rights reserved.</p>
      </div>
    `
  });  
}

async function sendPasswordResetOTP(email, otp) {
  // Configure your transporter (use real credentials in production)
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });
  
  await transporter.sendMail({
    from: `"Bhramann" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Bhramann Password Reset Code",
    text: `Your Bhramann password reset code is: ${otp}
  
  This code will expire in 10 minutes. If you did not request this, you can ignore this email.
  
  — The Bhramann Team`,
    html: `
      <div style="font-family:Arial, sans-serif; color:#333; line-height:1.5; max-width:600px; margin:0 auto; padding:20px;">
        <h1 style="color:#0297CF; margin-bottom:0.5em;">Your Bhramann Login Code</h1>
        <p>Hi there,</p>
        <p>Use the following one-time password (OTP) to complete your password reset process:</p>
        <div style="margin:20px 0; text-align:center;">
          <span style="
            display:inline-block;
            background:#f0f4f8;
            padding:15px 25px;
            font-size:32px;
            font-weight:bold;
            letter-spacing:4px;
            border-radius:6px;
            color:#0297CF;
          ">${otp}</span>
        </div>
        <p style="color:#666;">This code will expire in <strong>10 minutes</strong>. For your security, do not share it with anyone.</p>
        <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />
        <p style="font-size:14px; color:#999;">
          If you didn't request this code, you can ignore this email.<br/>
          Need help? <a href="https://bhramann.com/support" style="color:#0297CF;">Contact us</a>
        </p>
        <p style="font-size:12px; color:#aaa; margin-top:40px;">© ${new Date().getFullYear()} Bhramann. All rights reserved.</p>
      </div>
    `
  });  
}

export const signup = async (req, res) => {
  const { name, phone, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already in use' });
  const hashed = await bcrypt.hash(password, 12);
  const otp = generateOTP();
  const passhashed = await bcrypt.hash(otp, 10);
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  const user = await User.create({
    name, phone, email, password: hashed, role,
    otp: passhashed,
    otpExpires,
    isVerified: false
  });
  await sendOTPEmail(email, otp);
  res.json({ message: 'Signup successful, OTP sent to email', userId: user._id });
};

export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.isVerified) return res.status(400).json({ message: 'User already verified' });
  if (!(await bcrypt.compare(otp, user.otp)) || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, phone: user.phone, email: user.email, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { name, email, phone, bio } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;
    await user.save();
    res.json({ message: 'Profile updated', user: { id: user._id, name: user.name, email: user.email, phone: user.phone, bio: user.bio, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Request password change OTP
export const requestPasswordChangeOTP = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const { current } = req.body;
    if (!current) {
      return res.status(400).json({ message: 'Current password is required' });
    }
    
    const isMatch = await bcrypt.compare(current, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });
    
    // Generate and store OTP
    const otp = generateOTP();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    user.passwordChangeOTP = otpHash;
    user.passwordChangeOTPExpires = otpExpires;
    await user.save();
    
    // Send OTP email
    await sendPasswordResetOTP(user.email, otp);
    
    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Change user password with OTP verification
export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const { new: newPassword, confirm, otp } = req.body;
    if (!newPassword || !confirm || !otp) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (newPassword !== confirm) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }
    
    // Verify OTP
    if (!user.passwordChangeOTP || !user.passwordChangeOTPExpires) {
      return res.status(400).json({ message: 'Please request an OTP first' });
    }
    
    if (user.passwordChangeOTPExpires < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one' });
    }
    
    const isOTPValid = await bcrypt.compare(otp, user.passwordChangeOTP);
    if (!isOTPValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // Update password and clear OTP
    user.password = await bcrypt.hash(newPassword, 12);
    user.passwordChangeOTP = undefined;
    user.passwordChangeOTPExpires = undefined;
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: 'If the email you entered is registered, you will receive a password reset link shortly. Please check your inbox and spam folder.' });
  }
  // Generate token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save();
  // Send email
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  await transporter.sendMail({
    from: `"Bhramann Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Bhramann Password",
    text: `You requested to reset your Bhramann password.
    
  Click the link below to choose a new password:
  ${resetUrl}
  
  This link will expire in 1 hour.
  If you did not request a password reset, you can safely ignore this email.
  
  — The Bhramann Team`,
    html: `
      <div style="
        font-family: Arial, sans-serif;
        color: #333;
        line-height: 1.5;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      ">
        <h1 style="color: #0297CF; margin-bottom: 0.5em;">Forgot your password?</h1>
        <p>We received a request to reset the password for your Bhramann account.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              background-color: #0297CF;
              color: #ffffff;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 4px;
              font-size: 16px;
              font-weight: bold;
            "
          >
            Reset Password
          </a>
        </div>
        <p style="color: #666;">
          This link will expire in <strong>1 hour</strong>. For your security, do not share it with anyone.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 14px; color: #999;">
          If you didn't request a password reset, you can ignore this email or 
          <a href="https://bhramann.com/support" style="color: #0297CF;">contact support</a> if you have questions.
        </p>
        <p style="font-size: 12px; color: #aaa; margin-top: 40px;">
          © ${new Date().getFullYear()} Bhramann. All rights reserved.
        </p>
      </div>
    `
  });  
  res.json({ message: 'If the email you entered is registered, you will receive a password reset link shortly. Please check your inbox and spam folder.' });
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
  user.password = await bcrypt.hash(password, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.json({ message: 'Password has been reset successfully' });
};

export const resendOtp = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.isVerified) return res.status(400).json({ message: 'User already verified' });
  const otp = generateOTP();
  const passhashed = await bcrypt.hash(otp, 10);
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  user.otp = passhashed;
  user.otpExpires = otpExpires;
  await user.save();
  await sendOTPEmail(user.email, otp);
  res.json({ message: 'OTP resent to email' });
};
