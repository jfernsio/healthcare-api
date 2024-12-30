const express = require('express');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reminderApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Reminder Schema
const reminderSchema = new mongoose.Schema({
  type: { type: String, default: 'appointment', required: true },
  description: { type: String, required: true },
  notifyAt: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

// Email Setup
const transporter = nodejsmailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // or 'STARTTLS'
  auth: {
    user: "aidrivenchatbot@gmail.com",
    pass: "koyksdbcploadtlc",
  },
});


const sendReminderEmail = (reminder) => {
  const mailOptions = {
    from: 'aidrivenchatbot@gmail.com',
    to: 'vashappnin107@gmail.com', // Replace with dynamic email
    subject: 'Reminder Notification',
    text: `Reminder: ${reminder.description}. Scheduled at: ${reminder.notifyAt}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error('Error sending email:', err);
    else console.log('Email sent:', info.response);
  });
};

// Schedule Email Notification
const scheduleNotification = (reminder) => {
  const reminderTime = new Date(reminder.notifyAt);
  schedule.scheduleJob(reminderTime, () => sendReminderEmail(reminder));
};

// API Endpoints
// Add Reminder
app.post('/reminders', async (req, res) => {
  try {
    const reminder = new Reminder(req.body);
    await reminder.save();
    scheduleNotification(reminder);
    res.status(201).json({ message: 'Reminder created!', reminder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Reminders
app.get('/reminders', async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Reminder
app.delete('/reminders/:id', async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);
    if (!reminder) return res.status(404).json({ message: 'Reminder not found!' });
    res.status(200).json({ message: 'Reminder deleted!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(3000, () => console.log('Server running on port 3000'));
