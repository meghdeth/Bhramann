// backend/routes/packages.js
import express from 'express';
import {
  createPackage,
  getAllPackages,
  getMyPackages,
  getPackageById,
  updatePackage,
  deletePackage
} from '../controllers/packageController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router
  .route('/')
  .get(getAllPackages) // Browse all active packages (public)
  .post(protect, createPackage); // Create package (protected)

router.get('/my-packages', protect, getMyPackages); // Get seller's own packages

router
  .route('/:id')
  .get(getPackageById) // View single package
  .put(protect, updatePackage)  // Update package
  .delete(protect, deletePackage);  // Delete package

export default router;
