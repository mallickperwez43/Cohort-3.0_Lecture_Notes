const jwt = require('jsonwebtoken');
const { JWT_ADMIN_SECRET } = require('../config')

const adminMiddleware = (req, res, next) => {
    // get admin_token from cookie
    const admin_token = req.cookies.admin_token;

    if (!admin_token) {
        return res.status(401).json({ message: "No token, authorization denied!" })
    }

    try {
        const decoded = jwt.verify(admin_token, JWT_ADMIN_SECRET);
        req.adminId = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token is not valid!" })
    }
};

module.exports = { adminMiddleware }