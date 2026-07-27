import dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";
import { PG_URI } from "./config/pgConfig.js";

const pgClient = new Client(PG_URI);

async function main() {
    await pgClient.connect();

    console.log("PG DB connected");

    const response = await pgClient.query("UPDATE users SET username='Alex', email='alex@gmail.com' WHERE id=1 RETURNING *");

    console.log(response.rows);

    await pgClient.end();
};

main();