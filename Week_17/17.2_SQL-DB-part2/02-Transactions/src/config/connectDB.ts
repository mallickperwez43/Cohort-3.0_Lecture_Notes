import { pgClient } from "./pgConfig.js";

export const connectDB = async () => {

    pgClient.on('error', (err) => {
        console.error('PostgreSQL Client Connection Lost unexpectedly!', err);
        // Optional: Trigger a reconnection strategy here if needed
    });

    try {
        await pgClient.connect();
        console.log("PG DB connected");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
};