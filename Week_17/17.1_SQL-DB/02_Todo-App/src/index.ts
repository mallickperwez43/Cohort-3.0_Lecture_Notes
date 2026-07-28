import dotenv from "dotenv";
dotenv.config();
import express from "express";
import type { Request, Response } from "express";
import { Client } from "pg";
import { PG_URI } from "./config/pgConfig.js";

const app = express();
app.use(express.json());
const pgClient = new Client(PG_URI);

async function main() {
    try {
        await pgClient.connect();

        console.log("PG DB connected");

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
};

main();

app.post("/signup", async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Username, email, and password are required"
        });
    }

    try {
        const queryText: string = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, created_at
        `;
        const values = [username, email, password]; // To prevent SQL injection

        const response = await pgClient.query(queryText, values);

        return res.status(201).json({
            message: "User signed up successfully!",
            user: response.rows[0]
        });
    } catch (error) {
        console.error("Database error during signup:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})
