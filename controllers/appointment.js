import AppointmentReminder from "../models/appointmentModel.js";
import { appointmentReminder} from "../utils/mails.js"
const createAppointReminder = async (req, res) => {
  try {
    const { title, location, description, appointmentTime } = req.body;
    const { _id } = req.user;

    const newAppointment = new AppointmentReminder({
      title,
      description,
      notifyAt: appointmentTime,
      location,
      userId: _id,
    });
    const savedAppointment = await newAppointment.save();
    appointmentReminder(savedAppointment)
    res
      .status(201)
      .json({
        message: "Appointment reminder created successfully",
        data: savedAppointment,
      });
    console.log(`User reminder saved: ${savedAppointment.title}`);
  } catch (error) {
    console.log(`Error creating appointment reminder: ${error}`);
    return res
      .status(500)
      .json({ msg: `Error creating appointment reminder: ${error}` });
  }
};


const getAppointReminder = async (req, res) => {
  const {_id} = req.user
  try {
    const appointmentReminder = await AppointmentReminder.find({userId: _id})
    res.status(200).json(appointmentReminder)
  } catch (error) {
    res.status(500).json({message:error.message})
    console.log(`Error fetching reminders: ${error}`)
  }
}

const deleteAppointReminder = async (req, res) => {
  const {_id} = req.user
  const {appointmentId} = req.params
	console.log(req.body);
  try {
    const appointmentReminder = await AppointmentReminder.findOneAndDelete({
      userId: _id, 
      _id: appointmentId
    })
    
    if (!appointmentReminder) {
      return res.status(404).json({ message: "Appointment not found" })
    }
    
    res.status(200).json({ message: "Appointment deleted successfully" })
  } catch (error) {
    res.status(500).json({message: error})
    console.log(`Error deleting appointment reminder: ${error}`)
  }
}
export { createAppointReminder,getAppointReminder ,deleteAppointReminder};
