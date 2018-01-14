const through = require('through2')

// example.njk -> example.html
const rename = () => {
  return through.obj((vinylFile, encoding, callback) => {
    const transformedFile = vinylFile.clone()

    const newHistory = [transformedFile.history[0].replace('.njk', '.html')]
    Object.assign(transformedFile, { history: newHistory })

    callback(null, transformedFile)
  })
}

module.exports = rename
