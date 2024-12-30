import { Users } from "../models/userModel.js";
import bcrypt from "bcrypt";
const createUser = async (req, res) => {
  const { name, email, password, age, height, weight, bloodType, gender } =
    req.body;
  console.log(req.body);
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser)
      return res.status(409).json({
        msg: "User already exists. Please login!",
      });
    else {
      const newuser = new Users({
        name,
        email,
        password,
        age,
        height,
        weight,
        bloodType,
        gender,
      });

      const hashedPassword = await bcrypt.hashSync(password,10)
      newuser.password = hashedPassword
      const saveUser = await newuser.save();
      console.log(`User saved succes ${saveUser}`);
      return res.status(201).json({
        msg: "user created succes",
      });
    }
  } catch (err) {
    console.log(`Error creating user : ${err.message}`);
    return res.status(500).json({ message: "Error registering user" });
  }
};

export default createUser;
