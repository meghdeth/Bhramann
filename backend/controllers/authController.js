import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { name, phone, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already in use' });
  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, phone, email, password: hashed, role });
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

// Change user password
export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { current, new: newPassword, confirm } = req.body;
    if (!current || !newPassword || !confirm) {
      return res.status(400).json({ message: 'All password fields are required' });
    }
    const isMatch = await bcrypt.compare(current, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });
    if (newPassword !== confirm) return res.status(400).json({ message: 'New passwords do not match' });
    user.password = await bcrypt.hash(newPassword, 12);
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
