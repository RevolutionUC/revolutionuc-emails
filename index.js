'use strict'

const fs = require('fs')
const juice = require('juice')
const Inky = require('inky').Inky
const cheerio = require('cheerio')
const nunjucks = require('nunjucks')
const htmlMinify = require('html-minifier').minify

class Email {
  constructor() {}

  /**
   * Generates a fully built html email (as a string) with given template data
   *
   * no templateData param == marketing template output
   *
   * @param {object} templateData
   * @returns {Promise}
   */
  build(templateData) {
    return new Promise((resolve, reject) => {
      // get the raw template
      this.getTemplate()
        .then(data => {
          // compile the template into a single document with templating engine
          return this.compileTemplate(data, templateData)
        })
        .then(this.compileInky) // compiles the inky html-like syntax into html for email clients
        .then(data => {
          // compile sass to css
          return data
        })
        .then(this.inlineCss) // inline the resulting css (but leave media queries in the style tag)
        .then(this.minifyHtml) // minify the resulting document
        .then(resolve)
        .catch(reject)
    })
  }

  getTemplate() {
    return new Promise((resolve, reject) => {
      fs.readFile('./templates/master.njk', 'utf8', (error, data) => {
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
   * Compiles sass to css
   */
  compileSass() {}

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
}

module.exports = Email
