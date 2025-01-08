import {Users} from '../models/userModel.js'
import bcrypt from "bcrypt"
import generateToken from "../middlewears/jwt.js"
const userLogin = async(req,res,next) =>{
    try {
        const {email,password} = req.body
        console.log(email,password);

const existingUser = await Users.findOne({email})
        
        if(!existingUser){
            return res.status(404).json({message:'User doesnt Exist, Please Register!'})
        }
        
        const isMatch = await bcrypt.compare(password, existingUser.password)
        
        if (!isMatch) {
            return res.status(404).json({msg: "Invalid password"})
        }
   
        const token = generateToken(existingUser)
   
res.cookie('token', token, {
  httpOnly: true,
  secure: true, 
  sameSite: 'none', 
  maxAge: 24 * 60 * 60 * 1000
});
        
        return res.status(200).json({ message: 'Login successful' })
    } catch (err) {
        console.error(`Error login user : ${err}`)
        return res.status(500).json({ error: "Internal server error" })
    }
}

export default userLogin;
