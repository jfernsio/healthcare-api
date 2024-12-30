import express from 'express'
import userLogin from '../controllers/login.js'

const loginRoute = express.Router()

loginRoute.post('/',userLogin)

export default loginRoute;  