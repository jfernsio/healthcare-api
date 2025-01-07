import express from 'express'
import {medReminder,getMedReminder,deleteMedReminder } from '../controllers/mediciens.js'
const reminderRoute = express.Router()


reminderRoute.post('/',medReminder)
reminderRoute.get('/',getMedReminder)
reminderRoute.delete('/:medId',deleteMedReminder)
export {reminderRoute} 
