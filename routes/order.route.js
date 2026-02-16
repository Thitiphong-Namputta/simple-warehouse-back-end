import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.get("/:id", authorize, getOrderById);
orderRouter.post("/", authorize, createOrder);
orderRouter.put("/:id", authorize, updateOrder);
orderRouter.patch("/:id", authorize, updateOrder);
orderRouter.delete("/:id", authorize, deleteOrder);

export default orderRouter;
