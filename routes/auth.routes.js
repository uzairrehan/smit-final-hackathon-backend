import {
  verifyEmailController,
  loginController,
  registerController,
} from "../controllers/auth.js";

import { Router } from "express";

const router = Router();

// Register/Signup User
router.post("/register", registerController);

// login User
router.post("/login", loginController);

// email verification
router.get("/verify-email", verifyEmailController);

export default router;
