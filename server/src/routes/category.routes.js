import express from "express";
import { validateRequest } from "../middlewares/category.middleware.js";
import { verifyAccessToken, verifyIsAdmin } from "../utils/jwt.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  searchCategories,
  updateCategory,
} from "../controllers/category.controllers.js";

const categoryRouter = express.Router();

categoryRouter.use(verifyAccessToken, verifyIsAdmin);
categoryRouter.post("/", validateRequest("category"), createCategory);
categoryRouter.put("/:id", validateRequest("category"), updateCategory);
categoryRouter.get("/", getCategories);
categoryRouter.get("/search", searchCategories);
categoryRouter.delete("/:id", deleteCategory);
export default categoryRouter;
