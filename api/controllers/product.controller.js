import Product from '../models/product.model.js';
import Vendor from '../models/vendor.module.js';
import mongoose from 'mongoose';
import { createError } from '../utils/error.js';

// Create a new product
export const createProduct = async (req, res, next) => {
  try {
    // Find vendor associated with current user
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      return next(createError(404, 'Vendor profile not found'));
    }
    
    // Create new product with vendor ID
    const newProduct = new Product({
      ...req.body,
      vendorId: vendor._id
    });
    
    // Save the product
    const savedProduct = await newProduct.save();
    
    // Add product to vendor's products array
    await Vendor.findByIdAndUpdate(vendor._id, {
      $push: { products: savedProduct._id }
    });
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: savedProduct
    });
  } catch (err) {
    next(err);
  }
};

// Get all products for a vendor
export const getVendorProducts = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      return next(createError(404, 'Vendor profile not found'));
    }
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Filtering
    const filterOptions = { vendorId: vendor._id };
    
    // Optional filters
    if (req.query.category) filterOptions.category = req.query.category;
    if (req.query.status) filterOptions.status = req.query.status;
    if (req.query.isActive !== undefined) filterOptions.isActive = req.query.isActive === 'true';
    if (req.query.isFeatured !== undefined) filterOptions.isFeatured = req.query.isFeatured === 'true';
    
    // Search
    if (req.query.search) {
      filterOptions.$text = { $search: req.query.search };
    }
    
    // Sorting
    const sortOption = {};
    if (req.query.sort) {
      const sortField = req.query.sort.replace(/^-/, '');
      const sortDirection = req.query.sort.startsWith('-') ? -1 : 1;
      sortOption[sortField] = sortDirection;
    } else {
      sortOption.createdAt = -1; // Default sort by newest
    }
    
    // Get products
    const products = await Product.find(filterOptions)
      .skip(skip)
      .limit(limit)
      .sort(sortOption)
      .select('-__v');
    
    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filterOptions);
    
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

// Get a single product by ID
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid product ID'));
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return next(createError(404, 'Product not found'));
    }
    
    // If requester is not the vendor who owns the product and product is not published
    const vendor = req.user ? await Vendor.findOne({ userId: req.user._id }) : null;
    const isOwner = vendor && product.vendorId.equals(vendor._id);
    
    if (!isOwner && product.status !== 'published') {
      return next(createError(403, 'Access denied to this product'));
    }
    
    res.status(200).json({
      success: true,
      product
    });
  } catch (err) {
    next(err);
  }
};

// Update a product
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid product ID'));
    }
    
    // Check if product exists and belongs to the vendor
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      return next(createError(404, 'Vendor profile not found'));
    }
    
    const product = await Product.findById(id);
    if (!product) {
      return next(createError(404, 'Product not found'));
    }
    
    // Ensure the product belongs to this vendor
    if (!product.vendorId.equals(vendor._id)) {
      return next(createError(403, 'You can only update your own products'));
    }
    
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (err) {
    next(err);
  }
};

// Delete a product
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid product ID'));
    }
    
    // Check if product exists and belongs to the vendor
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      return next(createError(404, 'Vendor profile not found'));
    }
    
    const product = await Product.findById(id);
    if (!product) {
      return next(createError(404, 'Product not found'));
    }
    
    // Ensure the product belongs to this vendor
    if (!product.vendorId.equals(vendor._id)) {
      return next(createError(403, 'You can only delete your own products'));
    }
    
    // Remove product from vendor's products array
    await Vendor.findByIdAndUpdate(vendor._id, {
      $pull: { products: id }
    });
    
    // Delete the product
    await Product.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// Get all products (public)
export const getAllProducts = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    
    // Filtering - only show published and active products
    const filterOptions = {
      status: 'published',
      isActive: true
    };
    
    // Additional filters
    if (req.query.category) filterOptions.category = req.query.category;
    if (req.query.subCategory) filterOptions.subCategory = req.query.subCategory;
    if (req.query.vendor) filterOptions.vendorId = req.query.vendor;
    if (req.query.minPrice || req.query.maxPrice) {
      filterOptions.price = {};
      if (req.query.minPrice) filterOptions.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filterOptions.price.$lte = parseFloat(req.query.maxPrice);
    }
    if (req.query.tags) {
      filterOptions.tags = { $in: req.query.tags.split(',') };
    }
    if (req.query.isFeatured) {
      filterOptions.isFeatured = req.query.isFeatured === 'true';
    }
    
    // Search
    if (req.query.search) {
      filterOptions.$text = { $search: req.query.search };
    }
    
    // Sorting
    const sortOption = {};
    if (req.query.sort) {
      const sortField = req.query.sort.replace(/^-/, '');
      const sortDirection = req.query.sort.startsWith('-') ? -1 : 1;
      sortOption[sortField] = sortDirection;
    } else {
      sortOption.createdAt = -1; // Default sort by newest
    }
    
    // Get products
    const products = await Product.find(filterOptions)
      .skip(skip)
      .limit(limit)
      .sort(sortOption)
      .select('name description price images category rating slug vendorId')
      .populate('vendorId', 'shopName rating');
    
    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filterOptions);
    
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

// Get product details by slug (public)
export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const product = await Product.findOne({ 
      slug, 
      status: 'published', 
      isActive: true 
    }).populate('vendorId', 'shopName rating');
    
    if (!product) {
      return next(createError(404, 'Product not found'));
    }
    
    // Increment view count
    product.viewCount += 1;
    await product.save();
    
    res.status(200).json({
      success: true,
      product
    });
  } catch (err) {
    next(err);
  }
};

// Get featured products (public)
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    
    const featuredProducts = await Product.find({
      status: 'published',
      isActive: true,
      isFeatured: true
    })
    .sort('-createdAt')
    .limit(limit)
    .select('name description price images category rating slug')
    .populate('vendorId', 'shopName');
    
    res.status(200).json({
      success: true,
      products: featuredProducts
    });
  } catch (err) {
    next(err);
  }
};

// Get related products (public)
export const getRelatedProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit) || 4;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid product ID'));
    }
    
    // Get the product
    const product = await Product.findById(id);
    if (!product) {
      return next(createError(404, 'Product not found'));
    }
    
    // Find related products in the same category excluding this product
    const relatedProducts = await Product.find({
      _id: { $ne: id },
      category: product.category,
      status: 'published',
      isActive: true
    })
    .sort('-rating.average')
    .limit(limit)
    .select('name price images category rating slug')
    .populate('vendorId', 'shopName');
    
    res.status(200).json({
      success: true,
      products: relatedProducts
    });
  } catch (err) {
    next(err);
  }
};

// Get product categories and subcategories (public)
export const getProductCategories = async (req, res, next) => {
  try {
    // Aggregate to get unique categories and subcategories
    const categories = await Product.aggregate([
      { $match: { status: 'published', isActive: true } },
      { $group: {
          _id: '$category',
          subCategories: { $addToSet: '$subCategory' }
        }
      },
      { $project: {
          _id: 0,
          category: '$_id',
          subCategories: {
            $filter: {
              input: '$subCategories',
              as: 'subCategory',
              cond: { $ne: ['$$subCategory', null] }
            }
          }
        }
      },
      { $sort: { category: 1 } }
    ]);
    
    res.status(200).json({
      success: true,
      categories
    });
  } catch (err) {
    next(err);
  }
};

// Update product inventory
export const updateProductInventory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity, reserved, allowBackorder, threshold } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid product ID'));
    }
    
    // Check if product exists and belongs to the vendor
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      return next(createError(404, 'Vendor profile not found'));
    }
    
    const product = await Product.findById(id);
    if (!product) {
      return next(createError(404, 'Product not found'));
    }
    
    // Ensure the product belongs to this vendor
    if (!product.vendorId.equals(vendor._id)) {
      return next(createError(403, 'You can only update your own products'));
    }
    
    // Update inventory
    const inventoryUpdate = {};
    if (quantity !== undefined) inventoryUpdate['inventory.quantity'] = quantity;
    if (reserved !== undefined) inventoryUpdate['inventory.reserved'] = reserved;
    if (allowBackorder !== undefined) inventoryUpdate['inventory.allowBackorder'] = allowBackorder;
    if (threshold !== undefined) inventoryUpdate['inventory.threshold'] = threshold;
    
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: inventoryUpdate },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Product inventory updated successfully',
      inventory: updatedProduct.inventory
    });
  } catch (err) {
    next(err);
  }
};

// Bulk update products
export const bulkUpdateProducts = async (req, res, next) => {
  try {
    const { productIds, updateData } = req.body;
    
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return next(createError(400, 'Product IDs are required'));
    }
    
    if (!updateData || Object.keys(updateData).length === 0) {
      return next(createError(400, 'Update data is required'));
    }
    
    // Check if all products exist and belong to the vendor
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      return next(createError(404, 'Vendor profile not found'));
    }
    
    // Get all products
    const products = await Product.find({
      _id: { $in: productIds },
      vendorId: vendor._id
    });
    
    // Check if all products were found
    if (products.length !== productIds.length) {
      return next(createError(404, 'Some products not found or do not belong to this vendor'));
    }
    
    // Perform bulk update
    const result = await Product.updateMany(
      { _id: { $in: productIds }, vendorId: vendor._id },
      { $set: updateData },
      { runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Products updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (err) {
    next(err);
  }
};

// Get low stock products
export const getLowStockProducts = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      return next(createError(404, 'Vendor profile not found'));
    }
    
    // Get products with inventory below threshold
    const lowStockProducts = await Product.find({
      vendorId: vendor._id,
      $expr: {
        $lt: ['$inventory.quantity', '$inventory.threshold']
      }
    })
    .sort('inventory.quantity')
    .select('name sku inventory images price');
    
    res.status(200).json({
      success: true,
      count: lowStockProducts.length,
      products: lowStockProducts
    });
  } catch (err) {
    next(err);
  }
};

// Get top selling products
export const getTopSellingProducts = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      return next(createError(404, 'Vendor profile not found'));
    }
    
    const limit = parseInt(req.query.limit) || 10;
    
    // Get top selling products based on salesCount
    const topSellingProducts = await Product.find({
      vendorId: vendor._id
    })
    .sort('-salesCount')
    .limit(limit)
    .select('name price images salesCount rating');
    
    res.status(200).json({
      success: true,
      products: topSellingProducts
    });
  } catch (err) {
    next(err);
  }
};
