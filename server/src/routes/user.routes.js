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
  updateUserByAdmin,
  deleteUserByAdmin,
} from "../controllers/user.controllers.js";
import uploadCloud from "../utils/cloudinary.js";
import { validateUser } from "../middlewares/user.middleware.js";

const router = express.Router();

router.use(verifyAccessToken);
router.get("/profile", getUserProfile);
router.put("/profile", uploadCloud.single("avatar"), updateUserProfile);
router.put(
  "/change-password",
  validateUser("change-password"),
  changeUserPassword
);

// LIBRARIAN
router.use(verifyAccessToken, verifyIsLibrarian);
router.post("/", validateUser("createUserLibrarian"), createUser);
router.get("/", getUsers);
router.put("/:userId", uploadCloud.single("avatar"), updateUser);
router.delete("/:userId", deleteUser);

// ADMIN
router.use(verifyAccessToken, verifyIsAdmin);
router.get("/admin/", getAllUsersByAdmin);
router.get("/admin/:userId", getUserDetailsByAdmin);
router.patch("/admin/:userId", updateUserByAdmin);
router.delete("/admin/:userId", deleteUserByAdmin);
export default router;
