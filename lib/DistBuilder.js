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
      .then(htmlData => {
        console.info('Template built successfully. Saving to `./dist/`...')

        const distPath = './dist/'

        // check to see if `./dist/` needs to be created
        if (!fs.existsSync(distPath)) {
          fs.mkdirSync(distPath)
        }

        fs.writeFile(`${distPath}${templateName}.html`, htmlData, (error) => {
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
