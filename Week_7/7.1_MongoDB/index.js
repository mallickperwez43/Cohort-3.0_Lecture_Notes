const express = require('express');
const { UserModel, TodoModel } = require('./db');
const connectDB = require('./connection');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "asguihivnhg1@1213411451erwtd3#3"

const app = express();

app.use(express.json());

connectDB();

const port = 3000;

const auth = (req, res, next) => {
    const token = req.headers.token;

    const decodedData = jwt.verify(token, JWT_SECRET);
    if (decodedData) {
        req.userId = decodedData.id;
        next();
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
};

app.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        await UserModel.create({
            email: email,
            password: password,
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
    const { email, password } = req.body;

    try {
        const userExist = await UserModel.findOne({
            email: email,
            password: password
        })

        if (userExist) {
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
    console.log(`App listens on Port: ${port}`)
});