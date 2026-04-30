import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3, "Name is required!"),
    username: z.string().min(3, "Username should be atleast 3 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password should be atleast 6 characters")
});

export const signInSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6)
});