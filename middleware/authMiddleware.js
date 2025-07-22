const JWT = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization token missing" })
        }

        const token = authHeader.split(" ")[1]

        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            error: error.message
        });
    }
}


module.exports = authMiddleware;