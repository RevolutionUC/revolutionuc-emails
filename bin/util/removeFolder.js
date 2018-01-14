const fs = require('fs')
const path = require('path')

/**
 * Remove all files and folders in the given folder
 *
 * @param   {string} folderPath
 * @returns {Promise}
 */
const removeFolder = (folderPath) => {
  return new Promise((resolve, reject) => {
    const cwd = __dirname
    const distPath = path.resolve(__dirname, '../../', folderPath)

    fs.readdir(distPath, (error, items) => {
      if (!items) {
        resolve()
        return
      }

      const itemPaths = items.map(item => path.resolve(__dirname, '../../', folderPath, item))
      const promises = itemPaths.map(removeItem)

      Promise.all(promises)
        .then(() => resolve())
        .catch(error => reject(error))
    })
  })
}

const removeItem = (itemPath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(itemPath, (error) => {
      if (error) {
        reject(error)
        return
      }

      resolve()
    })
  })
}

module.exports = removeFolder
