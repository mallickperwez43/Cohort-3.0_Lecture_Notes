require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const { userRouter } = require('./routes/user');
const { adminRouter } = require('./routes/admin');
const { courseRouter } = require('./routes/course');
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.NODE_ENV === "production" ? false : "http://localhost:5174",
    credentials: true
}));
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

app.get("*splat", (req, res) => {
    const indexPath = path.join(__dirname, 'frontend', 'dist', 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Logs the error for the developer

    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        errors: err.errors || [] // Useful for Zod validation errors
    });
});

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).json({
        message: "Endpoint not found"
    });
});

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB Connected")
    } catch (error) {
        console.error("Database connection failed: ", error.message);
        process.exit(1)
    }
}

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`App serving on port: ${PORT}`)
    });
}

startServer();
