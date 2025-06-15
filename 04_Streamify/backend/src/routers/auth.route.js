import express from "express";
import {
  login,
  logout,
  signup,
  onboard,
} from "../controllers/auth.controler.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/onboarding", protectRoute, onboard);

// check is user logged in
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
