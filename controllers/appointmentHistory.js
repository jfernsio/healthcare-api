import AppointmentReminder from '../models/appointmentModel.js'

const getAppointmentHistory = async (req, res) => {
  try {
    const { _id } = req.user;
    const appointments = await AppointmentReminder.find({ userId: _id })
      .sort({ notifyAt: -1 }); // Sort by date descending

    // Add status based on date
    const appointmentsWithStatus = appointments.map(apt => {
      const now = new Date();
      const aptDate = new Date(apt.notifyAt);
      const status = aptDate < now ? 'completed' : 'upcoming';
      return { ...apt.toObject(), status };
    });

    res.json(appointmentsWithStatus);
  } catch (error) {
    console.error('Error fetching appointment history:', error);
    res.status(500).json({ message: 'Error fetching appointment history' });
  }
};
export  default  getAppointmentHistory;
