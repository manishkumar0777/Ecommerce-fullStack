const JWT = require('jsonwebtoken');

const verifyToken = (req, res , next) => {
    const authHeader = req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = JWT.verify(token, process.env.JWT_KEY);
        req.user = verified;
        return next();
    } catch (error) {
        console.log(error);
        res.status(400).send('Invalid token')
    }
};

module.exports = {
    verifyToken, 
}