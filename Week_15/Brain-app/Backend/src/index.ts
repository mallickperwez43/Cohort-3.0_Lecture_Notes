import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from 'cookie-parser';
import { connectDB } from "./config/db.js"
import userRoutes from './routes/userRoutes.js';
import contentRoutes from './routes/contentRoutes.js';

dotenv.config();

connectDB();

const app = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/content', contentRoutes);


app.listen(PORT, () => {
    console.log(`App listens on port: ${PORT}`);
});