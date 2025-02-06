import express from "express";
import { validateRequest } from "../middlewares/validate.middleware.js";
import {
  finalRegister,
  forgotPassword,
  loginUser,
  logoutUser,
  refreshAccessToken,
  register,
  resetPassword,
} from "../controllers/auth.controllers.js";
import { verifyAccessToken } from "../utils/jwt.js";

const router = express.Router();

router.post("/register", validateRequest("register"), register);
router.post("/final-register/:register_token", finalRegister);
router.post("/login", validateRequest("login"), loginUser);
router.post("/logout", verifyAccessToken, logoutUser);
router.post(
  "/forgot-password",
  validateRequest("forgotPassword"),
  forgotPassword
);
router.put("/reset-password", validateRequest("resetPassword"), resetPassword);
router.post("/refresh-token", verifyAccessToken, refreshAccessToken);
export default router;
