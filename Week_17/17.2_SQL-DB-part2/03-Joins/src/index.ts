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

// signup route
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

// get user info along with address using joins
app.get("/metadata/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({
            message: "User ID is required"
        });
    }

    try {
        const query = `
            SELECT 
                u.id AS user_id,
                u.username,
                u.email,
                u.created_at AS user_created_at,
                a.id AS address_id,
                a.city,
                a.country,
                a.street,
                a.pincode
            FROM users u
            INNER JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1;
        `

        const response = await pgClient.query(query, [userId]);

        if (response.rows.length === 0) {
            return res.status(404).json({
                message: "User or address not found"
            });
        }

        const data = response.rows[0];

        return res.status(200).json({
            message: "User metadata fetched successfully",
            user: {
                id: data.user_id,
                username: data.username,
                email: data.email,
                created_at: data.user_created_at,
                address: {
                    id: data.address_id,
                    city: data.city,
                    country: data.country,
                    street: data.street,
                    pincode: data.pincode
                }
            }
        });

    } catch (error: any) {
        console.error("Database error during metadata fetch:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});
