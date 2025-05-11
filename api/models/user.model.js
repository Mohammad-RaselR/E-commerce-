import mongoose from 'mongoose';

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // match: /^\d{4}$/
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
  mobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: v => /^(013|014|015|016|017|018|019)\d{8}$/.test(v),
      message: 'Invalid Bangladeshi mobile number'
    }
  },
  avatar: {
    type: String,
    default: 'https://www.example.com/default-avatar.jpg'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const User = mongoose.model('User', user);
export default User;
