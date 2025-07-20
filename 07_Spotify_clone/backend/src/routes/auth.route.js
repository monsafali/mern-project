import { Router } from "express";

import { AuthCallBack } from "../controller/auth.controller.js";

const router = Router();

router.post("/callback", AuthCallBack);

export default router;
