import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const connectToDb = async () =>{
try {
   await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')
        } catch (error) {
            console.log('Error connecting to MongoDB:', error)
            process.exit(1)
            }
        }
        
export  {connectToDb};