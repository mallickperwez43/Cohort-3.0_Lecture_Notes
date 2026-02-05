const express = require('express');
const bcrypt = require('bcrypt');
const helmet = require('helmet'); // Standard security headers
const { z } = require('zod');
const { UserModel, TodoModel } = require('./db');
const connectDB = require('./connection');
const { auth, JWT_SECRET } = require('./auth');
const jwt = require('jsonwebtoken');

const app = express();

// Security and Middleware
app.use(helmet());
app.use(express.json());

connectDB();

const port = 3000;

app.post('/signup', async (req, res) => {

    // Input validation using ZOD
    const signupSchema = z.object({
        email: z.email().min(3).max(100),
        password: z.string().min(3).max(100),
        name: z.string().min(3).max(100)
    })

    // const parsedData = requiredBody.parse(req.body);
    const parsedDataWithSuccess = signupSchema.safeParse(req.body); // returns object

    if (!parsedDataWithSuccess.success) {
        res.status(400).json({
            message: "Incorrect format",
            errors: parsedDataWithSuccess.error.issues
        })
        return;
    }

    const { email, password, name } = req.body;

    try {
        // Check if user already exists (Saves CPU time on hashing)
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // bcrypt.hash(myPassword, saltRounds) , returns promise
        console.log(hashedPassword);

        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        })

        res.status(201).json({
            message: "User created successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.post('/signin', async (req, res) => {

    // Input validation using ZOD
    const signinSchema = z.object({
        email: z.email().min(3).max(100),
        password: z.string().min(3).max(100)
    })

    const parsedDataWithSuccess = signinSchema.safeParse(req.body);

    if (!parsedDataWithSuccess) {
        res.status(400).json({
            message: "Incorrect format",
            errors: parsedDataWithSuccess.error.issues
        })
        return;
    }

    const { email, password } = req.body;

    try {
        const userExist = await UserModel.findOne({
            email
        })

        if (!userExist) {
            res.status(403).json({
                message: "Incorrect credentials"
            })
            return;
        }

        const passwordMatched = await bcrypt.compare(password, userExist.password);

        if (passwordMatched) {
            const token = jwt.sign({
                id: userExist._id.toString()
            }, JWT_SECRET);

            res.status(200).json({
                token: token,
                message: "Signed in successfully"
            })
        }
        else {
            res.status(403).json({
                message: "Incorrect credentials"
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.use(auth);

app.post('/todo', async (req, res) => {
    const { title, done } = req.body;
    const userId = req.userId; // Provided by auth middleware

    try {
        await TodoModel.create({
            title: title,
            done: done,
            userId: userId // Links this todo to the specific user
        });

        res.status(201).json({
            message: "Todo created successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo" });
    }
});

app.get('/todos', async (req, res) => {
    const userId = req.userId; // Provided by auth middleware

    try {
        // Find all todos where the userId matches the logged-in user
        const todos = await TodoModel.find({
            userId: userId
        });

        res.status(200).json({
            todos: todos
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos" });
    }
});

app.listen(port, () => {
    console.log(`App serving on port: ${port}`)
});