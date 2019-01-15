const fs = require('fs')
const path = require('path')
const heml = require('heml')
const nunjucks = require('nunjucks')
const htmlMinify = require('html-minifier').minify

/**
 * Builds out an email given the template name and data for the template
 *
 * @param   {string} templateName specifies the template to retrieve (ex: 'verifyEmail')
 * @param   {Object} templateData an object consisting of template data (ex: { 'name': 'Richard', 'verificationUrl': 'http://example.com/' })
 * @returns {Promise<string>}
 */
const build = async (templateName, templateData) => {
  const nunjuckTemplate = await getTemplate(templateName)
  const hemlHtml = await renderTemplate(nunjuckTemplate, templateData)
  const { html } = await renderHeml(hemlHtml)
  const minifiedHtml = minify(html)

  // TODO: Remove this hack when this change in heml is released: https://github.com/SparkPost/heml/commit/5845ee4b0c299e274d860b43722c9225de093565
  const badDoctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />'
  const goodDoctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
  const fixedHtml = minifiedHtml.replace(badDoctype, goodDoctype)

  return fixedHtml
}

/**
 * Reads a raw template from './templates/'
 *
 * @param   {string} templateName specifies the template to retrieve (ex: 'verifyEmail')
 * @returns {Promise<string>}
 */
const getTemplate = (templateName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname + '/../templates/' + templateName}.njk`, 'utf8', (error, data) => {
      if (error) {
        reject(error)
        return
      }

      resolve(data)
    })
  })
}

/**
 * Builds nunjuck templates, including injecting template data
 *
 * @param   {string} nunjuckTemplate
 * @param   {Object} templateData
 * @returns {Promise<string>}
 */
const renderTemplate = (nunjuckTemplate, templateData) => {
  return new Promise((resolve, reject) => {
    const dirname = path.resolve(`${__dirname}/../templates/`)
    const data = Object.assign({}, templateData, { dirname })

    nunjucks.renderString(nunjuckTemplate, data, (error, result) => {
      if (error) {
        throw new Error(error)
        reject()
      }

      resolve(result)
    })
  })
}

/**
 * Renders heml to old-school table html
 *
 * @param   {string} hemlHtml
 * @returns {Promise<string>}
 */
const renderHeml = async (hemlHtml) => {
  const options = {
    validate: 'soft', // validation levels - 'strict'|'soft'|'none'
    cheerio: {}, // config passed to cheerio parser
    juice: { applyWidthAttributes: false },
    beautify: {}, // config passed to js-beautify html method
    elements: [] // any custom elements you want to use
  }

  return await heml(hemlHtml, options)
}

/**
 * Minifies html
 *
 * @param   {string} html
 * @returns {string}
 */
const minify = (html) => {
  // https://github.com/kangax/html-minifier#options-quick-reference
  const options = { minifyCSS: true, collapseWhitespace: true }
  return htmlMinify(html, options)
}

module.exports = build
