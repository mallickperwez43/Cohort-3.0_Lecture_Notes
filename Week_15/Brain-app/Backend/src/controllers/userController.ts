import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { UserModel } from "../models/User.js";
import { signUpSchema, signInSchema } from "../validators/userValidator.js";

export const signup = async (req: Request, res: Response) => {
    try {
        const parsed = signUpSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Incorrect format",
                errors: parsed.error.issues
            })
        }

        const { name, username, email, password } = parsed.data;

        const existingUser = await UserModel.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await UserModel.create({
            name,
            username,
            email,
            password: hashedPassword
        });


        return res.status(201).json({
            message: "User created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const parsed = signInSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Incorrect format",
                errors: parsed.error.issues
            })
        }

        const { email, password } = parsed.data;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
        });

        return res.json({ message: "Signin successful" });
    } catch (error) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
};



export const logout = (_req: Request, res: Response) => {
    res.clearCookie("token");
    return res.json({ message: "Logged out successfully" });
};

export const me = async (req: Request, res: Response) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        const user = await UserModel.findById(decoded.userId).select("-password");
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        return res.json({ user });
    } catch {
        return res.status(401).json({ message: "Unauthorized" });
    }
};