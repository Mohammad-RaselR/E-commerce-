import express from 'express';
import { 
  createVendorProfile,
  
  getVendorProfile, 
  updateVendorProfile,
  Vsignin, 
  
} from '../controllers/vendor.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { isVendor } from '../controllers/auth.controller.js';
import { verifyVendor } from '../utils/verifyVendor.js';
const router = express.Router();

// Public routes (no authentication required)
router.post('/register', createVendorProfile);  // Register a new vendor

router.get('/profile/:id', getVendorProfile);  // View public vendor profile (no login required)
router.post('/vendor-login', Vsignin)
// Protected vendor routes (require authentication)
// router.get('/dashboard', verifyToken, isVendor, getVendorDashboard);  // Get vendor dashboard data
// router.put('/profile', verifyToken, isVendor, updateVendorProfile);  // Update vendor profile
// router.get('/products', verifyToken, isVendor, getVendorProducts);  // Get products listed by the vendor
// router.get('/orders', verifyToken, isVendor, getVendorOrders);  // Get vendor orders
// router.put('/orders/status', verifyToken, isVendor, updateOrderStatus);  // Update the status of an order

// Analytics route - Ensure only verified vendors or admins can access it
// router.get('/analytics', verifyToken, isVendor, getVendorAnalytics);  // Get analytics related to vendor's products/orders

// Deactivation and Reactivation Routes - Only the vendor can deactivate/reactivate their profile
// router.put('/deactivate', verifyToken, isVendor, deactivateVendorProfile);  // Deactivate vendor profile
// router.put('/reactivate', verifyToken, isVendor, reactivateVendorProfile);  // Reactivate vendor profile

export default router;
