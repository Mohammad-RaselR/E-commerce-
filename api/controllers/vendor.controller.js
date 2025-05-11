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


// Update vendor profileimport bcryptjs from 'bcryptjs'; // for password hashing


export const updateVendorProfile = async (req, res, next) => {
  const {  email, password } = req.body;

  // Ensure that the vendor is updating their own profile
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only update your own account!'));
  }

  

  // Check if the email already exists (excluding the current user)
  const existingEmail = await Vendor.findOne({ email });
  if (existingEmail && existingEmail._id.toString() !== req.params.id) {
    return next(errorHandler(409, 'Email already exists!'));
  }

  try {
    // If a new password is provided, hash it
    if (password) {
      req.body.password = bcryptjs.hashSync(password, 10);
    }

    // Update the vendor profile
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          
          email: req.body.email,
          password: req.body.password,
          mobileNumber: req.body.mobileNumber,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          avatar: req.body.avatar || null, // Optional avatar update
        },
      },
      { new: true } // Return the updated document
    );

    // Remove password from the response for security reasons
    const { password: removedPassword, ...rest } = updatedVendor._doc;
    res.status(200).json(rest); // Send back the updated vendor profile (without password)
    
  } catch (error) {
    return next(errorHandler(500, 'Something went wrong!'));
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
