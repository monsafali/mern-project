import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { upsertStreamUser } from "../config/stream.js";

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

    const hashedpassword = await bcrypt.hash(String(password), 10);

    const newuser = await User.create({
      email,
      password: hashedpassword,
      Fullname,
      profilePic: randomAvatar,
    });
    //save data to the upsert stream

    try {
      await upsertStreamUser({
        id: newuser._id,
        name: newuser.Fullname,
        image: newuser.profilePic || "",
      });
      console.log(`stream user created for ${newuser.Fullname}`);
    } catch (error) {
      console.log("Upsert user error", error);
    }

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

// pre save

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const comparepassword = await bcrypt.compare(
      String(password),
      user.password
    );

    if (!comparepassword) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ user, message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logout successful" });
}

export async function onboard(req, res) {
  try {
    const userId = req.user._id;
    const { Fullname, bio, nativeLanguage, learningLanguage, location } =
      req.body;
    if (
      !Fullname ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(400).json({
        message: "All fields are required",
        missingfileds: [
          !Fullname && "Fullname",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // update in upsert stream
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.Fullname,
        image: updatedUser.profilePic || "",
      });
    } catch (error) {
      console.log("Upsert user error", error);
    }
    try {
      await upsertStreamUser({
        id: updatedUser._id,
        name: updatedUser.Fullname,
        image: updatedUser.profilePic || "",
      });
      console.log(`stream user updated for ${updatedUser.Fullname}`);
    } catch (error) {
      console.log("Upsert user error", error);
    }
    res
      .status(200)
      .json({ user: updatedUser, message: "Onboarding successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
