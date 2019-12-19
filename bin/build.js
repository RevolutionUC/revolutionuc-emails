const gulp = require('gulp')
const buildTemplate = require('./util/buildTemplate')
const rename = require('./util/rename')
const removeFolder = require('./util/removeFolder')

// templates to build: all templates in './templates/' (except for master.njk)
const templates = ['./templates/*.njk']
const distFolder = './dist/'

// cleans out the `./dist` folder
gulp.task('clean', () => removeFolder(distFolder))

// builds out templates to './dist/'
// TODO: builld only the templates that have been modified
gulp.task('build', () => {
  gulp
    .src(templates)
    .pipe(buildTemplate())
    .pipe(rename())
    .pipe(gulp.dest(distFolder))
})

const start = gulp.series('clean', 'build')

start()
