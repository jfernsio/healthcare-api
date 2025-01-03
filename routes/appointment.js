import express from "express"
import{ createAppointReminder}from "../controllers/appointment.js"

const appointmentRouter = express.Router()


appointmentRouter.post('/',createAppointReminder)


export default appointmentRouter; 