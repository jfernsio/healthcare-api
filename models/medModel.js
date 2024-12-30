import mongoose, { Schema } from 'mongoose'

const medicineReminderSchema = new mongoose.Schema({
    description: { type: String, required: true },
    notifyAt: { type: Date, required: true },
    dosage: { type: String, required: true }, // Dosage for the medicine
    frequency: { 
      type: String, 
      enum: ['daily', 'weekly', 'monthly'], 
      default: 'daily' 
    }, // Medicine-specific recurrence
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  }, { timestamps: true });
  
  const MedicineReminder = mongoose.model('MedicineReminder', medicineReminderSchema);
  
  export default MedicineReminder;