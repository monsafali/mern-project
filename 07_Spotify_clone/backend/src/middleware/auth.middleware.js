import { clerkClient } from "@clerk/express";

export const ProtectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    return res.status(401).json({ message: "unatorized user you must login" });
  }
  next();
};

export const requiredAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress.emailAddress;
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Unaturoed you must be and admin" });
    }
    next();
  } catch (error) {}
};
