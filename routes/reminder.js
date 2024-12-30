import express from 'express'
import reminderEmail from '../utils/mails.js'
const reminderRoute = express.Router()

reminderRoute.post('/',(req,res) =>{
    const {description,datetime,email} = req.body
    const reminder =  {
        description,
        email,
        notifyAt: datetime,
    }
    console.log(reminder)
    reminderEmail(reminder)
    res.send('sent')
})

export {reminderRoute} 