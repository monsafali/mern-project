import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generaeTokenandSetCooki from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ error: "Email already Exists on the database please login" });
    }

    // Hash Password here
    const hashedPassword = await bcrypt.hash(password, 10);
    // https://avatar.iran.liara.run/public/boy

    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${fullName}`;
    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${fullName}`;

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfile : girlProfile,
    });

    if (newUser) {
      // Generate JWT TOKEN HERE
      generaeTokenandSetCooki(newUser._id, res);
      newUser.save();
      return res.status(200).json({
        _id: newUser._id,
        fullname: newUser.fullName,
        email: newUser.email,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(200).json({ error: "Invalid User data" });
    }
  } catch (error) {
    console.log(`Error in signup controller`, error.message);
    return res
      .status(400)
      .json({ error: "Internal Server Error Please Try again" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect || !user) {
      return res
        .status(500)
        .json({ success: false, message: "UserName or Password is Incorrect" });
    }
    generaeTokenandSetCooki(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullName,
      gender: user.gender,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(`Error in Login controller`, error.message);
    return res
      .status(400)
      .json({ error: "Internal Server Error Please Try again" });
  }
};

export const Logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout succesfuly" });
  } catch (error) {
    console.log(`Error in Logout controller`, error.message);
    return res
      .status(400)
      .json({ error: "Internal Server Error Please Try again" });
  }
};
