const formData = require("form-data");
const Mailgun = require("mailgun.js").default;
const mailgun = new Mailgun(formData);
const htmlToText = require("html-to-text");

/**
 * Sends an email with mailgun, returns a promise
 * @typedef {ReturnType<ReturnType<Mailgun.default["client"]>["messages"]["create"]>} MessagesSendResult
 *
 * @param   {string} mailgunApiKey
 * @param   {string} mailgunDomain
 * @param   {string} from
 * @param   {string} to
 * @param   {string} subject
 * @param   {string} html
 * @returns {MessagesSendResult}
 */
const sendMail = (mailgunApiKey, mailgunDomain, from, to, subject, html) => {
  // get the plain text version of the email
  const text = textConvert(html);

  // Initate Mailgun client with the API Key
  const mg = mailgun.client({
    username: "api",
    key: mailgunApiKey,
  });

  // send email with mailgun
  return new Promise((resolve, reject) => {
    const data = { from, to, subject, text, html };

    mg.messages
      .create(mailgunDomain, data)
      .then((msg) => resolve(msg))
      .catch((err) => reject(err));
  });
};

/**
 * Converts html to plain text
 *
 * @param  {string} html
 * @return {string}
 */
const textConvert = (html) => {
  return htmlToText.htmlToText(html, { wordWrap: 80, ignoreImage: true });
};

module.exports = sendMail;
