import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

const generateToken = (user) => {
    return jwt.sign({ _id: user._id ,username : user.name}, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export default generateToken