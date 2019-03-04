require('dotenv').config()

// How to use:
//   Add mailgun domain and api key to `../.env`
//   Add info of the people you want to send to in a file called `./registrants.json`
//   Update template name that you want to use
//   Update the title and description that you want to use for the email
//   Send a test email
//   Do a dry run with all people from `./registrants.json`
//   Finally, uncomment "await sendMessage..." to send out the emails


const registrants = require('./registrants')

const mailgunApiKey = process.env.MAILGUN_API_KEY
const mailgunDomain = process.env.MAILGUN_DOMAIN
const from = 'RevolutionUC <info@revolutionuc.com>'

const { build, send } = require('../')

// choose from templates in `./templates/
const template = 'infoEmail3'
const title = 'RevolutionUC is Soon! 😀'
const description = `Here's the email description`

const sendMessage = (template, templateData, to) => {
    return new Promise((resolve, reject) => {
        build(template, templateData)
            .then(html => {
                return send(mailgunApiKey, mailgunDomain, from, to, templateData.subject, html)
            })
            .then(() => {
                resolve(`Sent to ${to}`)
            })
            .catch(error => {
                console.error(error)
                reject(error)
            })
    })
};

(async function loop() {
    let i = 0
    for (const registrant of registrants) {
        const emailVerified = registrant['emailVerfied']
        const fname = registrant['firstName']
        const email = registrant['email']

        if (emailVerified == true) {
            const to = email
            const templateData = {
                subject: title,
                shortDescription: description,
                firstName: fname
            }

            // uncomment to send out emails for real
            // await sendMessage(template, templateData, to)
            console.log(i, to, templateData)
            i += 1
        }
    }
})()
