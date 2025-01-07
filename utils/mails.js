import nodemailer from "nodemailer";
import schedule from "node-schedule";
import { Users } from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

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
      console.error("User not found");
      return;
    }

    const mailOptions = {
      from: "aidrivenchatbot@gmail.com",
      to: user.email,
      subject: `Medicine Reminder: ${reminder.name}`,
      text: `
    Hello ${user.name},
    
    This is a reminder for your scheduled medicine intake:
    
    - Medicine Name: ${reminder.name}
    - Dosage: ${reminder.dosage} mg
    - Scheduled Time: ${new Date(reminder.notifyAt).toLocaleString()}
    - Frequency: ${reminder.frequency || 'Once'}
    
    Please take your medicine as prescribed.
    
    Stay healthy!
    `,
    };
  
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

const appointmentReminderEmail = async (reminder) =>{
  try {
    const user = await Users.findById(reminder.userId);
    if (!user) {
      console.error("User not found");
      return;
    }

    const mailOptions = {
      from: "aidrivenchatbot@gmail.com",
      to: user.email,
      subject: `Appointment Reminder: ${reminder.title}`,
      text: `
    Hello,
    
    This is a reminder for your upcoming appointment:
    
    - Title: ${reminder.title}
    - Scheduled Date and Time: ${new Date(reminder.notifyAt).toLocaleString()}
    - Location: ${reminder.location}
    ${reminder.description ? `- Notes: ${reminder.description}` : ""}
    `,
    };
    await transporter.sendMail(mailOptions)
    console.log(`Email sent`)
  } catch (error) {
    console.log(`Error sending email: ${error}`);
  }
}

const handleRecurrence = async (reminder) => {
  try {
    if (reminder.frequency === "daily") {
      reminder.notifyAt.setDate(reminder.notifyAt.getDate() + 1); // Add 1 day
    } else if (reminder.frequency === "weekly") {
      reminder.notifyAt.setDate(reminder.notifyAt.getDate() + 7); // Add 1 week
    } else if (reminder.frequency === "monthly") {
      reminder.notifyAt.setMonth(reminder.notifyAt.getMonth() + 1); // Add 1 month
    }

    await reminder.save();
    scheduleReminder(reminder);
  } catch (err) {
    console.error("Error handling recurrence:", err);
  }
};

const scheduleReminder = (reminder) => {
  const reminderTime = new Date(reminder.notifyAt);
  schedule.scheduleJob(reminderTime, async () => {
    await sendReminderEmail(reminder);
    await handleRecurrence(reminder);
  });
};

const appointmentReminder = (reminder) => {
  const reminderTime = new Date(reminder.notifyAt);
  schedule.scheduleJob(reminderTime, async () => {
    await appointmentReminderEmail(reminder);
  
  });
}
export { appointmentReminder, scheduleReminder};
