'use strict'

const fs = require('fs-extra')
const path = require('path')
const httpServer = require('http-server')
const chokidar = require('chokidar')
const DistBuilder = require('../lib/DistBuilder')

// watch all the .njk files in templates/ and styles in templates/scss/
const watcher = chokidar.watch(['./templates/*.njk', './templates/scss/**/*.scss'])

// build all the templates to `./dist/`
watcher.on('ready', () => buildTemplates())

watcher.on('change', path => {
  console.info(`File ${path} changed...`)

  if (!path.includes('.njk')) {
    buildTemplates()
    return
  }

  // rebuild all templates if change is made to the master template
  if (path.includes('master.njk')) {
    buildTemplates()
    return
  }

  buildTemplate(path)
})

// start the http server
const server = httpServer.createServer({ root: './dist/', cache: -1 })
server.listen(8080)
console.info('File server working on http://localhost:8080')

/**
 * Builds all templates
 */
const buildTemplates = () => {
  console.info('Building all templates to `./dist/`')

  // remove `./dist/` before building the templates
  clearBuilds()

  const watched = watcher.getWatched() // gets an object with absolute path to templates as key
  const templates = watched[Object.keys(watched)[0]] // gets the value of the first key

  for (const template of templates) {
    buildTemplate(template)
  }
}

/**
 * @param {string} templatePath
 * @returns {void}
 */
const buildTemplate = (templatePath) => {
  // get the template name from path
  const templateName = path.basename(templatePath, '.njk')
  const builder = new DistBuilder()
  builder.saveBuild(templateName)
}

/**
 * Empty the `./dist/` directory
 *
 * @returns {void}
 */
const clearBuilds = () => {
  fs.emptyDirSync('./dist')
}
