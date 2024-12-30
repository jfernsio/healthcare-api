import express from 'express';
import createUser from '../controllers/register.js'

const registerRoute = express.Router();



registerRoute.post('/', createUser);

export default registerRoute;