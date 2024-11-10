import express from "express";
import { validateRequest } from "../middlewares/category.middleware.js";
import { verifyAccessToken, verifyIsAdmin } from "../utils/jwt.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controllers.js";

const router = express.Router();

router.use(verifyAccessToken, verifyIsAdmin);
router.post("/", validateRequest("category"), createCategory);
router.put("/:id", validateRequest("category"), updateCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategory);
export default router;
