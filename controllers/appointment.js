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

export { createAppointReminder };
