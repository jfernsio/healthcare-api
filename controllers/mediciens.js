import MedicineReminder from "../models/medModel";
import reminderEmail from "../utils/mails.js";
const medReminder = async (req, res) => {
    try {
        const { description, datetime, dosage, frequency } = req.body;
        const { _id } = req.user;

        const newMed = new MedicineReminder({
            description,
            notifyAt: datetime,
            dosage,
            frequency,
            userId: _id
        });

        const savedMed = await newMed.save();
        res.status(201).json(savedMed);
        console.log(`User reminder saved : ${savedMed}`)
        reminderEmail(savedMed);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(`Error creating reminder  : ${error.message}`)
    }
};

export default medReminder;