import mongoose from 'mongoose';

const medicineReminderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    notifyAt: { type: Date, required: true },
    dosage: { type: String, required: true },
    frequency: { 
      type: String, 
    enum: ['once', 'daily', 'weekly', 'monthly'], 
    default: 'daily'
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
}, { timestamps: true });

const MedicineReminder = mongoose.model('MedicineReminder', medicineReminderSchema);

export default MedicineReminder;