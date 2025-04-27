import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    sku: String,
    variant: {
      name: String,
      attributes: {
        type: Map,
        of: String
      }
    },
    image: String,
    subtotal: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
      default: 'pending'
    },
    trackingNumber: String,
    shippingMethod: String,
    estimatedDelivery: Date,
    notes: String
  }],
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address1: { type: String, required: true },
    address2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    notes: String
  },
  billingAddress: {
    sameAsShipping: { type: Boolean, default: true },
    firstName: String,
    lastName: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    phone: String,
    email: String
  },
  paymentInfo: {
    method: {
      type: String,
      enum: ['credit_card', 'paypal', 'stripe', 'bank_transfer', 'cash_on_delivery'],
      required: true
    },
    transactionId: String,
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    paymentDate: Date,
    lastFour: String // Last 4 digits of credit card
  },
  summary: {
    subtotal: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      default: 0
    },
    taxRate: {
      type: Number,
      default: 0
    },
    shipping: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    }
  },
  coupon: {
    code: String,
    discount: Number,
    type: {
      type: String,
      enum: ['percentage', 'fixed']
    }
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  notes: String,
  vendorNotes: [{
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor'
    },
    note: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  customerNotes: String,
  adminNotes: String,
  giftMessage: String,
  isGift: {
    type: Boolean,
    default: false
  },
  invoiceUrl: String,
  trackingUrls: [{
    carrier: String,
    trackingNumber: String,
    url: String
  }],
  shippedAt: Date,
  deliveredAt: Date,
  cancelledAt: Date,
  refundedAt: Date,
  refundReason: String,
  shippingMethod: {
    name: String,
    price: Number,
    estimatedDelivery: String
  },
  vendorPayouts: [{
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor'
    },
    amount: Number,
    commissionRate: Number,
    commissionAmount: Number,
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  }]
}, { timestamps: true });

// Generate unique order number
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Get today's orders count
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    
    const count = await this.constructor.countDocuments({
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });
    
    // Generate sequential number with padding
    const seq = String(count + 1).padStart(4, '0');
    
    // Format: YY-MM-DD-SEQUENCE
    this.orderNumber = `${year}${month}${day}-${seq}`;
  }
  next();
});

// Indexes for better query performance
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'items.vendorId': 1 });
orderSchema.index({ 'vendorPayouts.vendorId': 1, 'vendorPayouts.status': 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;