import { Router } from "express";
import { getUsers, getUserById } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", (req, res) => {
  res.send("CREATE new user");
});
userRouter.put("/:id", (req, res) => {
  res.send("UPDATE user");
});
userRouter.delete("/:id", (req, res) => {
  res.send("DELETE user");
});

export default userRouter;
