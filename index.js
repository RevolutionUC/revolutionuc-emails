'use strict'

const fs = require('fs')
const juice = require('juice')
const Inky = require('inky').Inky
const cheerio = require('cheerio')
const htmlMinify = require('html-minifier').minify

class Email {
  constructor() {}

  /**
   * Generates a fully built html email with given template data
   *
   * no templateData param == marketing template output
   */
  build(templateData) {
    return new Promise((resolve, reject) => {
      // get the raw template
      this.getTemplate()
        .then(data => {
          // compile the template into a single document with templating engine
            // if templateData, then use provided data
            // if no templateData, then output the variables
          return data
        })
        .then(data => {
          // compiles the inky html-like syntax into html for email clients
          return this.compileInky(data)
        })
        .then(data => {
          // compile sass to css
          return data
        })
        .then(data => {
          // inline the resulting css (but leave media queries in the style tag)
          return this.inlineCss(data)
        })
        .then(data => {
          resolve(this.minifyHtml(data))
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  getTemplate() {
    return new Promise((resolve, reject) => {
      fs.readFile('./templates/inky.html', 'utf8', (error, data) => {
        if (error) {
          reject(error)
        }

        resolve(data)
      })
    })
  }

  /**
   * Compiles the template into a single document with a templating engine
   */
  compileTemplate() {}

  /**
   * Compiles the inky html-like syntax into html ready for email clients
   *
   * @param {string} inkySource
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
