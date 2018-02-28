# revolutionuc-emails

[![MIT License](https://img.shields.io/github/license/revolutionuc/revolutionuc-emails.svg?maxAge=2592000)](LICENSE)
[![Build Status](https://travis-ci.org/RevolutionUC/revolutionuc-emails.svg?branch=master)](https://travis-ci.org/RevolutionUC/revolutionuc-emails)
[![GitHub tag](https://img.shields.io/github/tag/revolutionuc/revolutionuc-emails.svg)](https://github.com/revolutionuc/revolutionuc-emails/tags)
[![dependencies Status](https://david-dm.org/revolutionuc/revolutionuc-emails/status.svg)](https://david-dm.org/revolutionuc/revolutionuc-emails)
[![devDependencies Status](https://david-dm.org/revolutionuc/revolutionuc-emails/dev-status.svg)](https://david-dm.org/revolutionuc/revolutionuc-emails?type=dev)

> Transactional and marketing email templates and builder for RevolutionUC

## Usage

Install the module as a dependency with `npm install --save github:revolutionuc/revolutionuc-emails`. Next, use the api to build emails:

### API

The API allows the creation of html and plain text based transactional emails (ex: Mailgun).

```javascript
const { build } = require('revolutionuc-emails')
const template = 'welcome' // choose from templates in `./templates/`
const templateData = {
  subject: 'Email subject', // required
  shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' // required (this is shown next to the subject in most email clients)
}
const html = await build(template, templateData) // returns minified html
```

or to send the email with Mailgun:

```javascript
const { build, send } = require('revolutionuc-emails')
// ...
const html = await build(template, templateData)
await send(mailgunApiKey, mailgunDomain, 'RevolutionUC <info@revolutionuc.com>', 'you@example.com', templateData.subject, html)
  // or use a promise:
  // send(mailgunApiKey, mailgunDomain, 'RevolutionUC <info@revolutionuc.com>', 'you@example.com', templateData.subject, html)
    // .then(() => console.log('Done'))
    // .catch(console.error)
```

Another example with a `verifyEmail` template:

```javascript
TODO
```

### Marketing emails (templated)

The email builder allows templates to be built ready with variable placeholders for marketing purposes (ex: MailChimp). To build an email ready for MailChimp, simply pass `null` for template data:

```javascript
const { build } = require('revolutionuc-emails')
const content = await build('welcome', null)
```

Or use `npm run develop-build` to build to `./dist/`.

### Available templates

All templates take a `subject` and `shortDescription` template variables by default. In addition, each template has its own variables:

#### `confirmAttendance`

  - `firstName` (the user's first name)
  - `yesConfirmationUrl` (confirmation url for a "yes" response)
  - `noConfirmationUrl` (confirmation url for a "no" response)
  - `offWaitlist` (boolean - whether to notify the user that they have been moved off the waitlist)

#### `confirmAttendanceFollowUp`

  - `firstName` (the user's first name)

#### `infoEmail1`

  - `firstName` (the user's first name)

#### `infoEmail3`

  - `firstName` (the user's first name)

#### `infoEmailMinors`

  - `firstName` (the user's first name)

#### `general`

  - body (text)

#### `registrationOpen`

  - `firstName` (the user's first name)

#### `verifyEmail`

  - `firstName` (the user's first name)
  - `verificationUrl` (a url)
  - `waitlist` (boolean: whether or not to display the waitlist text to the user)

#### `welcome`

*No additional variables*

## Develop

Get started hacking on revolutionuc-emails by:

```bash
git clone https://github.com/revolutionuc/revolutionuc-emails.git
cd revolutionuc-emails
cp .env.example .env # replace with your api key and domain (mailgun.com to signup free - see below for other setup instructions)
npm install
npm start
```

### Creating a new email template

[Nunjucks](https://github.com/mozilla/nunjucks) is the templating engine used for all templates.

Start by creating a new template in `templates/`. For example, a new template could be called `awesome.njk` which extends `master.njk`. An example template looks like:

```njk
{% extends './templates/master.njk' %}

{% block body %}
<h1>My awesome template!</h1>
{% endblock %}
```

Then, to get a preview of your template, run `npm start`. This builds all templates to `./dist/` and runs a small file server to serve the html and plain text files. When a change is made to a templates, that template is rebuilt.

## The terrible truth about html emails

> The sad truth about creating or coding HTML emails is that tables are the only things that are universally supported when it comes to email design. If you came from the world of building websites, this may seem like a stepping into Doc Brown's Delorean, charging up the Flux-capitor, and going back to the 1996. Suddenly your CSS is written with inline style tags, useful CSS properties don't work and you're burried in a sea of table tags. General rule of thumb: your email is not going to look identical in every client. And that’s OK.
>
> -- [Zurb docs](http://foundation.zurb.com/emails/docs/tips-tricks.html#need-to-know) 

This project uses [MJML](https://mjml.io/) library which allows us to write html5-like syntax and compile to old-school html table based formats, so writing our email templates in a table format is not necessary!

## Tests

### Real email client tests

Get an api key from [Mailgun](https://www.mailgun.com/). Copy `.env.example` to `.env` with `cp .env.example .env`, place the Mailgun api key and domain in `.env`, specify an email address, template, and template data to send to in `bin/testEmail.js`, then run `node bin/testEmail.js` to send a test email.

### Unit tests

Run tests with `npm test`. Check code coverage with `npm run coverage`.
