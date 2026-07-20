import { Router } from "express";
import { signup, signin, logout, me } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post('/signup', signup);

userRouter.post('/signin', signin);

userRouter.post('/logout', authMiddleware, logout);

userRouter.get('/me', me);

export default userRouter;