import MedicineReminder from "../models/medModel.js";
import {scheduleReminder }from "../utils/mails.js";

const medReminder = async (req, res) => {
    try {
        const { description, dosage, notifyAt,frequency ,medicineName} = req.body;
        const { _id } = req.user;

        const newMed = new MedicineReminder({
            name: medicineName,
            description,
            notifyAt,
            dosage,
            frequency,
            userId: _id
        });

        const savedMed = await newMed.save();
        res.status(201).json(savedMed);
        console.log(`User  reminder saved : ${savedMed}`);
        scheduleReminder(savedMed);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(`Error creating reminder  : ${error}`);
    }
};

const getMedReminder = async (req, res) => {
    try {
        const { _id } = req.user;
        const medReminder = await MedicineReminder.find({ userId: _id });
        res.status(200).json(medReminder);
    } catch (error) {
        res.status(500).json({ message: error.message});
        console.log(`Error fetching reminders: ${error}`);
    }
}   

const deleteMedReminder = async (req, res) => {
    const {_id} = req.user
    const {medId} = req.params
    try {
        const medReminder = await MedicineReminder.findOneAndDelete({userId: _id, _id: medId})
        if (!medReminder) {
            return res.status(404).json({message: "Reminder not found"})
        }
        res.status(200).json({message: "Reminder deleted successfully"})
        console.log(`Reminder deleted: ${medReminder}`)
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(`Error deleting appointment reminder: ${error}`)
    }
}
export  {medReminder,getMedReminder,deleteMedReminder };
