# revolutionuc-emails

[![MIT License](https://img.shields.io/github/license/revolutionuc/revolutionuc-emails.svg?maxAge=2592000)](LICENSE)
![stability-wip](https://img.shields.io/badge/stability-work_in_progress-yellow.svg)
[![Build Status](https://travis-ci.org/RevolutionUC/revolutionuc-emails.svg?branch=master)](https://travis-ci.org/RevolutionUC/revolutionuc-emails)
[![dependencies Status](https://david-dm.org/revolutionuc/revolutionuc-emails/status.svg)](https://david-dm.org/revolutionuc/revolutionuc-emails)
[![devDependencies Status](https://david-dm.org/revolutionuc/revolutionuc-emails/dev-status.svg)](https://david-dm.org/revolutionuc/revolutionuc-emails?type=dev)

> Transactional and marketing email templates and builder for RevolutionUC

## Usage

Install the module as a dependency with `npm install --save revolutionuc-emails`. Next, use the api to build emails:

### api

The api allows the creation of html and plain text based transactional emails (ex: Mailgun).

```javascript
const Email = require('revolutionuc-emails')

const email = new Email()
const template = 'welcome' // choose from templates in `./templates/`
const templateData = {
  subject: 'Email subject', // required
  shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' // required, this is shown next to the subject in most email clients
}
email.build(template, templateData)
  .then(result => {
    console.log(result.html, result.text) // html and plain text version of the email
  })
  .catch(console.error)
```

### Marketing emails (templated)

The email builder allows templates to be built ready with variable placeholders for marketing purposes (ex: MailChimp). To build an email ready for MailChimp, simply pass `null` for template data:

```javascript
email.build('welcome', null) // builds to `./dist/welcome.html` and `./dist/welcome.txt`
```

## Develop

Get started hacking on revolutionuc-emails by:

```bash
git clone https://github.com/revolutionuc/revolutionuc-emails.git
cd revolutionuc-emails
npm install
```

### Creating a new email template

[Nunjucks](https://github.com/mozilla/nunjucks) is the templating engine used for all templates.

Start by creating a new template in `templates/`. For example, a new template could be called `awesome.njk` which extends `master.njk`. An example template looks like:

```njk
{% extends 'templates/master.njk' %}

{% block body %}
<h1>My awesome template!</h1>
{% endblock %}
```

Then, to get a preview of your template, run `npm start`. This builds all templates to `./dist/` and runs a small file server to serve the html and plain text files. When a change is made to a templates, that template is rebuilt.

## The terrible truth about html emails

> The sad truth about creating or coding HTML emails is that tables are the only things that are universally supported when it comes to email design. If you came from the world of building websites, this may seem like a stepping into Doc Brown's Delorean, charging up the Flux-capitor, and going back to the 1996. Suddenly your CSS is written with inline style tags, useful CSS properties don't work and you're burried in a sea of table tags. General rule of thumb: your email is not going to look identical in every client. And that’s OK.
>
> -- [Zurb docs](http://foundation.zurb.com/emails/docs/tips-tricks.html#need-to-know) 

This project uses Zurb's [Inky](https://github.com/zurb/inky) library which allows us to write html5-like (inky) syntax and compile to old school html table based formats, so writing our email templates in a table format is not necessary!

## Tests

Run tests with `npm test`. Check code coverage with `npm run coverage`.
