import express from "express";
import {
  verifyAccessToken,
  verifyIsAdmin,
  verifyIsLibrarian,
} from "../utils/jwt.js";
import {
  changeUserPassword,
  createUser,
  deleteUser,
  getUserProfile,
  getUsers,
  updateUser,
  updateUserProfile,
  getAllUsersByAdmin,
  getUserDetailsByAdmin,
} from "../controllers/user.controllers.js";
import uploadCloud from "../utils/cloudinary.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.use(verifyAccessToken);
router.get("/profile", getUserProfile);
router.put("/profile", uploadCloud.single("avatar"), updateUserProfile);
router.put(
  "/change-password",
  validateRequest("changePassword"),
  changeUserPassword
);

// LIBRARIAN
router.use(verifyAccessToken, verifyIsLibrarian);
router.post("/", validateRequest("user"), createUser);
router.get("/", getUsers);
router.put("/:userId", uploadCloud.single("avatar"), updateUser);
router.delete("/:userId", deleteUser);

// ADMIN
router.use(verifyAccessToken, verifyIsAdmin);
router.get("/admin", getAllUsersByAdmin);
router.get("/admin/:userId", getUserDetailsByAdmin);
router.put("/admin/:userId", uploadCloud.single("avatar"), updateUser);
router.delete("/admin/:userId", deleteUser);
export default router;
