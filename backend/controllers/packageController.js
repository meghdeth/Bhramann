// backend/controllers/packageController.js
import asyncHandler from 'express-async-handler';
import Package from '../models/Package.js';

// @desc    Create a new package
// @route   POST /api/packages
// @access  Private (seller)
export const createPackage = asyncHandler(async (req, res) => {
  const data = { ...req.body, createdBy: req.user._id };

  // parse ISO date strings into Date objects
  if (data.availableDates) {
    data.availableDates.start = new Date(data.availableDates.start);
    data.availableDates.end   = new Date(data.availableDates.end);
  }
  if (Array.isArray(data.specificDates)) {
    data.specificDates = data.specificDates.map(d => new Date(d));
  }

  const pkg = await Package.create(data);
  res.status(201).json(pkg);
});

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
export const getPackages = asyncHandler(async (req, res) => {
  const pkgs = await Package.find().sort({ createdAt: -1 });
  res.json(pkgs);
});

// @desc    Get single package by ID
// @route   GET /api/packages/:id
// @access  Public
export const getPackageById = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }
  res.json(pkg);
});

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private (seller)
export const updatePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }
  // only the creator can update
  if (pkg.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this package');
  }

  const data = { ...req.body };
  if (data.availableDates) {
    data.availableDates.start = new Date(data.availableDates.start);
    data.availableDates.end   = new Date(data.availableDates.end);
  }
  if (Array.isArray(data.specificDates)) {
    data.specificDates = data.specificDates.map(d => new Date(d));
  }

  const updated = await Package.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  });
  res.json(updated);
});

export const deletePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }
  // only the creator can delete
  if (pkg.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this package');
  }

  await pkg.remove();
  res.json({ message: 'Package removed' });
});