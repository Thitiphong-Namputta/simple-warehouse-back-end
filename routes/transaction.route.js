import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.get("/", getTransactions);
transactionRouter.get("/:id", authorize, getTransactionById);
transactionRouter.post("/", authorize, createTransaction);
transactionRouter.put("/:id", authorize, updateTransaction);
transactionRouter.patch("/:id", authorize, updateTransaction);
transactionRouter.delete("/:id", authorize, deleteTransaction);

export default transactionRouter;
