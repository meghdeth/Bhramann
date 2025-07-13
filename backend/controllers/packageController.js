import asyncHandler from 'express-async-handler';
import Package from '../models/Package.js';
import { bucket } from '../config/gcs.js';
import { v4 as uuidv4 } from 'uuid';

// Helper to upload a Base64 image to GCS
async function uploadBase64ToGCS(base64String, folder = '') {
  const matches = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!matches) throw new Error('Invalid base64 string');
  const contentType = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  const filename = `${folder}${folder ? '/' : ''}${uuidv4()}`;
  const file = bucket.file(filename);
  await file.save(buffer, { contentType, resumable: false });
  return `https://storage.googleapis.com/${bucket.name}/${filename}`;
}

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

  // Remove images from data for initial save
  const mainPhotos = data.mainPhotos;
  const highlights = data.highlights;
  const stays = data.stays;
  delete data.mainPhotos;
  delete data.highlights;
  delete data.stays;

  // First, try to create the package (without images)
  let pkg = await Package.create(data);

  // Now upload images and update the package
  const update = {};

  // Upload mainPhotos (array of base64 or URLs)
  if (Array.isArray(mainPhotos)) {
    update.mainPhotos = await Promise.all(mainPhotos.map(async (img) => {
      if (img.startsWith('data:')) {
        return await uploadBase64ToGCS(img, 'mainPhotos');
      }
      return img;
    }));
  }

  // Upload highlight images
  if (Array.isArray(highlights)) {
    update.highlights = await Promise.all(highlights.map(async (hl) => {
      if (hl.image && hl.image.startsWith('data:')) {
        hl.image = await uploadBase64ToGCS(hl.image, 'highlights');
      }
      return hl;
    }));
  }

  // Upload stay images
  if (Array.isArray(stays)) {
    update.stays = await Promise.all(stays.map(async (stay) => {
      if (Array.isArray(stay.images)) {
        stay.images = await Promise.all(stay.images.map(async (img) => {
          if (img.startsWith('data:')) {
            return await uploadBase64ToGCS(img, 'stays');
          }
          return img;
        }));
      }
      return stay;
    }));
  }

  // Update the package with image URLs
  pkg = await Package.findByIdAndUpdate(pkg._id, update, { new: true });
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

  // Handle image uploads for updates
  if (Array.isArray(data.mainPhotos)) {
    data.mainPhotos = await Promise.all(data.mainPhotos.map(async (img) => {
      if (img && typeof img === 'string' && img.startsWith('data:')) {
        return await uploadBase64ToGCS(img, 'mainPhotos');
      }
      return img;
    }));
  }

  if (Array.isArray(data.highlights)) {
    data.highlights = await Promise.all(data.highlights.map(async (hl) => {
      if (hl.image && typeof hl.image === 'string' && hl.image.startsWith('data:')) {
        hl.image = await uploadBase64ToGCS(hl.image, 'highlights');
      }
      return hl;
    }));
  }

  if (Array.isArray(data.stays)) {
    data.stays = await Promise.all(data.stays.map(async (stay) => {
      if (Array.isArray(stay.images)) {
        stay.images = await Promise.all(stay.images.map(async (img) => {
          if (img && typeof img === 'string' && img.startsWith('data:')) {
            return await uploadBase64ToGCS(img, 'stays');
          }
          return img;
        }));
      }
      return stay;
    }));
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

  // Collect all image URLs
  const imageUrls = [
    ...(pkg.mainPhotos || []),
    ...(pkg.highlights?.map(h => h.image).filter(Boolean) || []),
    ...(pkg.stays?.flatMap(s => s.images || []) || [])
  ];

  // Extract GCS object names from URLs
  const bucketUrlPrefix = `https://storage.googleapis.com/${bucket.name}/`;
  const objectNames = imageUrls
    .filter(url => url && url.startsWith(bucketUrlPrefix))
    .map(url => url.slice(bucketUrlPrefix.length));

  // Delete images from GCS
  await Promise.all(
    objectNames.map(name => bucket.file(name).delete().catch(() => {}))
  );

  await pkg.remove();
  res.json({ message: 'Package removed' });
});