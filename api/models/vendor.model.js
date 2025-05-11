import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: true,
    trim: true
  },
  lastName: {
    type: String,
    // required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: v =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(v),
      message:
        'Password must contain uppercase, lowercase, number and special character'
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // match: /^\d{4}$/
  },
  
  
  shopName: {
    type: String,
    required: true
  },
  // shopurl: {
  //   type: String,
  //   required: true
  // },
  shopDescription: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }, 
  mobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: v => /^(013|014|015|016|017|018|019)\d{8}$/.test(v),
      message: 'Invalid Bangladeshi mobile number'
    }
  },
}, { timestamps: true });

const Vendor = mongoose.model('Vendor', vendorSchema);
export default Vendor;
