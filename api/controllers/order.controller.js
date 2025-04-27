
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import Vendor from '../models/vendor.module.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';
import { createError } from '../utils/error.js';

// Create a new order
export const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { items, shippingAddress, billingAddress, paymentInfo } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return next(createError(400, 'Order must contain at least one item'));
    }
    
    // Validate and collect all item data
    const orderItems = [];
    let subtotal = 0;
    
    for (const item of items) {
      // Check if product exists and is available
      const product = await Product.findById(item.productId).session(session);
      
      if (!product) {
        await session.abortTransaction();
        session.endSession();
        return next(createError(404, `Product ${item.productId} not found`));
      }
      
      if (product.status !== 'published' || !product.isActive) {
        await session.abortTransaction();
        session.endSession();
        return next(createError(400, `Product ${product.name} is not available for purchase`));
      }
      
      // Check inventory
      if (product.inventory.quantity < item.quantity && !product.inventory.allowBackorder) {
        await session.abortTransaction();
        session.endSession();
        return next(createError(400, `Insufficient stock for ${product.name}`));
      }
      
      // Calculate item subtotal
      const itemSubtotal = product.price * item.quantity;
      subtotal += itemSubtotal;
      
      // Add item to order items
      orderItems.push({
        productId: product._id,
        vendorId: product.vendorId,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        sku: product.sku,
        image: product.images.find(img => img.isPrimary)?.url || product.images[0]?.url,
        subtotal: itemSubtotal,
        status: 'pending'
      });
      
      // Update product inventory
      product.inventory.quantity -= item.quantity;
      product.inventory.reserved += item.quantity;
      product.salesCount += item.quantity;
      await product.save({ session });
    }
    
    // Calculate order totals
    const shipping = req.body.shipping || 0;
    const tax = req.body.tax || 0;
    const discount = req.body.discount || 0;
    const total = subtotal + shipping + tax - discount;
    
    // Create new order
    const newOrder = new Order({
      userId: req.user._id,
      items: orderItems,
      shippingAddress,
      billingAddress: billingAddress || { sameAsShipping: true },
      paymentInfo: {
        ...paymentInfo,
        amount: total,
      },
      summary: {
        subtotal,
        shipping,
        tax,
        discount,
        total
      },
      coupon: req.body.coupon,
      customerNotes: req.body.customerNotes,
      isGift: req.body.isGift || false,
      giftMessage: req.body.giftMessage,
      shippingMethod: req.body.shippingMethod
    });
    
    // Calculate vendor payouts
    const vendorGroups = {};
    
    for (const item of orderItems) {
      if (!vendorGroups[item.vendorId]) {
        // Get vendor's commission rate
        const vendor = await Vendor.findById(item.vendorId).session(session);
        const commissionRate = vendor?.commissionRate || 10; // Default 10% if not set
        
        vendorGroups[item.vendorId] = {
          vendorId: item.vendorId,
          amount: 0,
          commissionRate,
          commissionAmount: 0,
          status: 'pending'
        };
      }
      
      const vendorPayout = vendorGroups[item.vendorId];
      const itemTotal = item.price * item.quantity;
      vendorPayout.amount += itemTotal;
      vendorPayout.commissionAmount += (itemTotal * vendorPayout.commissionRate / 100);
    }
    
    newOrder.vendorPayouts = Object.values(vendorGroups);
    
    // Save the order
    await newOrder.save({ session });
    
    // Update vendor total sales
    for (const vendorPayout of newOrder.vendorPayouts) {
      await Vendor.findByIdAndUpdate(
        vendorPayout.vendorId,
        { $inc: { totalSales: vendorPayout.amount } },
        { session }
      );
    }
    
    // Commit transaction
    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        _id: newOrder._id,
        orderNumber: newOrder.orderNumber,
        summary: newOrder.summary,
        status: newOrder.status,
        createdAt: newOrder.createdAt
      }
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

// Get order by ID (for customers)
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid order ID'));
    }
    
    const order = await Order.findById(id);
    
    if (!order) {
      return next(createError(404, 'Order not found'));
    }
    
    // Ensure the order belongs to the requesting user
    if (!order.userId.equals(req.user._id) && !['admin', 'staff'].includes(req.user.role)) {
      return next(createError(403, 'You do not have permission to view this order'));
    }
    
    res.status(200).json({
      success: true,
      order
    });
  } catch (err) {
    next(err);
  }
};

// Get order by order number (for customers)
export const getOrderByNumber = async (req, res, next) => {
  try {
    const { orderNumber } = req.params;
    
    const order = await Order.findOne({ orderNumber });
    
    if (!order) {
      return next(createError(404, 'Order not found'));
    }
    
    // Ensure the order belongs to the requesting user
    if (!order.userId.equals(req.user._id) && !['admin', 'staff'].includes(req.user.role)) {
      return next(createError(403, 'You do not have permission to view this order'));
    }
    
    res.status(200).json({
      success: true,
      order
    });
  } catch (err) {
    next(err);
  }
};

// Get user orders (for customers)
export const getUserOrders = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Filtering
    const filterOptions = { userId: req.user._id };
    
    // Optional status filter
    if (req.query.status) {
      filterOptions.status = req.query.status;
    }
    
    // Get orders
    const orders = await Order.find(filterOptions)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('orderNumber status summary createdAt items.image items.name');
    
    // Get total count for pagination
    const totalOrders = await Order.countDocuments(filterOptions);
    
    res.status(200).json({
      success: true,
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        hasNextPage: page * limit < totalOrders,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    next(err);
  }
};

// Cancel order (for customers)
export const cancelOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid order ID'));
    }
    
    // Find order
    const order = await Order.findById(id).session(session);
    
    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(404, 'Order not found'));
    }
    
    // Ensure the order belongs to the requesting user
    if (!order.userId.equals(req.user._id) && !['admin', 'staff'].includes(req.user.role)) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(403, 'You do not have permission to cancel this order'));
    }
    
    // Check if order can be cancelled
    if (!['pending', 'processing'].includes(order.status)) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(400, 'This order cannot be cancelled'));
    }
    
    // Update order status
    order.status = 'cancelled';
    order.cancelledAt = new Date();
    order.refundReason = reason || 'Customer cancelled the order';
    
    // Update all item statuses
    for (const item of order.items) {
      item.status = 'cancelled';
      
      // Restore product inventory
      await Product.findByIdAndUpdate(
        item.productId,
        {
          $inc: {
            'inventory.quantity': item.quantity,
            'inventory.reserved': -item.quantity,
            'salesCount': -item.quantity
          }
        },
        { session }
      );
    }
    
    // Update vendor payouts status
    for (const payout of order.vendorPayouts) {
      payout.status = 'cancelled';
    }
    
    await order.save({ session });
    
    // Commit transaction
    await session.commitTransaction();
    session.endSession();
    
    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        cancelledAt: order.cancelledAt
      }
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

// Get vendor orders
export const getVendorOrders = async (req, res, next) => {
  try {
    // Find vendor associated with current user
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      return next(createError(404, 'Vendor profile not found'));
    }
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Filtering
    const filterOptions = { 'items.vendorId': vendor._id };
    
    // Optional status filter
    if (req.query.status) {
      filterOptions['items.status'] = req.query.status;
    }
    
    // Date range filter
    if (req.query.startDate && req.query.endDate) {
      filterOptions.createdAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }
    
    // Get orders containing vendor's items
    const orders = await Order.aggregate([
      { $match: filterOptions },
      { $unwind: '$items' },
      { $match: { 'items.vendorId': vendor._id } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      {
        $project: {
          _id: 1,
          orderNumber: 1,
          createdAt: 1,
          status: 1,
          'userInfo.username': 1,
          'userInfo.email': 1,
          shippingAddress: 1,
          item: '$items',
          shippingMethod: 1,
          paymentInfo: {
            method: 1,
            status: 1
          }
        }
      }
    ]);
    
    // Get total count for pagination
    const totalCount = await Order.aggregate([
      { $match: filterOptions },
      { $unwind: '$items' },
      { $match: { 'items.vendorId': vendor._id } },
      { $count: 'total' }
    ]);
    
    const totalOrders = totalCount.length > 0 ? totalCount[0].total : 0;
    
    res.status(200).json({
      success: true,
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        hasNextPage: page * limit < totalOrders,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    next(err);
  }
};

// Update order item status (for vendors)
export const updateOrderItemStatus = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { orderId, itemId } = req.params;
    const { status, trackingNumber, trackingUrl, notes } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return next(createError(400, 'Invalid order ID'));
    }
    
    // Find vendor associated with current user
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(404, 'Vendor profile not found'));
    }
    
    // Find the order
    const order = await Order.findById(orderId).session(session);
    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(404, 'Order not found'));
    }
    
    // Find the specific item in the order
    const itemIndex = order.items.findIndex(
      item => item._id.toString() === itemId && item.vendorId.equals(vendor._id)
    );
    
    if (itemIndex === -1) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(404, 'Order item not found or does not belong to this vendor'));
    }
    
    const item = order.items[itemIndex];
    
    // Validate status transition
    const validTransitions = {
      'pending': ['processing', 'cancelled'],
      'processing': ['shipped', 'cancelled'],
      'shipped': ['delivered', 'returned'],
      'delivered': ['returned'],
      'cancelled': [],
      'returned': ['refunded'],
      'refunded': []
    };
    
    if (!validTransitions[item.status].includes(status)) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(400, `Cannot change status from ${item.status} to ${status}`));
    }
    
    // Update item status
    item.status = status;
    
    // Add tracking info if provided
    if (trackingNumber) {
      item.trackingNumber = trackingNumber;
    }
    
    // Add tracking URL to order if provided
    if (trackingUrl && trackingNumber) {
      // Check if tracking URL already exists
      const trackingIndex = order.trackingUrls.findIndex(
        t => t.trackingNumber === trackingNumber
      );
      
      if (trackingIndex >= 0) {
        order.trackingUrls[trackingIndex].url = trackingUrl;
      } else {
        order.trackingUrls.push({
          carrier: req.body.carrier || 'Default Carrier',
          trackingNumber,
          url: trackingUrl
        });
      }
    }
    
    // Add vendor note if provided
    if (notes) {
      order.vendorNotes.push({
        vendorId: vendor._id,
        note: notes,
        createdAt: new Date()
      });
    }
    
    // Handle inventory updates based on status change
    if (status === 'cancelled' && item.status !== 'cancelled') {
      // Restore inventory if item is cancelled
      await Product.findByIdAndUpdate(
        item.productId,
        {
          $inc: {
            'inventory.quantity': item.quantity,
            'inventory.reserved': -item.quantity,
            'salesCount': -item.quantity
          }
        },
        { session }
      );
    } else if (status === 'shipped' && item.status !== 'shipped') {
      // Update inventory reserved when item ships
      await Product.findByIdAndUpdate(
        item.productId,
        {
          $inc: { 'inventory.reserved': -item.quantity }
        },
        { session }
      );
      
      // Record shipping date
      if (!order.shippedAt) {
        order.shippedAt = new Date();
      }
    } else if (status === 'delivered' && item.status !== 'delivered') {
      // Record delivery date
      if (!order.deliveredAt) {
        order.deliveredAt = new Date();
      }
    }
    
    // Check if all items have the same status, update order status accordingly
    const allItemsStatus = order.items.every(i => i.status === status);
    if (allItemsStatus) {
      order.status = status;
      
      // Update dates based on status
      if (status === 'delivered' && !order.deliveredAt) {
        order.deliveredAt = new Date();
      } else if (status === 'cancelled' && !order.cancelledAt) {
        order.cancelledAt = new Date();
      } else if (status === 'refunded' && !order.refundedAt) {
        order.refundedAt = new Date();
      }
    }
    
    // Save the order
    await order.save({ session });
    
    // Commit transaction
    await session.commitTransaction();
    session.endSession();
    
    res.status(200).json({
      success: true,
      message: `Order item status updated to ${status}`,
      item: {
        _id: item._id,
        status: item.status,
        trackingNumber: item.trackingNumber
      },
      orderStatus: order.status
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

// Get order details for vendor
export const getVendorOrderDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid order ID'));
    }
    
    // Find vendor associated with current user
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      return next(createError(404, 'Vendor profile not found'));
    }
    
    // Find the order and filter items to only show this vendor's items
    const order = await Order.findById(id)
      .populate('userId', 'username email')
      .lean();
    
    if (!order) {
      return next(createError(404, 'Order not found'));
    }
    
    // Check if the order contains items from this vendor
    const vendorItems = order.items.filter(
      item => item.vendorId.toString() === vendor._id.toString()
    );
    
    if (vendorItems.length === 0) {
      return next(createError(404, 'No items in this order belong to your shop'));
    }
    
    // Get vendor-specific payout info
    const vendorPayout = order.vendorPayouts.find(
      payout => payout.vendorId.toString() === vendor._id.toString()
    );
    
    // Only show this vendor's items
    order.items = vendorItems;
    
    // Only include relevant vendor payouts
    order.vendorPayouts = vendorPayout ? [vendorPayout] : [];
    
    // Only include this vendor's notes
    order.vendorNotes = order.vendorNotes.filter(
      note => note.vendorId.toString() === vendor._id.toString()
    );
    
    res.status(200).json({
      success: true,
      order
    });
  } catch (err) {
    next(err);
  }
};

// Get vendor order statistics
export const getVendorOrderStats = async (req, res, next) => {
  try {
    // Find vendor associated with current user
    const vendor = await Vendor.findOne({ userId: req.user._id });
    if (!vendor) {
      return next(createError(404, 'Vendor profile not found'));
    }
    
    // Time period filter
    const period = req.query.period || 'week'; // day, week, month, year
    const endDate = new Date();
    let startDate = new Date();
    
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
    }
    
    // Order count by status
    const orderStatusCounts = await Order.aggregate([
      { $match: { 
          'items.vendorId': vendor._id,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      { $unwind: '$items' },
      { $match: { 'items.vendorId': vendor._id } },
      { $group: {
          _id: '$items.status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Format status counts
    const statusCounts = {};
    orderStatusCounts.forEach(item => {
      statusCounts[item._id] = item.count;
    });
    
    // Total revenue and order count
    const salesStats = await Order.aggregate([
      { $match: { 
          'items.vendorId': vendor._id,
          createdAt: { $gte: startDate, $lte: endDate },
          'items.status': { $in: ['delivered', 'completed'] } 
        }
      },
      { $unwind: '$items' },
      { $match: { 
          'items.vendorId': vendor._id,
          'items.status': { $in: ['delivered', 'completed'] }
        }
      },
      { $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$items.subtotal' },
          totalItems: { $sum: '$items.quantity' }
        }
      }
    ]);
    
    // Revenue over time
    const timeGrouping = period === 'day' ? 
      { hour: { $hour: '$createdAt' } } : 
      period === 'week' ? 
        { day: { $dayOfWeek: '$createdAt' } } : 
        period === 'month' ? 
          { day: { $dayOfMonth: '$createdAt' } } : 
          { month: { $month: '$createdAt' } };
    
    const revenueOverTime = await Order.aggregate([
      { $match: { 
          'items.vendorId': vendor._id,
          createdAt: { $gte: startDate, $lte: endDate },
          'items.status': { $in: ['delivered', 'completed'] }
        }
      },
      { $unwind: '$items' },
      { $match: { 
          'items.vendorId': vendor._id,
          'items.status': { $in: ['delivered', 'completed'] }
        }
      },
      { $group: {
          _id: timeGrouping,
          revenue: { $sum: '$items.subtotal' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);
    
    res.status(200).json({
      success: true,
      periodData: {
        period,
        startDate,
        endDate
      },
      orderStats: {
        statusCounts,
        totalOrders: salesStats.length > 0 ? salesStats[0].totalOrders : 0,
        totalRevenue: salesStats.length > 0 ? salesStats[0].totalRevenue : 0,
        totalItems: salesStats.length > 0 ? salesStats[0].totalItems : 0,
        revenueOverTime
      }
    });
  } catch (err) {
    next(err);
  }
};

// Process payment (webhook or internal)
export const processPayment = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { orderId, transactionId, status } = req.body;
    
    if (!orderId || !transactionId || !status) {
      return next(createError(400, 'Order ID, transaction ID, and status are required'));
    }
    
    // Find the order
    const order = await Order.findById(orderId).session(session);
    
    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(404, 'Order not found'));
    }
    
    // Update payment info
    order.paymentInfo.transactionId = transactionId;
    order.paymentInfo.status = status;
    order.paymentInfo.paymentDate = new Date();
    
    // If payment is completed, update order status to processing
    if (status === 'completed' && order.status === 'pending') {
      order.status = 'processing';
      
      // Update all pending items to processing
      order.items.forEach(item => {
        if (item.status === 'pending') {
          item.status = 'processing';
        }
      });
    }
    
    await order.save({ session });
    
    // Commit transaction
    await session.commitTransaction();
    session.endSession();
    
    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentInfo.status
      }
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

// Process vendor payout
export const processVendorPayout = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { orderId, vendorId, transactionId } = req.body;
    
    // Admin/staff check
    if (!['admin', 'staff'].includes(req.user.role)) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(403, 'You do not have permission to process payouts'));
    }
    
    if (!orderId || !vendorId || !transactionId) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(400, 'Order ID, vendor ID, and transaction ID are required'));
    }
    
    // Find the order
    const order = await Order.findById(orderId).session(session);
    
    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(404, 'Order not found'));
    }
    
    // Find the vendor payout
    const payoutIndex = order.vendorPayouts.findIndex(
      payout => payout.vendorId.toString() === vendorId
    );
    
    if (payoutIndex === -1) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(404, 'Vendor payout not found for this order'));
    }
    
    // Update payout status
    order.vendorPayouts[payoutIndex].status = 'paid';
    order.vendorPayouts[payoutIndex].transactionId = transactionId;
    order.vendorPayouts[payoutIndex].paidAt = new Date();
    
    await order.save({ session });
    
    // Commit transaction
    await session.commitTransaction();
    session.endSession();
    
    res.status(200).json({
      success: true,
      message: 'Vendor payout processed successfully',
      payout: order.vendorPayouts[payoutIndex]
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req, res, next) => {
  try {
    // Admin/staff check
    if (!['admin', 'staff'].includes(req.user.role)) {
      return next(createError(403, 'You do not have permission to view all orders'));
    }
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    // Filtering
    const filterOptions = {};
    
    // Optional filters
    if (req.query.status) filterOptions.status = req.query.status;
    if (req.query.userId) filterOptions.userId = req.query.userId;
    if (req.query.vendorId) filterOptions['items.vendorId'] = req.query.vendorId;
    if (req.query.minTotal || req.query.maxTotal) {
     
      filterOptions['summary.total'] = {};
      if (req.query.minTotal) filterOptions['summary.total'].$gte = parseFloat(req.query.minTotal);
      if (req.query.maxTotal) filterOptions['summary.total'].$lte = parseFloat(req.query.maxTotal);
    }
    
    // Date range filter
    if (req.query.startDate && req.query.endDate) {
      filterOptions.createdAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }
    
    // Payment status filter
    if (req.query.paymentStatus) {
      filterOptions['paymentInfo.status'] = req.query.paymentStatus;
    }
    
    // Search by order number
    if (req.query.orderNumber) {
      filterOptions.orderNumber = { $regex: req.query.orderNumber, $options: 'i' };
    }
    
    // Search by customer name or email
    if (req.query.customer) {
      const customerQuery = req.query.customer;
      const users = await User.find({
        $or: [
          { username: { $regex: customerQuery, $options: 'i' } },
          { email: { $regex: customerQuery, $options: 'i' } }
        ]
      }).select('_id');
      
      const userIds = users.map(user => user._id);
      if (userIds.length > 0) {
        filterOptions.userId = { $in: userIds };
      } else {
        // No users found matching the search criteria
        return res.status(200).json({
          success: true,
          orders: [],
          pagination: {
            currentPage: page,
            totalPages: 0,
            totalOrders: 0,
            hasNextPage: false,
            hasPrevPage: false
          }
        });
      }
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
    
    // Get orders
    const orders = await Order.find(filterOptions)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate('userId', 'username email')
      .select('-__v');
    
    // Get total count for pagination
    const totalOrders = await Order.countDocuments(filterOptions);
    
    res.status(200).json({
      success: true,
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        hasNextPage: page * limit < totalOrders,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    next(err);
  }
};

// Update order (admin only)
export const updateOrder = async (req, res, next) => {
const session = await mongoose.startSession();
session.startTransaction();

try {
const { id } = req.params;

// Admin/staff check
if (!['admin', 'staff'].includes(req.user.role)) {
  await session.abortTransaction();
  session.endSession();
  return next(createError(403, 'You do not have permission to update orders'));
}

if (!mongoose.Types.ObjectId.isValid(id)) {
  await session.abortTransaction();
  session.endSession();
  return next(createError(400, 'Invalid order ID'));
}

// Find the order
const order = await Order.findById(id).session(session);

if (!order) {
  await session.abortTransaction();
  session.endSession();
  return next(createError(404, 'Order not found'));
}

// Fields that can be updated by admin
const adminUpdatableFields = [
  'status', 'adminNotes', 'customerNotes', 
  'shippingAddress', 'billingAddress', 'shippingMethod'
];

// Build update object
const updateData = {};
Object.keys(req.body).forEach(key => {
  if (adminUpdatableFields.includes(key)) {
    updateData[key] = req.body[key];
  }
});

// Special handling for status change
if (req.body.status && req.body.status !== order.status) {
  const newStatus = req.body.status;
  
  // Update all item statuses to match the order status if not explicitly provided
  if (!req.body.items) {
    order.items.forEach(item => {
      if (['pending', 'processing'].includes(item.status)) {
        item.status = newStatus;
      }
    });
  }
  
  // Update status-related dates
  if (newStatus === 'delivered' && !order.deliveredAt) {
    updateData.deliveredAt = new Date();
  } else if (newStatus === 'cancelled' && !order.cancelledAt) {
    updateData.cancelledAt = new Date();
  } else if (newStatus === 'refunded' && !order.refundedAt) {
    updateData.refundedAt = new Date();
  }
}

// Handle individual item updates if provided
if (req.body.items && Array.isArray(req.body.items)) {
  for (const itemUpdate of req.body.items) {
    const { itemId, status, trackingNumber } = itemUpdate;
    const itemIndex = order.items.findIndex(item => item._id.toString() === itemId);
    
    if (itemIndex !== -1) {
      const item = order.items[itemIndex];
      
      // Update item status
      if (status && status !== item.status) {
        item.status = status;
        
        // Handle inventory updates based on status change
        if (status === 'cancelled' && item.status !== 'cancelled') {
          // Restore inventory if item is cancelled
          await Product.findByIdAndUpdate(
            item.productId,
            {
              $inc: {
                'inventory.quantity': item.quantity,
                'inventory.reserved': -item.quantity,
                'salesCount': -item.quantity
              }
            },
            { session }
          );
        } else if (status === 'shipped' && item.status !== 'shipped') {
          // Update inventory reserved when item ships
          await Product.findByIdAndUpdate(
            item.productId,
            {
              $inc: { 'inventory.reserved': -item.quantity }
            },
            { session }
          );
        }
      }
      
      // Update tracking info if provided
      if (trackingNumber) {
        item.trackingNumber = trackingNumber;
      }
    }
  }
}

// Update the order
const updatedOrder = await Order.findByIdAndUpdate(
  id,
  { $set: updateData },
  { new: true, runValidators: true, session }
);

// Commit transaction
await session.commitTransaction();
session.endSession();

res.status(200).json({
  success: true,
  message: 'Order updated successfully',
  order: updatedOrder
});
} catch (err) {
await session.abortTransaction();
session.endSession();
next(err);
}
};

// Delete order (admin only, soft delete)
export const deleteOrder = async (req, res, next) => {
try {
const { id } = req.params;

// Admin check
if (req.user.role !== 'admin') {
  return next(createError(403, 'You do not have permission to delete orders'));
}

if (!mongoose.Types.ObjectId.isValid(id)) {
  return next(createError(400, 'Invalid order ID'));
}

// Find the order
const order = await Order.findById(id);

if (!order) {
  return next(createError(404, 'Order not found'));
}

// Soft delete by adding a deleted flag
order.isDeleted = true;
order.deletedAt = new Date();
order.deletedBy = req.user._id;

await order.save();

res.status(200).json({
  success: true,
  message: 'Order deleted successfully'
});
} catch (err) {
next(err);
}
};

// Get order summary statistics for admin dashboard
export const getOrderStats = async (req, res, next) => {
try {
// Admin/staff check
if (!['admin', 'staff'].includes(req.user.role)) {
  return next(createError(403, 'You do not have permission to view order statistics'));
}

// Time period filter
const period = req.query.period || 'month'; // day, week, month, year, all
const endDate = new Date();
let startDate = new Date();

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
  case 'all':
    startDate = new Date(0); // Beginning of time
    break;
}

// Get status counts
const statusCounts = await Order.aggregate([
  { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
  { $group: {
      _id: '$status',
      count: { $sum: 1 },
      total: { $sum: '$summary.total' }
    }
  }
]);

// Count orders by payment method
const paymentMethods = await Order.aggregate([
  { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
  { $group: {
      _id: '$paymentInfo.method',
      count: { $sum: 1 },
      total: { $sum: '$summary.total' }
    }
  }
]);

// Get total revenue
const revenue = await Order.aggregate([
  { $match: { 
      createdAt: { $gte: startDate, $lte: endDate },
      status: { $in: ['delivered', 'completed'] }
    } 
  },
  { $group: {
      _id: null,
      total: { $sum: '$summary.total' },
      count: { $sum: 1 }
    }
  }
]);

// Revenue over time
const timeGrouping = period === 'day' ? 
  { hour: { $hour: '$createdAt' } } : 
  period === 'week' ? 
    { day: { $dayOfWeek: '$createdAt' } } : 
    period === 'month' ? 
      { day: { $dayOfMonth: '$createdAt' } } : 
      { month: { $month: '$createdAt' } };

const revenueOverTime = await Order.aggregate([
  { $match: { 
      createdAt: { $gte: startDate, $lte: endDate },
      status: { $in: ['delivered', 'completed'] }
    } 
  },
  { $group: {
      _id: timeGrouping,
      revenue: { $sum: '$summary.total' },
      orders: { $sum: 1 }
    }
  },
  { $sort: { '_id': 1 } }
]);

// Top-selling products
const topProducts = await Order.aggregate([
  { $match: { 
      createdAt: { $gte: startDate, $lte: endDate },
      status: { $in: ['delivered', 'completed', 'processing', 'shipped'] }
    } 
  },
  { $unwind: '$items' },
  { $group: {
      _id: '$items.productId',
      productName: { $first: '$items.name' },
      totalSold: { $sum: '$items.quantity' },
      revenue: { $sum: '$items.subtotal' },
      unitsSold: { $sum: 1 }
    }
  },
  { $sort: { totalSold: -1 } },
  { $limit: 10 }
]);

// Top customers
const topCustomers = await Order.aggregate([
  { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
  { $group: {
      _id: '$userId',
      orderCount: { $sum: 1 },
      totalSpent: { $sum: '$summary.total' }
    }
  },
  { $sort: { totalSpent: -1 } },
  { $limit: 10 },
  { $lookup: {
      from: 'users',
      localField: '_id',
      foreignField: '_id',
      as: 'user'
    }
  },
  { $project: {
      _id: 1,
      username: { $arrayElemAt: ['$user.username', 0] },
      email: { $arrayElemAt: ['$user.email', 0] },
      orderCount: 1,
      totalSpent: 1
    }
  }
]);

res.status(200).json({
  success: true,
  periodData: {
    period,
    startDate,
    endDate
  },
  orderStats: {
    statusCounts,
    paymentMethods,
    revenue: revenue.length > 0 ? revenue[0] : { total: 0, count: 0 },
    revenueOverTime,
    topProducts,
    topCustomers
  }
});
} catch (err) {
next(err);
}
};

// Send order confirmation email
export const sendOrderConfirmation = async (req, res, next) => {
try {
const { id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
  return next(createError(400, 'Invalid order ID'));
}

// Find the order
const order = await Order.findById(id)
  .populate('userId', 'username email');

if (!order) {
  return next(createError(404, 'Order not found'));
}

// Check permission - only admin or the owner can request email confirmation
if (!order.userId.equals(req.user._id) && !['admin', 'staff'].includes(req.user.role)) {
  return next(createError(403, 'You do not have permission to send order confirmation'));
}

// Here you would typically integrate with an email service
// This is a placeholder for the email sending logic
// In a real app, you'd use a service like SendGrid, Mailgun, etc.

/*
await sendEmail({
  to: order.userId.email,
  subject: `Order Confirmation #${order.orderNumber}`,
  template: 'order-confirmation',
  context: {
    order,
    user: order.userId,
    items: order.items,
    shippingAddress: order.shippingAddress,
    summary: order.summary
  }
});
*/

// For now, just return a success message
res.status(200).json({
  success: true,
  message: 'Order confirmation email would be sent here',
  sentTo: order.userId.email
});
} catch (err) {
next(err);
}
};

// Export orders to CSV/Excel
export const exportOrders = async (req, res, next) => {
try {
// Admin/staff check
if (!['admin', 'staff'].includes(req.user.role)) {
  return next(createError(403, 'You do not have permission to export orders'));
}

// Filtering
const filterOptions = {};

// Optional filters
if (req.query.status) filterOptions.status = req.query.status;
if (req.query.startDate && req.query.endDate) {
  filterOptions.createdAt = {
    $gte: new Date(req.query.startDate),
    $lte: new Date(req.query.endDate)
  };
}

// Get orders
const orders = await Order.find(filterOptions)
  .sort({ createdAt: -1 })
  .populate('userId', 'username email')
  .lean();

// Transform orders for export
const exportData = orders.map(order => ({
  OrderNumber: order.orderNumber,
  Date: order.createdAt.toISOString().split('T')[0],
  Customer: order.userId?.username || 'Unknown',
  Email: order.userId?.email || 'Unknown',
  Status: order.status,
  Total: order.summary.total,
  Items: order.items.length,
  PaymentMethod: order.paymentInfo.method,
  PaymentStatus: order.paymentInfo.status
}));

// Here you would typically generate CSV or Excel file
// This is a placeholder for the export logic
// In a real app, you might use libraries like json2csv, exceljs, etc.

// For now, just return the data as JSON
res.status(200).json({
  success: true,
  data: exportData,
  count: exportData.length
});
} catch (err) {
next(err);
}
};

// Generate invoice for an order
export const generateInvoice = async (req, res, next) => {
try {
const { id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
  return next(createError(400, 'Invalid order ID'));
}

// Find the order
const order = await Order.findById(id)
  .populate('userId', 'username email')
  .populate('items.vendorId', 'shopName');

if (!order) {
  return next(createError(404, 'Order not found'));
}

// Check permission - only admin/staff or the order owner can generate invoice
if (!order.userId.equals(req.user._id) && !['admin', 'staff'].includes(req.user.role)) {
  return next(createError(403, 'You do not have permission to generate invoice for this order'));
}

// Here you would typically generate a PDF invoice
// This is a placeholder for the invoice generation logic
// In a real app, you might use libraries like PDFKit, html-pdf, etc.

// For now, just return the invoice data as JSON
const invoiceData = {
  invoiceNumber: `INV-${order.orderNumber}`,
  date: new Date().toISOString(),
  dueDate: new Date().toISOString(),
  customer: {
    name: order.userId?.username || 'Customer',
    email: order.userId?.email || 'customer@example.com',
    address: order.shippingAddress
  },
  items: order.items.map(item => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    total: item.subtotal,
    vendor: item.vendorId?.shopName || 'Unknown Shop'
  })),
  summary: order.summary,
  paymentMethod: order.paymentInfo.method,
  notes: 'Thank you for your business!'
};

// Update order with invoice URL (in a real app)
// order.invoiceUrl = 'https://example.com/invoices/INV-123.pdf';
// await order.save();

res.status(200).json({
  success: true,
  message: 'Invoice generated successfully',
  invoice: invoiceData
});
} catch (err) {
next(err);
}
};