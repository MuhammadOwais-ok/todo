const JWT = require("jsonwebtoken");
const User = require("../models/User");

const adminMiddleware = async (request, response, next) => {
    try {
        const authHeader = request.headers.authorization
        if (!authHeader) {
            return response.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1]
        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);


        const user = decoded;


        if (user.role !== "admin") {
            return response.status(403).json({ message: "Access denied. Admin only." });
        }

        request.user = user;
        next();
    } catch (error) {
        return response.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
};

module.exports = adminMiddleware;
