import express from "express"
import{ createAppointReminder,getAppointReminder,deleteAppointReminder}from "../controllers/appointment.js"

const appointmentRouter = express.Router()


appointmentRouter.post('/',createAppointReminder)
appointmentRouter.get('/',getAppointReminder)
appointmentRouter.delete('/:appointmentId',deleteAppointReminder)
export default appointmentRouter; 
