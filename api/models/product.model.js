import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxLength: 200
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  comparePrice: {
    type: Number,
    min: 0
  },
  costPrice: {
    type: Number,
    min: 0
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: { type: Boolean, default: false }
  }],
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String
  },
  tags: [{
    type: String
  }],
  attributes: {
    type: Map,
    of: String
  },
  variants: [{
    name: String,
    sku: String,
    price: Number,
    comparePrice: Number,
    attributes: {
      type: Map,
      of: String
    },
    inventory: {
      quantity: Number,
      reserved: Number
    },
    images: [{
      url: String,
      alt: String
    }]
  }],
  inventory: {
    quantity: {
      type: Number,
      default: 0
    },
    reserved: {
      type: Number,
      default: 0
    },
    allowBackorder: {
      type: Boolean,
      default: false
    },
    threshold: {
      type: Number,
      default: 5
    }
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['kg', 'g', 'lb', 'oz'],
      default: 'kg'
    }
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'mm', 'in'],
      default: 'cm'
    }
  },
  shippingClass: {
    type: String,
    enum: ['standard', 'express', 'free', 'special'],
    default: 'standard'
  },
  taxClass: {
    type: String,
    default: 'standard'
  },
  viewCount: {
    type: Number,
    default: 0
  },
  salesCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Index for better search performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ slug: 1 });
productSchema.index({ category: 1, subCategory: 1 });
productSchema.index({ vendorId: 1 });
productSchema.index({ status: 1, isActive: 1 });
productSchema.index({ isFeatured: 1 });

// Virtual for checking if in stock
productSchema.virtual('inStock').get(function() {
  return this.inventory.quantity > 0 || this.inventory.allowBackorder;
});

// Pre-save hook to generate slug if not provided
productSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    return next();
  }

  try {
    // Create slug from product name
    let slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Check for existing slug
    const count = await this.constructor.countDocuments({ 
      slug: new RegExp(`^${slug}(-[0-9]+)?$`, 'i') 
    });
    
    // Append number if slug exists
    if (count > 0) {
      slug = `${slug}-${count + 1}`;
    }
    
    this.slug = slug;
    next();
  } catch (error) {
    next(error);
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;