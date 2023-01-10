const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if(token == null)return res.status(401).send("Token is required");
    jwt.verify(token, process.env.ACCESS_SECRETE_TOKEN, (error, username) =>{
    if (error) return res.status(403).send();
    req.username = username; 
    })
    next();
}
module.exports= authMiddleware