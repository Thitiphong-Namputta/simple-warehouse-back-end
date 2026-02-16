import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", authorize, getProductById);
productRouter.post("/", authorize, createProduct);
productRouter.put("/:id", authorize, updateProduct);
productRouter.patch("/:id", authorize, updateProduct);
productRouter.delete("/:id", authorize, deleteProduct);

export default productRouter;
