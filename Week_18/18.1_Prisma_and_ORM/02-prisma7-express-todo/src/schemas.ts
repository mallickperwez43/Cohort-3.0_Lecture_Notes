import { email, z } from 'zod'

export const SignupSchema = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(8)
});

export const CreateTodoSchema = z.object({
    title: z.string().min(1),
    description: z.string().default(""),
    done: z.boolean().default(false),
    userId: z.number().int().positive()
});