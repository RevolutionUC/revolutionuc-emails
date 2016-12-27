'use strict'

require('dotenv').config()

const Email = require('../')
const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })

const subject = 'Welcome - Hello, world!'

const email = new Email()
email.build('welcome', { subject, shortDescription: 'Test message short description!' })
     .then(result => {
       const data = {
         from: 'RevolutionUC <info@revolutionuc.com>',
         to: 'you@example.com',
         subject: subject,
         text: result.text,
         html: result.html
       }

       mailgun.messages().send(data, (error, body) => {
         if (error) {
           throw new Error(error)
         }

         console.log(body)
       })
     })
     .catch(error => {
       throw new Error(error)
     })
