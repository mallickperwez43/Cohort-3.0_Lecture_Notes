import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    // console.log("Cookies Before:", req.cookies);
    const token = req.cookies?.token;
    // console.log("Cookies After:", req.cookies);


    if (!token) {
        console.log("No token")
        return res.status(401).json({ message: "No token, autherization denied!" });
    }

    try {
        if (!JWT_SECRET) {
            console.log("JWT_SECRET is missing in .env");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (!decoded.userId) {
            console.log("Token decoded but userId is missing");
            return res.status(401).json({ message: "Invalid token structure" });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: "Token is not valid" });
    }
}; 