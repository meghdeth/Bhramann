import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user.isVerified) {
      return res.status(403).json({ message: 'Account not verified. Please verify your account to continue.' });
    }
    next();
  } catch {
    res.status(401).json({ message: 'Token verification failed' });
  }
};
