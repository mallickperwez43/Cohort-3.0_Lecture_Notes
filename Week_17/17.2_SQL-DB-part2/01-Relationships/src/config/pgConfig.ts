import { Client } from "pg";

if (!process.env.PG_URI) {
    console.error("Error: PG_URI is not defined in the environment variables.");
}

export const PG_URI = process.env.PG_URI as string;

export const pgClient = new Client({
    connectionString: PG_URI
});