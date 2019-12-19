const gulp = require('gulp')
const browserSync = require('browser-sync')
const buildTemplate = require('./util/buildTemplate')
const rename = require('./util/rename')
const removeFolder = require('./util/removeFolder')

const server = browserSync.create()

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
    .pipe(server.stream()) // update the browser sync stream
})

// serve on localhost:3000, watch for changes to templates, and update automagically with browser sync
gulp.task('serve', (done) => {
  server.init({ server: distFolder, directory: true, open: true })
  done()
})

// watch for any changes to the templates
gulp.task('watch', () => {
  return gulp.watch(templates, gulp.series('build'))
})

const start = gulp.series('clean', 'build', 'serve', 'watch')

start()
