// backend/routes/packages.js
import express from 'express';
import {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage
} from '../controllers/packageController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getPackages)
  .post(protect, createPackage);

router
  .route('/:id')
  .get(getPackageById)
  .put(protect, updatePackage)
  .delete(protect, deletePackage);

export default router;
