import { Router } from "express";
import { signup, signin, logout } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post('/signup', signup);

userRouter.post('/signin', signin);

userRouter.post('/logout', authMiddleware, logout);

export default userRouter;