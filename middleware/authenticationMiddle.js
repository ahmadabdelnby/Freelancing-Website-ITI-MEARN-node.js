const jwt = require('jsonwebtoken');
const user = require('../Models/User');

function authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header not found, you must be logged in" });
    }
    
    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    
    if (!token) {
        return res.status(401).json({ message: "Token not found, you must be logged in" });
    }
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        console.error('JWT verification error:', err);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

module.exports = authenticate;