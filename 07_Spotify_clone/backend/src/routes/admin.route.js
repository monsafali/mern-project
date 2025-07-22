import { Router } from "express";
import { ProtectRoute, requiredAdmin } from "../middleware/auth.middleware";
import { createSong } from "../controller/admin.controller.js";

const router = Router();

router.post("/songs", ProtectRoute, requiredAdmin, createSong);
export default router;
