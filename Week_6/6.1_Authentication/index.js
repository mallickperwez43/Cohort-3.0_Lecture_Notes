const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "randomharkiratilovekiara";
const app = express();

const port = 3000;

app.use(express.json());

const users = [];

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (users.find(u => u.username === username)) {
        res.json({
            message: `${username} already exits`
        })
        return;
    }

    users.push({
        username: username,
        password: password,
    });

    res.json({
        message: `You are signed up ${username}`
    });

    console.log(users);
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({
            username: user.username,
        }, JWT_SECRET); // convert thier username to a to jwt

        // user.token = token;
        res.json({
            message: token
        })
    }
    else {
        res.status(403).json({
            message: "Invalid username or password"
        })
    }

    console.log(users);
});

app.get('/me', (req, res) => {
    const token = req.headers.authorization;

    const decodedInfo = jwt.verify(token, JWT_SECRET); // jwt -> username
    const username = decodedInfo.username;

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
});

app.listen(port, () => {
    console.log(`App listens on port: ${port}`)
});