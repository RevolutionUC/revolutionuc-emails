const path = require('path')
const through = require('through2')
const { build } = require('../../index')

const buildTemplate = () => {
  return through.obj((vinylFile, encoding, callback) => {
    const transformedFile = vinylFile.clone()

    // get the filename (remove path and file extension)
    const filename = path.basename(transformedFile.history[0], path.extname(transformedFile.history[0]))

    build(filename, {})
      .then(data => {
        Object.assign(transformedFile, { contents: new Buffer(data) })
        callback(null, transformedFile)
      })
      .catch(error => callback(JSON.stringify(error), null))
  })
}

module.exports = buildTemplate
