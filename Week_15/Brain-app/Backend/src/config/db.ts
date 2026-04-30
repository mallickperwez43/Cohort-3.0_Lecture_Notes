import mongoose from "mongoose";


export const connectDB = async () => {
    const uri = process.env.MONGO_URI as string;

    try {
        if (!uri) {
            throw new Error("MONGO_URI is not defined in .env file");
        }

        const conn = await mongoose.connect(uri);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`❌ Error: ${error.message}`);
        } else {
            console.error("❌ An unknown error occurred");
        }
        process.exit(1);
    }
}