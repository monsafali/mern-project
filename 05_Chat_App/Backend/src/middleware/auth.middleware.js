import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const jwt_token = req.cookies.jwt_token;

    if (!jwt_token) {
      return res.status(401).json({
        success: false,
        message: "Unathorized Not Token Provided",
      });
    }

    const decoded = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unathorized Invalid Token",
      });
    }
    console.log(decoded);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error In ProtectRoute middleware", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
