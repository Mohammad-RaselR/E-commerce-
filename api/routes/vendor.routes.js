import express from 'express';
import { 
  registerVendor,
  loginVendor,
  getVendorDashboard, 
  updateVendorProfile, 
  getVendorProducts,
  getVendorOrders,
  updateOrderStatus,
  getVendorAnalytics,
  deactivateVendorProfile,
  reactivateVendorProfile,
  getPublicVendorProfile
} from '../controllers/vendor.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { isVendor } from '../controllers/auth.controller.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', registerVendor);
router.post('/login', loginVendor);
router.get('/profile/:id', getPublicVendorProfile);

// Protected vendor routes (require authentication)
router.get('/dashboard', verifyToken, isVendor, getVendorDashboard);
router.put('/profile', verifyToken, isVendor, updateVendorProfile);
router.get('/products', verifyToken, isVendor, getVendorProducts);
router.get('/orders', verifyToken, isVendor, getVendorOrders);
router.put('/orders/status', verifyToken, isVendor, updateOrderStatus);
router.get('/analytics', verifyToken, isVendor, getVendorAnalytics);
router.put('/deactivate', verifyToken, isVendor, deactivateVendorProfile);
router.put('/reactivate', verifyToken, isVendor, reactivateVendorProfile);

export default router;
