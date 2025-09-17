import { Router } from "express";
import { getAllUsers, getUserById } from "../controller/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authorize, getAllUsers);

userRouter.get("/:id", authorize, getUserById);

userRouter.post("/", (req, res) => {
  res.send({ message: "CREATE A new user" });
});

userRouter.put("/:id", (req, res) => {
  const userId = req.params.id;
  res.send({ message: `UPDATE user with ID: ${userId}` });
});

userRouter.delete("/:id", (req, res) => {
  const userId = req.params.id;
  res.send({ message: `DELETE user with ID: ${userId}` });
});

export default userRouter;
