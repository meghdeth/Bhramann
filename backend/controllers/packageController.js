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

// @desc    Get all packages (for browsing - public)
// @route   GET /api/packages
// @access  Public
export const getAllPackages = asyncHandler(async (req, res) => {
  const { location, category, minPrice, maxPrice, status = 'active' } = req.query;
  const filter = { status: 'active' };
  
  if (location) {
    filter.location = { $regex: location, $options: 'i' };
  }
  if (category) {
    filter.category = category;
  }
  if (minPrice || maxPrice) {
    filter['priceRanges.price'] = {};
    if (minPrice) filter['priceRanges.price'].$gte = Number(minPrice);
    if (maxPrice) filter['priceRanges.price'].$lte = Number(maxPrice);
  }

  const pkgs = await Package.find(filter)
    .populate('createdBy', 'name email') // Include seller info
    .sort({ createdAt: -1 })
    .lean();
    
  res.json(pkgs);
});

// @desc    Get packages created by authenticated user (seller dashboard)
// @route   GET /api/packages/my-packages
// @access  Private (seller)
export const getMyPackages = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Only fetch packages created by this user (both active and inactive)
  const pkgs = await Package.find({ createdBy: userId })
    .sort({ updatedAt: -1 })
    .lean();
    
  res.json(pkgs);
});

// @desc    Get single package by ID
// @route   GET /api/packages/:id
// @access  Public
export const getPackageById = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id)
    .populate('createdBy', 'name email phone'); // Include seller info
    
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }
  
  if (pkg.status !== 'active') {
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