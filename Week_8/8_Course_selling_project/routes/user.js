const express = require('express');
const userRouter = express.Router();
const { userModel, purchaseModel, courseModel, contentModel } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { JWT_USER_SECRET } = require('../config');
const { userMiddleware } = require('../middleware/user')

// Input validation using ZOD

/* ----------------- SCHEMA'S FOR ZOD ---------------------------*/
const signupSchema = z.object({
    email: z.email(),
    password: z.string().min(3).max(100),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100)
})

const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(3).max(100)
});


/* -----------ROUTES----------------*/
userRouter.post("/signup", async (req, res) => {

    const parsedData = signupSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Incorrect format",
            errors: parsedData.error.issues
        });
    }

    const { email, password, firstName, lastName } = req.body;

    try {
        // check for exisiting user in db
        const exisitingUser = await userModel.findOne({ email });
        if (exisitingUser) {
            return res.status(400).json({ message: "User already exist with this email" })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({
            message: "User creation failed"
        })
    }
})

userRouter.post("/signin", async (req, res) => {

    const parsedData = signinSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Incorrect format",
            errors: parsedData.error.issues
        });
    }

    const { email, password } = req.body;

    try {
        // check for exisiting user
        const exisitingUser = await userModel.findOne({ email });
        if (!exisitingUser) {
            return res.status(400).json({ message: "Incorrect email" })
        }

        const passwordMatched = await bcrypt.compare(password, exisitingUser.password);

        if (passwordMatched) {
            const user_token = jwt.sign({
                id: exisitingUser._id.toString()
            }, JWT_USER_SECRET);

            // set the cookie
            res.cookie("user_token", user_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
                sameSite: "Strict"
            })

            res.status(200).json({
                message: "Signed in successfully"
            });
        }
        else {
            res.status(403).json({
                message: "Incorrect password"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Signing in failed" });
    }
})

userRouter.post("/logout", (req, res) => {
    res.clearCookie("user_token");
    res.json({ message: "Logged out successfully" });
})

userRouter.use(userMiddleware);

/* -----------PROTECTED ROUTES----------------*/
userRouter.get("/purchases", async (req, res) => { // all my purchased courses
    const userId = req.userId;
    try {
        // find all purchased courses for this user
        const purchasedCourses = await purchaseModel.find({ userId });

        // for each purchased courses fetch course details
        const courseData = await Promise.all(
            purchasedCourses.map(async (purchasedCourses) => {
                const courseDetails = await courseModel.findById(purchasedCourses.courseId);
                const content = await contentModel.findOne({ courseId: purchasedCourses.courseId });

                return {
                    course: courseDetails,
                    lessons: content ? content.lessons : []
                }
            })
        )
        res.status(200).json({ purchasedCourses: courseData })
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch purchased courses" })
    }
})

userRouter.get("/me", async (req, res) => {
    const userId = req.userId;

    try {
        const user = await userModel.findById(userId);
        res.status(200).json({ user })
    } catch (error) {
        res.status(404).json({
            message: "User not found"
        })
    }
})

module.exports = { userRouter: userRouter };