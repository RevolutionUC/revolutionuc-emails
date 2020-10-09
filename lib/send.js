const mailgun = require('mailgun-js')
const htmlToText = require('html-to-text')

const send = (mailgunApiKey, mailgunDomain, from, to, subject, html) => {
  // get the plain text version of the email
  const text = textConvert(html)

  return new Promise((resolve, reject) => {
    const mg = mailgun({ apiKey: mailgunApiKey, domain: mailgunDomain })
    const data = { from, to, subject, text, html }

    mg.messages().send(data, (error, body) => {
      if (error) {
        return
      }

      resolve(body)
    })
  })
}

const textConvert = (html) => {
  return htmlToText.fromString(html, { wordWrap: 80, ignoreImage: true })
}

module.exports = send
