const JWT = require('jsonwebtoken');
const User = require("../models/user.model.js");

//middleware to protect route

const protect = async(req, res, next) => {
    let token;
 
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = JWT.verify(token, process.env.JWT_KEY);
            
            req.user = await User.findById(decoded.user.id).select("-password"); //not including password
            next();
        } catch (error) {
            console.error("Token verification failed : ", error);
            res.status(401).json({
                message : "Not Authorized, token failed",
            })
        }
    } else {
        res.status(401).json({
            message : "Not authorized , No token provided",
        })
    }
};

//middleware to checkif the user is admin or not;

const admin = (req, res, next) => {
    if(req.user && req.user.role === "ADMIN") {
        next();
    } else {
        res.status(403).json({
            message : "Not authorized as ADMIN"
        })
    }
}

module.exports = {
    protect, admin,
}

