const fs = require(`fs`);
const path = require(`path`);
const util = require(`util`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const build = require("./lib/build");
const sendMail = require("./lib/send");

const app = express();

const port = process.env.PORT || 3001;

app.set("view engine", "ejs");

app.use(express.static(`dist`));

app.use(bodyParser.json());

app.get(`/`, async (req, res) => {
  try {
    const htmlFiles = await util.promisify(fs.readdir)(
      path.join(__dirname, `dist`)
    );
    const templates = htmlFiles.map((file) => ({
      file,
      name: file.replace(`.html`, ``),
    }));
    res.render(`index`, { templates });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get(`/build`, async (req, res) => {
  try {
    const { templateName, templateData } = req.body;
    const html = await build(templateName, templateData);
    res.json({ html });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post(`/send`, async (req, res) => {
  try {
    const { mailgunApiKey, mailgunDomain, from, to, subject, html } = req.body;
    const result = await sendMail(
      mailgunApiKey,
      mailgunDomain,
      from,
      to,
      subject,
      html
    );
    res.json({ result });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => console.log(`Listening on ${port}`));
