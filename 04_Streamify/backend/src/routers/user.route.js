import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMyFriends,
  getRecommendedUsers,
} from "../controllers/user.controller.js";
const router = express.Router();

// apply with middlewqe to all routes
router.use(protectRoute);
router.get("/", protectRoute, getRecommendedUsers);
router.get("/friends", protectRoute, getMyFriends);
export default router;
