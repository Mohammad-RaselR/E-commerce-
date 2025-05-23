import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const signup = async (req, res, next) => {
  const { email, password, username, mobileNumber } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email }); 
    if (existingUser) {   
      return next(errorHandler(400, "User with this email already exists."));
    } 
    
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      mobileNumber: mobileNumber,
    });

    await newUser.save();
    res.status(201).json("User Created Successfully");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
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

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = generateToken(user); // Using the helper function for generating the token
      const { password: pass, ...rest } = user._doc;
      return res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const usernameBase = req.body.name.split(' ').join('').toLowerCase();
      let username = usernameBase + Math.floor(Math.random() * 10000);
      while (await User.findOne({ username })) {
        username = usernameBase + Math.floor(Math.random() * 10000);
      }

      const newUser = new User({
        username,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
        role: 'customer', // Default role as customer
      });

      await newUser.save();

      const token = generateToken(newUser); // Using the helper function for generating the token
      const { password: pass, ...rest } = newUser._doc;

      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json("User Logged Out Successfully");
  } catch (error) {
    next(error);
  }
};

export const isVendor = (req, res, next) => {
  if (req.user?.role === 'vendor') return next();
  return res.status(403).json({ message: 'Vendor access required' });
};
