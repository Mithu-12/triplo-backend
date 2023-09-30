import express from 'express';
import NodeCache from 'node-cache';
import {
  createPackage,
  deletePackage,
  getAllPackage,
  getPackage,
  searchPackage,
  updatePackage,
} from '../controller/package.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create a new NodeCache instance
const cache = new NodeCache();

// Middleware to check if the response data is present in the cache
const cacheMiddleware = (req, res, next) => {
  const cacheKey = req.originalUrl; // Use the request URL as the cache key

  // Check if the data exists in the cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('Data retrieved from cache package');
    res.json(cachedData);
  } else {
    // Data not found in cache, continue to the next middleware
    next();
  }
};

// Middleware to cache the response data
const cacheResponse = (req, res, next) => {
  const cacheKey = req.originalUrl; // Use the request URL as the cache key

  // Store the response data in the cache
  cache.set(cacheKey, res.locals.data);
  console.log('Data retrieved from data');
  next();
};

// Create route (no caching for create)
router.post('/', createPackage);

// Update route (no caching for update)
router.put('/:id', verifyAdmin, updatePackage);

// Delete route (no caching for delete)
router.delete('/:id', verifyAdmin, deletePackage);

// Get a specific package route
router.get('/:id', getPackage, cacheMiddleware, cacheResponse);

// Get all packages route
router.get('/', cacheMiddleware, getAllPackage, cacheResponse);

// Search city route
router.get('/search-city', searchPackage);

export default router;
