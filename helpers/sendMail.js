const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_API_KEY } = process.env
sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = async (data) => {
  try {
    const email = { ...data, from: 'boldv98@gmail.com' }
    await sgMail.send(email)
    console.log('Email success send')
    return true
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendMail
