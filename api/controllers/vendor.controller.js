import Vendor from '../models/vendor.module.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import User from '../models/user.module.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

// Cookie configuration for better security and consistency
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Secure in production
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
};

// Register new vendor
export const registerVendor = async (req, res, next) => {
  try {
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      shopName, 
      shopUrl, 
      phoneNumber 
    } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !shopName) {
      return next(errorHandler(400, 'Please provide all required fields: email, password, firstName, lastName, shopName'));
    }

    // Check if vendor with this email already exists
    const existingVendor = await Vendor.findOne({ email });
    
    if (existingVendor) {
      return next(errorHandler(400, 'Vendor with this email already exists'));
    }

    // Check if shop URL is unique if provided
    if (shopUrl) {
      const shopUrlExists = await Vendor.findOne({ shopUrl });
      if (shopUrlExists) {
        return next(errorHandler(400, 'Shop URL is already taken'));
      }
    }

    // Create full username from first and last name
    const username = `${firstName} ${lastName}`;

    // Create new vendor
    const newVendor = new Vendor({
      // Authentication info
      email,
      password, // Will be automatically hashed by the model
      username,
      
      // Personal info
      firstName,
      lastName,
      phoneNumber,
      
      // Shop info
      shopName,
      shopUrl,
      shopDescription: req.body.shopDescription || '', // Optional
      
      // Set default values for other fields
      isActive: true,
      isVerified: false,
      rating: 0,
      totalRatings: 0,
      
      // Optional address if provided
      address: req.body.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      
      // Optional social media if provided
      socialMedia: req.body.socialMedia || {
        facebook: '',
        twitter: '',
        instagram: '',
        website: ''
      }
    });

    // Save the vendor
    const savedVendor = await newVendor.save();
    
    // Create JWT token
    const token = jwt.sign(
      { id: savedVendor._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    // Remove password from response - use different variable name to avoid conflict
    const { password: vendorPassword, ...vendorWithoutPassword } = savedVendor._doc;

    res.cookie('access_token', token, cookieOptions)
      .status(201)
      .json({
        success: true,
        message: 'Vendor registered successfully',
        vendor: vendorWithoutPassword
      });
  } catch (err) {
    next(err);
  }
};

// For backward compatibility - redirect to registerVendor
export const createVendorProfile = registerVendor;

// Vendor logout
export const logoutVendor = async (req, res, next) => {
  try {
    // Clear the cookie
    res.clearCookie('access_token')
      .status(200)
      .json({
        success: true,
        message: 'Logged out successfully'
      });
  } catch (err) {
    next(err);
  }
};

// Vendor login
export const loginVendor = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find vendor by email
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return next(errorHandler(404, 'Vendor not found'));
    }
    
    // Check password
    const validPassword = vendor.verifyPassword(password);
    if (!validPassword) {
      return next(errorHandler(401, 'Invalid credentials'));
    }
    
    // Check if vendor is active
    if (!vendor.isActive) {
      return next(errorHandler(403, 'This vendor account has been deactivated'));
    }
    
    // Update last login
    vendor.lastLogin = new Date();
    await vendor.save();
    
    // Create token
    const token = jwt.sign(
      { id: vendor._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    // Remove password from response
    const { password: vendorPassword, ...vendorWithoutPassword } = vendor._doc;
    
    res.cookie('access_token', token, cookieOptions)
      .status(200)
      .json({
        success: true,
        vendor: vendorWithoutPassword
      });
    
  } catch (err) {
    next(err);
  }
};

// Get vendor dashboard data
export const getVendorDashboard = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.user._id);
    if (!vendor) return next(errorHandler(404, 'Vendor profile not found'));

    // Get count of products
    const productCount = await Product.countDocuments({ vendorId: vendor._id });
    
    // Get recent orders (if you have an Order model)
    const recentOrders = await Order.find({ 
      'items.vendorId': vendor._id 
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('userId', 'username email');

    // Get total sales and revenue
    const salesStats = await Order.aggregate([
      { $match: { 'items.vendorId': vendor._id, status: { $in: ['completed', 'delivered'] } } },
      { $unwind: '$items' },
      { $match: { 'items.vendorId': vendor._id } },
      { $group: {
          _id: null,
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      }
    ]);

    // Get monthly revenue for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyRevenue = await Order.aggregate([
      { $match: { 
          'items.vendorId': vendor._id, 
          status: { $in: ['completed', 'delivered'] },
          createdAt: { $gte: sixMonthsAgo }
        } 
      },
      { $unwind: '$items' },
      { $match: { 'items.vendorId': vendor._id } },
      { $group: {
          _id: { 
            month: { $month: '$createdAt' }, 
            year: { $year: '$createdAt' } 
          },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.status(200).json({
      success: true,
      vendor: {
        _id: vendor._id,
        shopName: vendor.shopName,
        shopDescription: vendor.shopDescription,
        address: vendor.address,
        rating: vendor.rating,
        isActive: vendor.isActive,
        isVerified: vendor.isVerified,
        createdAt: vendor.createdAt
      },
      stats: {
        productCount,
        totalSales: salesStats[0]?.totalSales || 0,
        totalRevenue: salesStats[0]?.totalRevenue || 0,
        monthlyRevenue
      },
      recentOrders
    });
  } catch (err) {
    next(err);
  }
};

// Update vendor profile
export const updateVendorProfile = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) return next(errorHandler(404, 'Vendor profile not found'));

    // Fields that can be updated
    const updatableFields = [
      'shopName', 'shopDescription', 'logo', 'bannerImage', 'email', 
      'phone', 'address', 'openingHours', 'paymentDetails', 
      'policies', 'socialMedia'
    ];

    // Build update object with only allowed fields
    const updateData = {};
    Object.keys(req.body).forEach(key => {
      if (updatableFields.includes(key)) {
        updateData[key] = req.body[key];
      }
    });

    // Update vendor profile
    const updatedVendor = await Vendor.findByIdAndUpdate(
      vendor._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Vendor profile updated successfully',
      vendor: updatedVendor
    });
  } catch (err) {
    next(err);
  }
};

// Get products by vendor
export const getVendorProducts = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) return next(errorHandler(404, 'Vendor profile not found'));

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get products with pagination
    const products = await Product.find({ vendorId: vendor._id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total product count for pagination
    const totalProducts = await Product.countDocuments({ vendorId: vendor._id });

    res.status(200).json({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        hasNextPage: page * limit < totalProducts,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get vendor orders
export const getVendorOrders = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) return next(errorHandler(404, 'Vendor profile not found'));

    const status = req.query.status;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query based on status
    const query = { 'items.vendorId': vendor._id };
    if (status && status !== 'all') {
      query.status = status;
    }

    // Get orders with pagination
    const orders = await Order.find(query)
      .populate('userId', 'username email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total orders count for pagination
    const totalOrders = await Order.countDocuments(query);

    // Get order status counts
    const statusCounts = await Order.aggregate([
      { $match: { 'items.vendorId': vendor._id } },
      { $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statusMap = {};
    statusCounts.forEach(item => {
      statusMap[item._id] = item.count;
    });

    res.status(200).json({
      success: true,
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        hasNextPage: page * limit < totalOrders,
        hasPrevPage: page > 1
      },
      statusCounts: statusMap
    });
  } catch (err) {
    next(err);
  }
};

// Update order status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return next(errorHandler(400, 'Order ID and status are required'));
    }

    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) return next(errorHandler(404, 'Vendor profile not found'));

    // Find the order that belongs to this vendor
    const order = await Order.findOne({
      _id: orderId,
      'items.vendorId': vendor._id
    });

    if (!order) {
      return next(errorHandler(404, 'Order not found or does not belong to this vendor'));
    }

    // Update order status
    // Note: In a real multi-vendor system, you might need to update just the
    // status of items belonging to this vendor, not the entire order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order: updatedOrder
    });
  } catch (err) {
    next(err);
  }
};

// Get vendor analytics
export const getVendorAnalytics = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) return next(errorHandler(404, 'Vendor profile not found'));

    // Time period for analytics
    const period = req.query.period || 'month'; // day, week, month, year
    const endDate = new Date();
    let startDate = new Date();

    // Set start date based on period
    switch (period) {
      case 'day':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 1);
    }

    // Sales analytics
    const salesAnalytics = await Order.aggregate([
      { $match: { 
          'items.vendorId': vendor._id,
          createdAt: { $gte: startDate, $lte: endDate },
          status: { $in: ['completed', 'delivered'] }
        } 
      },
      { $unwind: '$items' },
      { $match: { 'items.vendorId': vendor._id } },
      { $group: {
          _id: {
            // Group by day, week, or month depending on period
            ...(period === 'day' && { 
              hour: { $hour: '$createdAt' } 
            }),
            ...(period === 'week' && { 
              day: { $dayOfWeek: '$createdAt' } 
            }),
            ...(period === 'month' && { 
              day: { $dayOfMonth: '$createdAt' } 
            }),
            ...(period === 'year' && { 
              month: { $month: '$createdAt' } 
            })
          },
          sales: { $sum: 1 },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Product performance
    const productPerformance = await Order.aggregate([
      { $match: { 
          'items.vendorId': vendor._id,
          createdAt: { $gte: startDate, $lte: endDate },
          status: { $in: ['completed', 'delivered'] }
        } 
      },
      { $unwind: '$items' },
      { $match: { 'items.vendorId': vendor._id } },
      { $group: {
          _id: '$items.productId',
          totalSold: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 },
      { $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      { $project: {
          productId: '$_id',
          productName: '$productDetails.name',
          productImage: '$productDetails.images',
          totalSold: 1,
          revenue: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      period,
      salesAnalytics,
      productPerformance,
      dateRange: {
        startDate,
        endDate
      }
    });
  } catch (err) {
    next(err);
  }
};

// Delete vendor profile (soft delete by deactivating)
export const deactivateVendorProfile = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) return next(errorHandler(404, 'Vendor profile not found'));

    // Soft delete by deactivating
    vendor.isActive = false;
    await vendor.save();

    // Clear authentication cookie when deactivating
    res.clearCookie('access_token')
      .status(200)
      .json({
        success: true,
        message: 'Vendor profile deactivated successfully'
      });
  } catch (err) {
    next(err);
  }
};

// Reactivate vendor profile
export const reactivateVendorProfile = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.vendor.id);
    if (!vendor) return next(errorHandler(404, 'Vendor profile not found'));

    // Reactivate profile
    vendor.isActive = true;
    await vendor.save();

    // Create new token for the reactivated account
    const token = jwt.sign(
      { id: vendor._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set cookie and return response
    res.cookie('access_token', token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: 'Vendor profile reactivated successfully'
      });
  } catch (err) {
    next(err);
  }
};

// Get public vendor profile by ID (for customers)
export const getPublicVendorProfile = async (req, res, next) => {
  try {
    const vendorId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      return next(errorHandler(400, 'Invalid vendor ID'));
    }
    
    const vendor = await Vendor.findById(vendorId);
    if (!vendor || !vendor.isActive) {
      return next(errorHandler(404, 'Vendor not found or inactive'));
    }

    // Get vendor products
    const products = await Product.find({
      vendorId: vendor._id,
      isActive: true
    })
    .sort('-createdAt')
    .limit(10);

    // Return public info
    res.status(200).json({
      success: true,
      vendor: {
        _id: vendor._id,
        shopName: vendor.shopName,
        shopDescription: vendor.shopDescription,
        logo: vendor.logo,
        bannerImage: vendor.bannerImage,
        address: {
          city: vendor.address.city,
          country: vendor.address.country
        },
        rating: vendor.rating,
        totalRatings: vendor.totalRatings,
        isVerified: vendor.isVerified,
        policies: vendor.policies,
        categories: vendor.categories,
        socialMedia: vendor.socialMedia,
        openingHours: vendor.openingHours,
        createdAt: vendor.createdAt
      },
      featuredProducts: products
    });
  } catch (err) {
    next(err);
  }
};
