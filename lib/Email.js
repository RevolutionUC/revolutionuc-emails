'use strict'

const fs = require('fs')
const juice = require('juice')
const Inky = require('inky').Inky
const cheerio = require('cheerio')
const nunjucks = require('nunjucks')
const htmlMinify = require('html-minifier').minify
const sass = require('node-sass')
const htmlToText = require('html-to-text')
const mailgun = require('mailgun-js')

class Email {
  /**
   * @param {string} mailgunApiKey
   * @param {string} mailgunDomain
   */
  constructor(mailgunApiKey, mailgunDomain) {
    this._mailgunApiKey = mailgunApiKey
    this._mailgunDomain = mailgunDomain
  }

  /**
   * Generates a fully built html email (as a string) and the plain text version with given template data
   *
   * no templateData param == marketing template output
   *
   * @param {string} templateName - which template to build
   * @param {object} templateData - data to pass to the template
   * @param {string} from - address to send from (optional)
   * @param {string} to - address to send to (optional)
   * @returns {Promise}
   */
  build(templateName, templateData, from, to) {
    return this.getTemplate(templateName)
        .then(data => {
          // compile the template into a single document with templating engine
          return this.compileTemplate(data, templateData)
        })
        .then(this.compileInky) // compiles the inky html-like syntax into html for email clients
        .then(this.compileSass) // compile sass to css and add it to the document as a style tag
        .then(this.inlineCss) // inline the resulting css (but leave media queries in the style tag)
        .then(this.minifyHtml) // minify the resulting document
        .then(data => {
          // build the plain text version
          const textOutput = htmlToText.fromString(data, { wordWrap: 100, ignoreImage: true })
          // return the html and text output
          return { html: data, text: textOutput }
        })
        .then(data => {
          if (from && to) {
            return this.sendMail(from, to, templateData.subject, data.text, data.html)
          }

          return data
        })
  }

  /**
   * Read a raw template
   *
   * @param {string} templateName - which template to build
   * @returns {Promise}
   */
  getTemplate(templateName) {
    return new Promise((resolve, reject) => {
      fs.readFile(`${__dirname + '/../templates/' + templateName}.njk`, 'utf8', (error, data) => {
        if (error) {
          reject(error)
        }

        resolve(data)
      })
    })
  }

  /**
   * Compiles the template into a single document with a templating engine
   *
   * @param {string} htmlSource
   * @param {object} templateData
   * @returns {string}
   */
  compileTemplate(htmlSource, templateData) {
    // if templateData, then use provided data
    // if no templateData, then output the variables
    return nunjucks.renderString(htmlSource, templateData)
  }

  /**
   * Compiles the inky html-like syntax into html ready for email clients
   *
   * @param {string} inkySource
   * @returns {string}
   */
  compileInky(inkySource) {
    const i = new Inky({}) // null
    const html = cheerio.load(inkySource)
    const convertedHtml = i.releaseTheKraken(html)

    // The return value is a Cheerio object. Get the string value with .toString()
    return convertedHtml.toString()
  }

  /**
   * Compiles sass in `templates/scss/main.scss` to css
   *
   * @param {string} htmlSource - the html source to add the css to
   * @param {string} stylesheetPath - path to the sass stylesheet
   * @returns {Promise}
   */
  compileSass(htmlSource, stylesheetPath = './templates/scss/main.scss') {
    return new Promise((resolve, reject) => {
      const html = cheerio.load(htmlSource)

      sass.render({ file: stylesheetPath }, (error, result) => {
        if (error) {
          reject(error)
        }

        // get the css as a string and add it to the cheerio document
        const css = result.css.toString()
        html('head').append(`<style type="text/css">${css}</style>`)

        resolve(html.html())
      })
    })
  }

  /**
   * Inlines external css
   *
   * @param {string} htmlSource
   * @returns {string}
   */
  inlineCss(htmlSource) {
    // TODO: change this to juice.juiceResources (https://github.com/Automattic/juice#methods)
    return juice(htmlSource, null)
  }

  /**
   * Minifies compiled html
   *
   * @param {string} htmlSource
   * @returns {string}
   */
  minifyHtml(htmlSource) {
    // https://github.com/kangax/html-minifier#options-quick-reference
    const options = {
      minifyCSS: true,
      collapseWhitespace: true
    }

    return htmlMinify(htmlSource, options)
  }

  /**
   * Sends an email via mailgun
   *
   * @param {string} from
   * @param {string} to
   * @param {string} subject
   * @param {string} text
   * @param {string} html
   * @returns {string}
   */
  sendMail(from, to, subject, text, html) {
    return new Promise((resolve, reject) => {
      const mg = mailgun({ apiKey: this._mailgunApiKey, domain: this._mailgunDomain })
      const data = { from, to, subject, text, html }

      mg.messages().send(data, (error, body) => {
        if (error) {
          reject(error)
        }

        resolve(body)
      })
    })
  }
}

module.exports = Email
