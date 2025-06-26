import { generateToken } from "../config/utils.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // check password length
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        meessage: "Password Must be at least 6 Characters",
      });
    }
    const upperCaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!upperCaseRegex.test(password) || !specialCharRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least one uppercase letter and one Special Character",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        success: false,
        meessage: "email already exists please login",
      });
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashpassword,
    });

    if (newUser) {
      // Generate JWT token here
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        success: true,
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        message: "New User Created successfuly",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid user data",
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

export const login = (req, res) => {
  res.send("login Router");
};

export const logout = (req, res) => {
  res.send("logout Router");
};
