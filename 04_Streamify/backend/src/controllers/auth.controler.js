import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { email, password, Fullname } = req.body;

  try {
    if (!email || !password || !Fullname) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists please login" });
    }
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    const newuser = await User.create({
      email,
      password,
      Fullname,
      profilePic: randomAvatar,
    });
    const token = jwt.sign({ userId: newuser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      success: true,
      user: newuser,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export function login(req, res) {
  res.send("login ");
}
export function logout(req, res) {
  res.send("logout ");
}
