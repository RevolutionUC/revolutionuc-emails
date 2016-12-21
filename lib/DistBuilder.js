'use strict'

const fs = require('fs')
const Email = require('../')

class DistBuilder {
  constructor() {}

  /**
   * Save a built template to ./dist/
   *
   * @param {string} outputType
   * @param {string} templateName
   * @returns {Promise}
   */
  saveBuild(outputType, templateName) {
    const email = new Email()
    email.build(outputType, templateName, null)
      .then(data => {
        console.info('Template built successfully. Saving to `./dist/`...')

        const distPath = './dist/'

        // check to see if `./dist/` needs to be created
        if (!fs.existsSync(distPath)) {
          fs.mkdirSync(distPath)
        }

        fs.writeFile(`${distPath}${templateName}.html`, data, (error) => {
          if (error) {
            console.error(error)
            return;
          }
        })
      })
      .catch(console.error)
  }
}

module.exports = DistBuilder
