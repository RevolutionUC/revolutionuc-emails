'use strict'

const fs = require('fs')
const DistBuilder = require('../lib/DistBuilder')

const args = process.argv
let templateName = null

// check for `--template` flag
for(let i = 0; i < args.length; i++) {
  if (args[i] === '--template' && args[i + 1]) {
    templateName = args[i + 1]
    break;
  }
}

if (!templateName) {
  console.error('No template provided. Exiting...')
  process.exit()
}

console.info(`Building template '${templateName}'...`)

const builder = new DistBuilder()
builder.saveBuild('html', templateName)
