const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "harkirat123";

const app = express();

const port = 3000;

app.use(express.json());

const users = [];

// Middleware to authenticate
const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        // Verify and attach to the request object
        const userInfo = jwt.verify(token, JWT_SECRET);
        req.user = userInfo; // This makes userInfo available in /me
        next();
    } catch (err) {
        res.status(403).json({
            message: "Invalid or expired token"
        });
    }
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (users.find(u => u.username === username)) {
        res.json({
            message: `User already exist with username: ${username}`
        });
        return;
    }

    users.push({
        username: username,
        password: password
    });

    res.json({
        message: `You are signed up with username: ${username}`
    });

    console.log("From signup endpoint: ", users);
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);

        res.json({
            token: token
        })
    }
    else {
        res.status(403).json({
            message: "Invalid username and password"
        })
        return;
    }

    console.log("From signin endpoint: ", users);
    console.log(`Token issued for ${username}`);
});

app.use(auth);

app.get('/me', (req, res) => {
    const username = req.user.username;

    const user = users.find(u => u.username === username);
    if (user) {
        res.json({
            message: `Welcome back ${user.username}`,
            username: `${user.username}`,
            password: `${user.password}`
        })
    }
    else {
        res.status(401).json({
            message: "Unauthorized"
        })
    }

    console.log("Gaved response from the me endpoint accordingly")
});

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
});