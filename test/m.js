import nodejsmailer from "nodemailer";

const transporter = nodejsmailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // or 'STARTTLS'
  auth: {
    user: "aidrivenchatbot@gmail.com",
    pass: "koyksdbcploadtlc",
  },
});

const mailOptions = {
  from: "aidrivenchatbot@gmail.com",
  to: "carismageorge@gmail.com",
  subject: "Test Email",
  text: "mail has reached r0",
};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("Email sent: " + info.response);
  transporter.close();
});
