import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUserById);
userRouter.put("/:id", authorize, updateUser);
userRouter.patch("/:id", authorize, updateUser);
userRouter.delete("/:id", authorize, deleteUser);

export default userRouter;
