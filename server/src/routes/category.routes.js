import express from "express";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { verifyAccessToken, verifyIsLibrarian } from "../utils/jwt.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controllers.js";

const router = express.Router();

router.use(verifyAccessToken, verifyIsLibrarian);
router.post("/", validateRequest("category"), createCategory);
router.put("/:categoryId", updateCategory);
router.get("/", getCategories);
router.delete("/:categoryId", deleteCategory);
export default router;
