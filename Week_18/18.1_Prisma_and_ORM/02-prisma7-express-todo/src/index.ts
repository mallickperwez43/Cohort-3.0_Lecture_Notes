import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prismaClient } from './prisma.js'
import { SignupSchema, CreateTodoSchema } from './schemas.js';

const app = express();
app.use(express.json());

const PORT: number = 3000;

app.post('/api/signup', async (req: Request, res: Response) => {
    try {
        const validatedData = SignupSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: validatedData.error
            });
        }

        const { username, email, password } = validatedData.data;

        const existingUser = await prismaClient.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prismaClient.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser.id, username: newUser.username, email: newUser.email }
        });
    } catch (error: any) {
        if (error.name === "ZodError") {
            return res.status(400).json({ error: "Validation failed", details: error.errors });
        }
        return res.status(500).json({ error: "Database registration failure", message: error.message });
    }
});

app.post('/api/todos', async (req: Request, res: Response) => {
    try {
        const validatedData = CreateTodoSchema.safeParse(req.body);

        if (!validatedData.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: validatedData.error
            });
        }

        const { title, description, done, userId } = validatedData.data;

        const newTodo = await prismaClient.todo.create({
            data: {
                title: title,
                description: description,
                done: done,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });

        return res.status(201).json({ message: "Todo created successfully", todo: newTodo });
    } catch (error: any) {
        if (error.name === "ZodError") {
            return res.status(400).json({ error: "Validation failed", details: error.errors });
        }
        return res.status(500).json({ error: "Failed to create todo", message: error.message });
    }
});

app.get('/api/todos/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ error: "Invalid or missing user ID" });
        }

        const parsedUserId = parseInt(userId);

        if (isNaN(parsedUserId)) {
            return res.status(400).json({ error: "User ID must be a valid number" });
        }

        const userDataWithTodos = await prismaClient.user.findUnique({
            where: { id: parsedUserId },
            select: {
                id: true,
                username: true,
                email: true,
                todos: {
                    orderBy: { id: 'asc' }
                }
            }
        });

        if (!userDataWithTodos) {
            return res.status(404).json({ error: `User with ID ${parsedUserId} does not exist.` });
        }

        return res.status(200).json({ userDataWithTodos });
    } catch (error: any) {
        return res.status(500).json({ error: "Failed to retrieve user todos", message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server fully operational at http://localhost:${PORT}`);
});