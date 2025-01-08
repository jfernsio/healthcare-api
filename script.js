import express from "express";
// import { User } from "./models/userModel.js";
import fetch from "node-fetch";
import path from 'path'
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import {connectToDb} from "./config/connection.js"
import verifyJwt from './middlewears/verifyJwt.js';
import { contactRouter } from "./routes/Contacts.js";
import registerRoute from './routes/register.js'
import loginRoute from "./routes/login.js";
import getUserProfile from "./controllers/userProfile.js";
import getAppointmentHistory from './controllers/appointmentHistory.js';
import {reminderRoute} from "./routes/reminder.js"
import appointmentRouter from "./routes/appointment.js";
import cors from 'cors';

dotenv.config()
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));


const PORT = 4000;
connectToDb()
app.post('/api/save-location/v1',async (req, res) => {
    const { latitude, longitude, Option} = req.body;
    console.log(`latitude : ${latitude} longitutde : ${longitude} Option : ${Option}`)
    var requestOptions = {
      method: "GET",
    };
 const response = await fetch(
    `https://api.geoapify.com/v2/places?categories=healthcare.${Option}&filter=circle:${longitude},${latitude},5000&limit=15&apiKey=${process.env.GEOAPIFY_API_KEY}`,
    requestOptions
  )
    const data = await response.json();
    // console.log(data)
    res.json(data);

});

app.get('/api/save-location',(req,res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(indexPath);
})


app.get('/api/contacts',verifyJwt,(req,res) =>{
  const indexPath = path.join(__dirname, 'public', 'contacts.html')
  
  res.sendFile(indexPath);
})
app.get('/api/register',(req,res) =>{
  const indexPath = path.join(__dirname, 'public', 'register.html')

  res.sendFile(indexPath);
})
app.get('/api/login',(req,res) =>{
  const indexPath = path.join(__dirname, 'public', 'login.html')
  appointmentRouter
  res.sendFile(indexPath);
})
app.get('/api/reminder',verifyJwt,(req,res) =>{
  const indexPath = path.join(__dirname, 'public', 'reminder.html')

  res.sendFile(indexPath);
})
app.get('/api/appointment',verifyJwt,(req,res) =>{
  const indexPath = path.join(__dirname, 'public', 'appointment.html')
  res.sendFile(indexPath);
})
app.use('/api/create/user',registerRoute)
app.use('/api/login/user',loginRoute)

app.use('/create/contact', verifyJwt, contactRouter);
app.use('/api/get/contacts',verifyJwt,contactRouter)
app.use('/api/del/contact',verifyJwt,contactRouter)

app.use('/api/reminder', verifyJwt, reminderRoute);
app.use('/api/med/reminder',verifyJwt,reminderRoute)
app.use('/api/del/med/reminder',verifyJwt,reminderRoute)

app.use('/api/apt/reminder',verifyJwt,appointmentRouter)
app.use('/api/get/apt/reminder',verifyJwt,appointmentRouter)
app.use('/api/del/apt/reminder',verifyJwt,appointmentRouter)

app.use('/api/user/profile',verifyJwt,getUserProfile)
app.use('/api/appointments/history',verifyJwt,getAppointmentHistory)

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    msg: "Internal server error",
  });
});



app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
