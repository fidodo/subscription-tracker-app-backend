import { Router } from "express";
import { signUp, signIn, signOut } from "../controller/auth.controller.js";

const authRouther = Router();

authRouther.post("/sign-up", signUp);

authRouther.post("/sign-in", signIn);

authRouther.post("/sign-out", signOut);
export default authRouther;
