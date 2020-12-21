const gulp = require('gulp')
const buildTemplate = require('./util/buildTemplate')
const rename = require('./util/rename')
const removeFolder = require('./util/removeFolder')

// templates to watch: all templates in './templates/' (except for master.njk)
const templates = ['./templates/*.njk']
const distFolder = './dist/'


// cleans out the `./dist` folder
gulp.task('clean', () => removeFolder(distFolder))

// builds out templates to './dist/'
// TODO: builld only the templates that have been modified
gulp.task('build', () => {
  return gulp
    .src(templates)
    .pipe(buildTemplate())
    .pipe(rename())
    .pipe(gulp.dest(distFolder))
})

// watch for any changes to the templates
gulp.task('watch', () => {
  return gulp.watch(templates, gulp.series('build'))
})

const start = gulp.series('clean', 'build', 'watch')

start()
