'use strict'

const fs = require('fs')
const Email = require('../')

class DistBuilder {
  constructor() {}

  /**
   * Save a built template to ./dist/
   *
   * @param {string} templateName
   * @returns {Promise}
   */
  saveBuild(templateName) {
    const email = new Email()
    email.build(templateName, null)
      .then(data => {
        console.info('Template built successfully. Saving to `./dist/`...')

        const distPath = './dist/'

        // check to see if `./dist/` needs to be created
        if (!fs.existsSync(distPath)) {
          fs.mkdirSync(distPath)
        }

        // write html version
        fs.writeFile(`${distPath}${templateName}.html`, data.html, (error) => {
          if (error) {
            console.error(error)
            return
          }
        })

        // write plain text version
        fs.writeFile(`${distPath}${templateName}.txt`, data.text, (error) => {
          if (error) {
            console.error(error)
            return
          }
        })
      })
      .catch(console.error)
  }
}

module.exports = DistBuilder
