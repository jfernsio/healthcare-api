

import dotenv from 'dotenv'
dotenv.config()

const signup = async (email) =>{
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.EMAIL_VERIFY_API_SECRET}&email=${email}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        console.log(data.is_free_email.value)
        if(!data.is_free_email.value || data.is_disposable_email.value === true) return console.log('not a valid email')
    } catch (error) {
        console.log(error)
    }
}

signup("vashappnin107@gmail.com")