require("dotenv").config();

const mailgunApiKey = process.env.MAILGUN_API_KEY;
const mailgunDomain = process.env.MAILGUN_DOMAIN;
const from = "RevolutionUC <info@revolutionuc.com>";
const to = "you@mail.uc.edu";

const { build, send } = require("../");

const template = "welcome"; // choose from templates in `./templates/`
const templateData = {
  subject: "Welcome - Hello, world!",
  shortDescription: "Test message short description!",
};

build(template, templateData)
  .then((html) => {
    return send(
      mailgunApiKey,
      mailgunDomain,
      from,
      to,
      templateData.subject,
      html
    );
  })
  .then((res) => {
    console.log(res);
    console.log(`Sent to ${to}`);
  })
  .catch((error) => {
    console.error(error);
  });
