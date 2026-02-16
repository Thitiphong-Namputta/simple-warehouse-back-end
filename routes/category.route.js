import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", authorize, getCategoryById);
categoryRouter.post("/", authorize, createCategory);
categoryRouter.put("/:id", authorize, updateCategory);
categoryRouter.patch("/:id", authorize, updateCategory);
categoryRouter.delete("/:id", authorize, deleteCategory);

export default categoryRouter;
