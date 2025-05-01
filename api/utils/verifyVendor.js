import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import Vendor from '../models/vendor.model.js';

export const verifyVendor = async (req, res, next) => {
  const token = req.cookies.access_token;
  
  if (!token) {
    return next(errorHandler(401, 'Unauthorized: No token provided'));
  }
  
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the vendor by the decoded user ID
    const vendor = await Vendor.findById(decoded.id).select('-password');
    
    if (!vendor) {
      return next(errorHandler(404, 'Vendor not found'));
    }
    
    // Check if vendor account is active
    if (vendor.isActive === false) {
      return next(errorHandler(403, 'This account has been deactivated'));
    }
    
    // Attach vendor to the request object for further use in the route
    req.vendor = vendor;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(errorHandler(401, 'Unauthorized: Token expired'));
    }
    return next(errorHandler(401, 'Unauthorized: Invalid token'));
  }
};

// Middleware to check if vendor is verified
export const isVerifiedVendor = (req, res, next) => {
  if (!req.vendor.isVerified) {
    return next(errorHandler(403, 'This operation requires a verified vendor account'));
  }
  next();
};
