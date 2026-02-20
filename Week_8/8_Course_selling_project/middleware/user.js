const jwt = require('jsonwebtoken');
const { JWT_USER_SECRET } = require('../config')

const userMiddleware = (req, res, next) => {
    // get user_token from cookie
    const user_token = req.cookies.user_token;

    if (!user_token) {
        return res.status(401).json({ message: "No token, authorization denied!" })
    }

    try {
        const decoded = jwt.verify(user_token, JWT_USER_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token is not valid!" })
    }
};

module.exports = { userMiddleware }