import Vendor from '../models/vendor.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Helper function to generate a JWT token for vendors
const generateToken = (vendor) => {
  return jwt.sign({ id: vendor._id, role: 'vendor' }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const Vsignin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await Vendor.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));

    const token = generateToken(validUser); // Using the helper function for generating the token

    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};
// Create a new vendor profile
export const createVendorProfile = async (req, res, next) => {
  const { email, password, username, shopName, shopurl, shopDescription, isVerified, isActive, mobileNumber } = req.body;

  try {
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return next(errorHandler(400, 'Vendor with this email already exists.'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newVendor = new Vendor({
      email,
      password: hashedPassword,
      username,
      shopName,
      shopurl,
      shopDescription,
      isVerified: false, // Default to false, verification will be handled later
      isActive: true,
      mobileNumber,
    });

    await newVendor.save();

    const token = generateToken(newVendor); // Generate token for vendor

    res.status(201).json({
      message: 'Vendor profile created successfully!',
      token, // Send token in response
    });
  } catch (error) {
    next(error);
  }
};

// Get vendor profile
// export const getVendorProfile = async (req, res, next) => {
//   try {
//     const vendor = await Vendor.findById(req.user.id).select('-password'); // Exclude password
//     if (!vendor) return next(errorHandler(404, 'Vendor not found.'));

//     res.status(200).json(vendor);
//   } catch (error) {
//     next(error);
//   }
// };
export const getVendorProfile = async (req, res, next) => {
  

  try {
    const vendor = await Vendor.findById(req.params.id).select('-password'); // Exclude password
    if (!vendor) return next(errorHandler(404, 'Vendor not found.'));

    res.status(200).json(vendor);
  } catch (error) {
    next(error);
  }
};


// Update vendor profile
export const updateVendorProfile = async (req, res, next) => {
  const { shopName, shopDescription, avatar, mobileNumber } = req.body;

  try {
    const vendor = await Vendor.findById(req.user.id);
    if (!vendor) return next(errorHandler(404, 'Vendor not found.'));

    vendor.shopName = shopName || vendor.shopName;
    vendor.shopDescription = shopDescription || vendor.shopDescription;
    vendor.avatar = avatar || vendor.avatar;
    vendor.mobileNumber = mobileNumber || vendor.mobileNumber;

    await vendor.save();

    res.status(200).json({ message: 'Vendor profile updated successfully.' });
  } catch (error) {
    next(error);
  }
};

// Delete vendor profile
export const deleteVendorProfile = async (req, res, next) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.user.id);
    if (!vendor) return next(errorHandler(404, 'Vendor not found.'));

    res.status(200).json({ message: 'Vendor deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// Admin: Verify vendor
export const verifyVendorProfile = async (req, res, next) => {
  const { vendorId } = req.params;

  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return next(errorHandler(404, 'Vendor not found.'));

    vendor.isVerified = true;
    await vendor.save();

    res.status(200).json({ message: 'Vendor verified successfully.' });
  } catch (error) {
    next(error);
  }
};

// Admin: Unverify vendor
export const unverifyVendorProfile = async (req, res, next) => {
  const { vendorId } = req.params;

  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return next(errorHandler(404, 'Vendor not found.'));

    vendor.isVerified = false;
    await vendor.save();

    res.status(200).json({ message: 'Vendor unverified successfully.' });
  } catch (error) {
    next(error);
  }
};
