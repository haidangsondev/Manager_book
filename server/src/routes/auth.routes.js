import express from "express";
import { validateRequest } from "../middlewares/auth.middleware.js";
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
router.get("/final-register/:register_token", finalRegister);
router.post("/login", validateRequest("login"), loginUser);
router.post("/logout", verifyAccessToken, logoutUser);
router.post(
  "/forgot-password",
  validateRequest("forgot-password"),
  forgotPassword
);
router.put("/reset-password", validateRequest("reset-password"), resetPassword);
router.post("/refresh-token", verifyAccessToken, refreshAccessToken);
export default router;
