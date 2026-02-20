const express = require('express');
const adminRouter = express.Router();
const { adminModel, courseModel, contentModel } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { JWT_ADMIN_SECRET } = require('../config');
const { adminMiddleware } = require('../middleware/admin');

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

const courseSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(100),
    price: z.number().positive(),
    imageUrl: z.url()
})

const contentSchema = z.object({
    courseId: z.string(),
    lessons: z.array(z.object({
        title: z.string(),
        videoUrl: z.url().includes("youtube.com"),
        runtime: z.number().optional()
    }))
})

/* -----------ROUTES----------------*/
adminRouter.post("/signup", async (req, res) => {

    const parsedData = signupSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Incorrect format",
            errors: parsedData.error.issues
        });
    }

    const { email, password, firstName, lastName } = req.body;

    try {
        // Check for exisiting admin in db
        const exisitingAdmin = await adminModel.findOne({ email });
        if (exisitingAdmin) {
            return res.status(400).json({ message: "Admin already exist with this email" })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Admin creation failed"
        });
    }
})

adminRouter.post("/signin", async (req, res) => {

    const parsedData = signinSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Incorrect format",
            errors: parsedData.error.issues
        });
    }

    const { email, password } = req.body;

    try {
        // check for existing admin
        const exisitingAdmin = await adminModel.findOne({ email });
        if (!exisitingAdmin) {
            return res.status(400).json({ message: "Incorrect email" })
        }

        const passwordMatched = await bcrypt.compare(password, exisitingAdmin.password);

        if (passwordMatched) {
            const admin_token = jwt.sign({
                id: exisitingAdmin._id.toString(),
            }, JWT_ADMIN_SECRET);

            // set the cookie
            res.cookie("admin_token", admin_token, {
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

adminRouter.post("/logout", (req, res) => {
    res.clearCookie("admin_token");
    res.json({ message: "Logged out successfully" });
})

adminRouter.use(adminMiddleware);

/* -----------PROTECTED ROUTES----------------*/
adminRouter.post("/course", async (req, res) => {
    const adminId = req.adminId;
    const parsedData = courseSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid course data",
            errors: parsedData.error.issues
        });
    }

    const { title, description, price, imageUrl } = req.body;

    try {
        const course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: adminId
        });

        res.status(201).json({
            message: "Course created successfully",
            courseId: course._id
        })
    } catch (error) {
        res.status(500).json({ message: "Error creating course" })
    }
})

adminRouter.put("/course", async (req, res) => {
    const adminId = req.adminId;
    const { courseId, title, description, price, imageUrl } = req.body;

    try {

        const result = await courseModel.updateOne({ _id: courseId, creatorId: adminId }, {
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl
        })

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Course not found or unauthorized" })
        }

        res.status(200).json({ message: "Course updated successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error updating course" })
    }
})

adminRouter.get("/course/bulk", async (req, res) => {
    const adminId = req.adminId;

    try {
        const courses = await courseModel.find({ creatorId: adminId });
        res.status(200).json({ courses })
    } catch (error) {
        res.status(500).json({ message: "Error fetching the courses" })
    }
})

adminRouter.delete("/course/delete", async (req, res) => {
    const adminId = req.adminId;
    const { courseId } = req.body;

    try {
        const result = await courseModel.deleteOne({ _id: courseId, creatorId: adminId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Course not found or unauthorized" });
        }

        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting the course" });
    }
})

adminRouter.post("/course/content", async (req, res) => {
    const adminId = req.adminId;

    const parsedData = contentSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid content format",
            errors: parsedData.error.issues
        })
    }

    const { courseId, lessons } = req.body;

    try {
        // verify admin is the owner of the content
        const course = await courseModel.findOne({ _id: courseId, creatorId: adminId });
        if (!course) {
            return res.status(403).json({ message: "Access denied" })
        }

        // mark the changes/ create a new
        const content = await contentModel.findOneAndUpdate(
            { courseId },
            {
                lessons: lessons,
                creatorId: adminId
            },
            { upsert: true, new: true }
        )

        res.status(200).json({ message: "Updated Successfully", content })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
})

adminRouter.get("/me", async (req, res) => {
    const adminId = req.adminId;

    try {
        const admin = await adminModel.findById(adminId);
        res.status(200).json({ admin })
    } catch (error) {
        res.status(404).json({
            message: "Admin not found"
        })
    }
})
module.exports = { adminRouter: adminRouter };