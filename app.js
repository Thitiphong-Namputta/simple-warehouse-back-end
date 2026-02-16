import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import subscriptionRouter from "./routes/subscription.route.js";
import orderRouter from "./routes/order.route.js";
import transactionRouter from "./routes/transaction.route.js";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello from Simple Warehouse Back End!");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);

  connectToDatabase();
});
