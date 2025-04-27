import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://www.seblod.com/images/medias/62057/_thumb2/2205256774854474505_medium.jpg",
    },
    role: {
        type: String,
        enum: ['admin', 'vendor', 'customer'],
        default: 'customer',
    },
    // Only for vendors
    shopName: {
        type: String,
    },
    shopDescription: {
        type: String,
    },
    isVerifiedVendor: {
        type: Boolean,
        default: false,
    },
    // Only for customers
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
