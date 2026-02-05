const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect("mongodb+srv://admin:Hoht0gbboUHzbhDt@cluster0.qp13ssv.mongodb.net/todo-app-database");
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}

module.exports = connectDB;