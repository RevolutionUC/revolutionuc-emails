const mailgun = require('mailgun-js')
const htmlToText = require('html-to-text')

/**
 * Sends an email with mailgun, returns a promise
 *
 * @param   {string} mailgunApiKey
 * @param   {string} mailgunDomain
 * @param   {string} from
 * @param   {string} to
 * @param   {string} subject
 * @param   {string} html
 * @returns {Promise}
 */
const send = (mailgunApiKey, mailgunDomain, from, to, subject, html) => {
  // get the plain text version of the email
  const text = textConvert(html)

  // send email with mailgun
  return new Promise((resolve, reject) => {
    const mg = mailgun({ apiKey: mailgunApiKey, domain: mailgunDomain })
    const data = { from, to, subject, text, html }

    mg.messages().send(data, (error, body) => {
      if (error) {
        reject(error)
        return
      }

      resolve(body)
    })
  })
}

/**
 * Converts html to plain text
 *
 * @param  {string} html
 * @return {string}
 */
const textConvert = (html) => {
  return htmlToText.fromString(html, { wordWrap: 80, ignoreImage: true })
}

module.exports = send
