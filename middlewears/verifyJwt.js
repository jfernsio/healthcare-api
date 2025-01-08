import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { decode } from 'punycode';
dotenv.config()


const verifyJwt = (req, res, next) => {
    const token = req.cookies.token;
    // console.log('reached')
    if (!token) return res.status(401).json({ msg: "user is not authorized" });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ msg: "invalid token" });
       req.user = decoded;

        next();
    });
}

export default verifyJwt
