# revolutionuc-email

[![MIT License](https://img.shields.io/github/license/revolutionuc/revolutionuc-email.svg?maxAge=2592000)]()
[![Dependencies Status](https://david-dm.org/revolutionuc/revolutionuc-email/status.svg)](https://david-dm.org/revolutionuc/revolutionuc-email)
[![Dependencies Status](https://david-dm.org/revolutionuc/revolutionuc-email/dev-status.svg)](https://david-dm.org/revolutionuc/revolutionuc-email?type=dev)

> Transactional and marketing email templates and builder for RevolutionUC

## Usage

Install the module as a dependency with `npm install --save revolutionuc-email`. Next, use the api to build emails:

### api

The api allows the creation of transactional emails (ex: Mailgun).

```javascript
const Email = require('revolutionuc-email')

const email = new Email()
email.build(templateData)
  .then(console.log)
  .catch(console.error)
```

### Marketing emails (templated)

The email builder allows templates to be built ready with variable placeholders for marketing purposes (ex: MailChimp).

## Develop

Get started hacking on `revolutionuc-email` by:

```bash
git clone https://github.com/revolutionuc/revolutionuc-email.git
cd revolutionuc-email
npm install
```

### Creating a new email template

[Nunjucks](https://github.com/mozilla/nunjucks) is the templating engine used for all templates.

Start by creating a new template in `templates/`. For example, a new template could be called `awesome.njk` which extends `master.njk`. An example template looks like:

```njk
{% extends 'master.njk' %}

{% block body %}
<h1>My awesome template!</h1>
{% endblock %}
```

## Tests

Run tests with `npm test`. Check code coverage with `npm run coverage`.
