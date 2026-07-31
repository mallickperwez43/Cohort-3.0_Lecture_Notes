import dotenv from "dotenv";
dotenv.config();
import express from "express";
import type { Request, Response } from "express";
import { pgClient } from "./config/pgConfig.js";
import { connectDB } from "./config/connectDB.js";

const app = express();
app.use(express.json());

connectDB();

const PORT: number = 3000;

app.post("/signup", async (req: Request, res: Response) => {
    const { username, email, password, city, country, street, pincode } = req.body;

    if (!username || !email || !password || !city || !country || !street) {
        return res.status(400).json({
            message: "Username, email, password, city, country, and street are required"
        });
    }

    try {
        // Start a SQL Transaction
        await pgClient.query("BEGIN");

        const userQuery: string = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, created_at;
        `;
        const userValues = [username, email, password];
        const userResponse = await pgClient.query(userQuery, userValues);

        const newUser = userResponse.rows[0];
        const userId: number = newUser.id;

        const addressQuery: string = `
            INSERT INTO addresses (user_id, city, country, street, pincode)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, city, country, street, pincode, created_at;
        `;
        const addressValues = [userId, city, country, street, pincode || null];
        const addressResponse = await pgClient.query(addressQuery, addressValues);
        const newAddress = addressResponse.rows[0];

        // Commit transaction if both insertions succeed
        await pgClient.query("COMMIT");

        return res.status(201).json({
            message: "User and address registered successfully!",
            user: {
                ...newUser,
                address: newAddress
            }
        });

    } catch (error: any) {
        // Roll back changes if any query fails
        await pgClient.query("ROLLBACK");

        console.error("Database error during signup transaction:", error);

        if (error.code === "23505") {
            return res.status(409).json({
                message: "Username or email already exists"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});
