import express from "express";
import { verifyAccessToken, verifyIsAdmin } from "../utils/jwt.js";
import {
  changeUserPassword,
  changeUserRole,
  deleteUser,
  getUserProfile,
  getUsers,
  updateUser,
  updateUserProfile,
} from "../controllers/user.controllers.js";
import uploadCloud from "../utils/cloudinary.js";
import { validateRequest } from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/profile", verifyAccessToken, getUserProfile);
router.put(
  "/profile",
  verifyAccessToken,
  uploadCloud.single("avatar"),
  updateUserProfile
);
router.put(
  "/change-password",
  verifyAccessToken,
  validateRequest("change-password"),
  changeUserPassword
);

// ADMIN
router.get("/getUsers", verifyAccessToken, verifyIsAdmin, getUsers);
router.put(
  "/change-role/:userId",
  verifyAccessToken,
  verifyIsAdmin,
  changeUserRole
);
router.delete(
  "/delete-user/:userId",
  verifyAccessToken,
  verifyIsAdmin,
  deleteUser
);
router.put(
  "/update-user/:userId",
  verifyAccessToken,
  verifyIsAdmin,
  uploadCloud.single("avatar"),
  updateUser
);

export default router;
