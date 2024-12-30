import nodejsmailer from "nodemailer";
import schedule from "node-schedule";
import {Users} from '../models/userModel.js'

const user = await Users.findById(reminder.userId);
if (!user) {
  console.error('User  not found');
  return;
}

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
    to: `${reminder.email}`, // Replace with dynamic email
    subject: 'Reminder Notification',
    text: `Reminder: ${reminder.description}. Scheduled at: ${reminder.notifyAt}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error('Error sending email:', err);
    else console.log('Email sent:', info.response);
  });
};

const handleRecurrence = (reminder) => {
  if (reminder.frequency === 'daily') {
    reminder.notifyAt.setDate(reminder.notifyAt.getDate() + 1); // Add 1 day
  } else if (reminder.frequency === 'weekly') {
    reminder.notifyAt.setDate(reminder.notifyAt.getDate() + 7); // Add 1 week
  } else if (reminder.frequency === 'monthly') {
    reminder.notifyAt.setMonth(reminder.notifyAt.getMonth() + 1); // Add 1 month
  }

  // Save the updated reminder and reschedule
  reminder.save().then(() => scheduleReminder(reminder));
};

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log("Email sent: " + info.response);
//   transporter.close();
// });

const reminderEmail = (reminder) => {
  const reminderTime = new Date(reminder.notifyAt)
  console.log('called')
  schedule.scheduleJob(reminderTime,()=>{
    sendReminderEmail(reminder);
    handleRecurrence(reminder);
  })
}


export default reminderEmail