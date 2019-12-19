# revolutionuc-emails

[![MIT License](https://img.shields.io/github/license/revolutionuc/revolutionuc-emails.svg?maxAge=2592000)](LICENSE)
[![Build Status](https://travis-ci.org/RevolutionUC/revolutionuc-emails.svg?branch=master)](https://travis-ci.org/RevolutionUC/revolutionuc-emails)
[![GitHub tag](https://img.shields.io/github/tag/revolutionuc/revolutionuc-emails.svg)](https://github.com/revolutionuc/revolutionuc-emails/tags)
[![dependencies Status](https://david-dm.org/revolutionuc/revolutionuc-emails/status.svg)](https://david-dm.org/revolutionuc/revolutionuc-emails)
[![devDependencies Status](https://david-dm.org/revolutionuc/revolutionuc-emails/dev-status.svg)](https://david-dm.org/revolutionuc/revolutionuc-emails?type=dev)

> Transactional and marketing email templates and builder for RevolutionUC

__Table of Contents__

- [Usage](#usage)
  - [API](#api)
  - [Using Marketing Emails (templated)](#using-marketing-emails-templated)
  - [List of Available Templates](#list-of-available-templates)
- [Developing](#developing)
- [Creating and Modifying Email Templates / Styles](#creating-and-modifying-email-templates-/-styles)
- [Using an Email Template in Mailchimp](#using-an-email-template-in-mailchimp)
- [Using Mailchimp Variables (aka Merge Tags)](#using-mailchimp-variables-aka-merge-tags)
- [Known Issues](#known-issues)
- [The terrible truth about html emails](#the-terrible-truth-about-html-emails)
- [Tests](#tests)

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

### Using Marketing Emails (templated)

The email builder allows templates to be built ready with variable placeholders for marketing purposes (ex: MailChimp). To build an email ready for MailChimp, simply pass `null` for template data:

```javascript
const { build } = require('revolutionuc-emails')
const content = await build('welcome', null)
```

Or use `npm run develop-build` (or `npm run build`) to build to `./dist/`.

### List of Available Templates

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

## Developing

Get started hacking on revolutionuc-emails by:

```bash
git clone git@github.com:RevolutionUC/revolutionuc-emails.git
cd revolutionuc-emails
cp .env.example .env # replace with your api key and domain (mailgun.com to signup free - see below for other setup instructions)
npm install
npm run build # or `npm run develop-build` to watch
```

## Creating and Modifying Email Templates / Styles

A how-to guide for creating and modifying email templates: first, setup your environment:

### 1

Install [Node.js](https://nodejs.org/en/) (`brew install node` on macOS) and [git](https://git-scm.com/downloads) (`brew install git` on macOS). You'll need Node.js v8.0.0 or newer.

### 2

Clone and install dependencies (note: some dependencies may warn that they are deprecated, this is ok), then open in your favorite text editor:

```sh
$ git clone git@github.com:RevolutionUC/revolutionuc-emails.git
$ cd revolutionuc-emails
$ npm install
$ code .
```

### 3

Run develop-build for changes, then open your browser to [http://localhost:3000](http://localhost:3000) to preview templates:

```sh
$ npm run develop-build
# visit http://localhost:3000
```

### 4

With develop-build running, edit template files in `templates/` or edit styling in `templates/master.njk`, then check out the changes in your browser (auto-refreshed by BrowserSync!). To create a new template, just copy and existing template.

[Nunjucks](https://github.com/mozilla/nunjucks) is the templating engine used for all templates. Nunjucks is an extension of HTML. The HTML layout is written in [heml](https://heml.io/docs/getting-started/overview). heml converts high-level tags like `<row></row>` and `<column></column>` to old-school HTML tables so all email clients are able to render. See the heml docs to learn about working with layouts, buttons, etc.

Start by creating a new template in `templates/`. For example, a new template could be called `awesome.njk` which extends `master.njk`. An example template looks like:

```njk
{% extends './templates/master.njk' %}

{% block body %}
<h1>My awesome template!</h1>

<button href="http://revolutionuc.com/register/" target="_blank">Call to Action</button>
{% endblock %}
```

Note: the builder is inefficient (it rebuilds all templates even if just one template is modified), so expect builds to take 1-2 seconds.

### 5

Once your satisfied with the template changes. Stop develop-build, then run:

```sh
$ npm run build
```

<!-- Then, to get a preview of your template, run `npm run build`. This builds all templates to `./dist/` and runs a small file server to serve the html and plain text files. When a change is made to a templates, that template is rebuilt. -->

All templates are now in their final HTML form available in `dist/`. There, you can copy and paste the HTML into Mailchimp, the UC listserv, etc. See below for using Mailchimp variables for a personal touch in your emails.

## Using an Email Template in Mailchimp

If you're creating a new campaign, use [these steps](https://mailchimp.com/help/paste-in-html-to-create-a-campaign/) to paste the HTML from `npm run build`.

If you're creating a new template, use [these steps](https://mailchimp.com/help/import-a-custom-html-template/) to paste the HTML from `npm run build`.

## Using Mailchimp Variables (aka Merge Tags)

Mailchimp documentation: [https://mailchimp.com/help/all-the-merge-tags-cheat-sheet/](https://mailchimp.com/help/all-the-merge-tags-cheat-sheet/)

Use these merge tags, like `*|FNAME|*` and `*|LNAME|*`, when writing your templates for a personal touch when sending with Mailchimp.

## Known Issues

- When running `develop-build` and editing the `master.njk` template, the browser doesn't always reload with changes reflected. In this scenario, restart `develop-build`.

## The terrible truth about html emails

> The sad truth about creating or coding HTML emails is that tables are the only things that are universally supported when it comes to email design. If you came from the world of building websites, this may seem like a stepping into Doc Brown's Delorean, charging up the Flux-capitor, and going back to the 1996. Suddenly your CSS is written with inline style tags, useful CSS properties don't work and you're burried in a sea of table tags. General rule of thumb: your email is not going to look identical in every client. And that’s OK.
>
> -- [Zurb docs](http://foundation.zurb.com/emails/docs/tips-tricks.html#need-to-know) 

This project uses [heml](https://heml.io/docs/getting-started/overview) library which allows us to write html5-like syntax and compile to old-school html table based formats, so writing our email templates in a table format is not necessary!

## Tests

### Real email client tests

Get an api key from [Mailgun](https://www.mailgun.com/). Copy `.env.example` to `.env` with `cp .env.example .env`, place the Mailgun api key and domain in `.env`, specify an email address, template, and template data to send to in `bin/testEmail.js`, then run `node bin/testEmail.js` to send a test email.

### Unit tests

Run tests with `npm test`. Check code coverage with `npm run coverage`.
