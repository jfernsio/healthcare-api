import express from "express";
// import { User } from "./models/userModel.js";
import fetch from "node-fetch";
import path from 'path'
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url';
import {connectToDb} from "./config/connection.js"
import verifyJwt from './middlewears/verifyJwt.js';
import { contactRouter } from "./routes/Contacts.js";
import registerRoute from './routes/register.js'
import loginRoute from "./routes/login.js";
import {reminderRoute} from "./routes/reminder.js"
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

const PORT = 4000;
connectToDb()
app.post('/api/save-location/v1',async (req, res) => {
    const { latitude, longitude} = req.body;
    console.log(`latitude : ${latitude} longitutde : ${longitude}`)
    var requestOptions = {
      method: "GET",
    };
 const response = await fetch(
    `https://api.geoapify.com/v2/places?categories=healthcare&filter=circle:${longitude},${latitude},5000&limit=20&apiKey=694a610f08f04488871e7b016f10d4ec`,
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

  res.sendFile(indexPath);
})
app.get('/api/reminder',verifyJwt,(req,res) =>{
  const indexPath = path.join(__dirname, 'public', 'reminder.html')

  res.sendFile(indexPath);
})

app.use('/api/create/user',registerRoute)
app.use('/api/login/user',loginRoute)
app.use('/create/contact', verifyJwt, contactRouter);
app.use('/api/get/contacts',verifyJwt,contactRouter)
app.use('/api/del/contact',verifyJwt,contactRouter)
app.use('/api/reminder', verifyJwt, reminderRoute);



app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    msg: "Internal server error",
  });
});



app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
