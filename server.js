const fs = require(`fs`);
const path = require(`path`);
const util = require(`util`);
const express = require(`express`);

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs')

app.use(express.static(`dist`));

app.get(`/`, async (req, res) => {
  const templates = await util.promisify(fs.readdir)(path.join(__dirname, `dist`));
  res.render(`index`, { templates })
});

app.listen(port, () => console.log(`Listening on ${port}`));
