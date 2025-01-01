import nodemailer from "nodemailer";
import schedule from "node-schedule";
import { Users } from '../models/userModel.js';
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // or 'STARTTLS'
  auth: {
    user: "aidrivenchatbot@gmail.com",
    pass: process.env.EMAI_AUTH_SECRET,
  },
});

const sendReminderEmail = async (reminder) => {
  try {
    const user = await Users.findById(reminder.userId);
    if (!user) {
      console.error('User not found');
      return;
    }

    const mailOptions = {
      from: 'aidrivenchatbot@gmail.com',
      to: user.email,
      subject: 'Reminder Notification',
      text: `Reminder: ${reminder.description}. Scheduled at: ${reminder.notifyAt}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

const handleRecurrence = async (reminder) => {
  try {
    if (reminder.frequency === 'daily') {
      reminder.notifyAt.setDate(reminder.notifyAt.getDate() + 1); // Add 1 day
    } else if (reminder.frequency === 'weekly') {
      reminder.notifyAt.setDate(reminder.notifyAt.getDate() + 7); // Add 1 week
    } else if (reminder.frequency === 'monthly') {
      reminder.notifyAt.setMonth(reminder.notifyAt.getMonth() + 1); // Add 1 month
    }

    await reminder.save();
    scheduleReminder(reminder);
  } catch (err) {
    console.error('Error handling recurrence:', err);
  }
};

const scheduleReminder = (reminder) => {
  const reminderTime = new Date(reminder.notifyAt);
  schedule.scheduleJob(reminderTime, async () => {
    await sendReminderEmail(reminder);
    await handleRecurrence(reminder);
  });
};

export default scheduleReminder;