import express from 'express'
import {createContact,getContacts,deleteContact} from '../controllers/contacts.js'
const contactRouter = express.Router()



contactRouter.post('/',createContact)
contactRouter.get('/',getContacts)
contactRouter.delete('/:contactId',deleteContact)
export {contactRouter}
