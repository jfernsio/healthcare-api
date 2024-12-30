import  EmergencyContact from '../models/contactsModel.js'
const createContact = async (req, res) => {
    try {
        const {_id} = req.user
        const { phone, relation, name } = req.body
        const newContact = new EmergencyContact({
            userId: _id,
            phoneNumber:phone,
            relationship:relation,
            name
        })
        const savedContact = await newContact.save();
        console.log(savedContact)
        res.json({ msg: `User contact saved!! ${name} ${phone} ${relation}` })
    } catch (error) {
        res.status(500).json({ msg: 'Failed to save contact', error: error.message })
        console.log('error creating contact',error)
    }
}


const getContacts = async (req, res) => {
    try {
        const {_id} = req.user
        const contacts = await EmergencyContact.find({userId: _id})
        if(contacts.length > 0){
            res.json(contacts)
        } else {
            res.json({ msg: 'No emergency contact yet'})
        }
    } catch (error) {
        res.status(500).json({ msg: 'Failed to get contacts', error: error.message })
        console.log('error fetching contact',error)
    }
}

const deleteContact = async (req, res) => {
    try {
        const {_id} = req.user
        const { contactId } = req.params
        const contact = await EmergencyContact.findByIdAndDelete({userId: _id, _id: contactId})
        if(contact){
            res.json({ msg: 'Contact deleted successfully'})
        } else {
            res.status(404).json({ msg: 'Contact not found'})
        }
    } catch (error) {
        res.status(500).json({ msg: 'Failed to delete contact', error: error.message })
        console.log('error deleting contact',error)
    }
}
export {createContact,getContacts,deleteContact}
