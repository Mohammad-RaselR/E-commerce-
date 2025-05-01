import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js'; // Assuming you have an error handler utility

// Controller to register a new user
export const registerUser = async (req, res, next) => {
  const { username, email, password, mobileNumber, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, 'User with this email already exists.'));
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      mobileNumber,
      role: role || 'customer', // Default role to 'customer' if not provided
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    next(error);
  }
};

// Controller to sign in the user
export const signinUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, 'User not found.'));
    }

    // Compare password
    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(errorHandler(401, 'Incorrect password.'));
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password field from the user object
    const { password: pass, ...userWithoutPassword } = user._doc;

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // For HTTPS environments
      sameSite: 'strict', // To prevent CSRF attacks
    });

    res.status(200).json(userWithoutPassword); // Respond with user data excluding password
  } catch (error) {
    next(error);
  }
};

// Controller to get user details (for authenticated users)
export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Assuming you have middleware that attaches user ID to the request

    if (!user) {
      return next(errorHandler(404, 'User not found.'));
    }

    // Remove password from the response
    const { password, ...userDetails } = user._doc;

    res.status(200).json(userDetails);
  } catch (error) {
    next(error);
  }
};

// Controller to update user details
export const updateUserDetails = async (req, res, next) => {
  const { username, email, mobileNumber, avatar } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== req.user.id) {
      return next(errorHandler(400, 'Email is already in use by another user.'));
    }

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email, mobileNumber, avatar },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return next(errorHandler(404, 'User not found.'));
    }

    // Remove password from the response
    const { password, ...userDetails } = updatedUser._doc;

    res.status(200).json(userDetails);
  } catch (error) {
    next(error);
  }
};

// Controller to delete user (if necessary)
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return next(errorHandler(404, 'User not found.'));
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// Controller to handle password reset (Optional for user experience)
export const resetPassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(errorHandler(404, 'User not found.'));
    }

    const isPasswordCorrect = bcryptjs.compareSync(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return next(errorHandler(401, 'Incorrect current password.'));
    }

    // Hash the new password
    const hashedNewPassword = bcryptjs.hashSync(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error) {
    next(error);
  }
};
