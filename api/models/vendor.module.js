import mongoose from 'mongoose';
import bcrypt from 'mongoose-bcrypt';

const vendorSchema = new mongoose.Schema({
  // Authentication Fields
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, bcrypt: true },
  phoneNumber: { type: String, required: true },
  
  // Basic Shop Information
  shopName: { type: String, required: true },
  shopDescription: { type: String, default: '' },
  logo: { type: String, default: '' },
  bannerImage: { type: String, default: '' },
  
  // Contact and Location Information
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zip: { type: String }
  },
  coordinates: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  
  // Personal/Owner Information
  ownerName: { type: String },
  ownerPhoto: { type: String },
  
  // Store Metrics
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
  
  // Store Settings
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },
  
  // Product-related fields
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  
  // Simple social media links (reduced version)
  socialMedia: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    website: { type: String },
  },
  
  // Session Management
  refreshToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  
  // Last Activity
  lastLogin: { type: Date }
}, { timestamps: true });

// Add plugin for password hashing
vendorSchema.plugin(bcrypt);

// Method to verify password
vendorSchema.methods.verifyPassword = function(password) {
  return this.verifyPasswordSync(password);
};

// Add indexes for better query performance
vendorSchema.index({ shopName: 'text', shopDescription: 'text' });
vendorSchema.index({ email: 1 });
vendorSchema.index({ username: 1 });
vendorSchema.index({ 'address.city': 1, 'address.country': 1 });
vendorSchema.index({ rating: -1 });

export default mongoose.model('Vendor', vendorSchema);
