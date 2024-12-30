import mongoose, { Schema } from 'mongoose'

const appointmentReminderSchema = new mongoose.Schema({
    description: { type: String, required: true },
    notifyAt: { type: Date, required: true },
    location: { type: String }, // Optional location for appointments
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  }, { timestamps: true });
  
  const AppointmentReminder = mongoose.model('AppointmentReminder', appointmentReminderSchema);
  