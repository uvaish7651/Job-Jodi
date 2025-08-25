import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "No token provided",
                success: true
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false,
            })
        }
        req.id = decoded.userId;
        next();


    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
};



export default authenticateToken;