const express = require('express');
const courseRouter = express.Router();
const { courseModel, purchaseModel } = require('../db');
const { userMiddleware } = require('../middleware/user');

courseRouter.get("/preview", async (req, res) => { // all courses
    try {
        const courses = await courseModel.find({});
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses" })
    }
})

courseRouter.get("/:id", async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.id);
        res.json({ course });
    } catch (e) {
        res.status(404).json({ message: "Course not found" });
    }
});

courseRouter.use(userMiddleware);

courseRouter.post("/purchase", async (req, res) => { // purchasing a course
    // you would expect a user to pay you

    const userId = req.userId;
    const { courseId } = req.body;

    try {

        // check if course exists
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        // check if already purchased
        const existingPurchase = await purchaseModel.findOne({
            userId,
            courseId
        })
        if (existingPurchase) {
            return res.status(400).json({ message: "You have already purchased this course" })
        }

        // record purchase
        await purchaseModel.create({
            userId: userId,
            courseId: courseId
        })

        res.status(201).json({ message: "You have successfully purchased the course" })
    } catch (error) {
        res.status(500).json({ message: "Purchase failed" })
    }
})

module.exports = { courseRouter: courseRouter };