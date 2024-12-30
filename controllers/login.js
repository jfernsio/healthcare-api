import {Users} from '../models/userModel.js'
import bcrypt from "bcrypt"
import generateToken from "../middlewears/jwt.js"
const userLogin = async(req,res,next) =>{
    const {email,password} = req.body
    console.log(req.body)
    try {
    const existingUser = await Users.findOne({email})
    console.log(existingUser.password)
    if(!existingUser){
        return res.status(404).json({message:'User doesnt Exist, Please Register!'})
        }
        const isMatch = await bcrypt.compareSync(password,existingUser.password)
        if (!isMatch) {
          return res.status(401).json({
            msg: "Invalid password",
          });
        }
   
   const token = generateToken(existingUser)
    res.cookie('token', token,{
    httpOnly: true,
    secure:true,
    sameSite:'Strict'
   })
   return res.redirect('/api/contacts')
    next()
    } catch (err) {
        console.log(`Error login user : ${err}`)
        return res.render("/api/login",{
            err:"Invalid email or password!"
        })
    }
    
}

export default userLogin;