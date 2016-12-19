# revolutionuc-email

[![MIT License](https://img.shields.io/github/license/revolutionuc/revolutionuc-email.svg?maxAge=2592000)]()
[![Dependencies Status](https://david-dm.org/revolutionuc/revolutionuc-email/status.svg)](https://david-dm.org/revolutionuc/revolutionuc-email)
[![Dependencies Status](https://david-dm.org/revolutionuc/revolutionuc-email/dev-status.svg)](https://david-dm.org/revolutionuc/revolutionuc-email?type=dev)

> Transactional and marketing email templates and builder for RevolutionUC

## Usage

Install the module as a dependency with `npm install --save revolutionuc-email`. Next, use the api to build emails:

### api

The api allows the creation of transactional emails:

```javascript
const Email = require('revolutionuc-email')

const email = new Email()
email.build(templateData)
```

### Marketing emails (templated)

The email builder allows templates to be built for marketing purposes (ex. MailChimp).

## Develop

Get started hacking on `revolutionuc-email` by:

```bash
git clone https://github.com/revolutionuc/revolutionuc-email.git
cd revolutionuc-email
npm install
```

## Tests

Run tests with `npm test`. Check code coverage with `npm run coverage`.
