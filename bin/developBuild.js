const gulp = require('gulp')
const browserSync = require('browser-sync').create()
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
  gulp
    .src(templates)
    .pipe(buildTemplate())
    .pipe(rename())
    .pipe(gulp.dest(distFolder))
    .pipe(browserSync.reload({ stream: true })) // update the browser sync stream
})

// serve on localhost:3000, watch for changes to templates, and update automagically with browser sync
gulp.task('serve', ['build'], () => {
  browserSync.init({ server: distFolder, directory: true, open: false })
  gulp.watch(templates, ['build'])
})

gulp.start(['clean', 'build', 'serve'])
