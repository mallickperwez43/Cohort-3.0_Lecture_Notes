const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: { type: ObjectId, ref: 'admin' }
});

const purchaseSchema = new Schema({
    userId: { type: ObjectId, ref: 'user' },
    courseId: { type: ObjectId, ref: 'course' }
});

const contentSchema = new Schema({
    courseId: { type: ObjectId, ref: 'course', required: true, unique: true },
    creatorId: { type: ObjectId, ref: 'admin' },
    lessons: [{
        title: { type: String, required: true },
        videoUrl: { type: String, required: true },
        runtime: Number
    }]
})

const userModel = model("user", userSchema);
const adminModel = model("admin", adminSchema);
const courseModel = model("course", courseSchema);
const purchaseModel = model("purchase", purchaseSchema);
const contentModel = model("content", contentSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
    contentModel
}