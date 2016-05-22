var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var concat = require('gulp-concat');




function build(){
    return browserify({
  entries: ['./src/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  external: ['react'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true})
        .bundle()
        .pipe(source('kidstat.js'))
        .pipe(gulp.dest('../static/js/'))
}

gulp.task('build', build);

// var watchify = require('watchify');
// var notifier = require('node-notifier');
// var gutil = require('gulp-util');
// var notify = function(error) {
//   var message = 'In: ';
//   var title = 'Error: ';
//   console.log(error);
//   if(error.description) {
//     title += error.description;
//   } else if (error.message) {
//     title += error.message;
//   }
//
//   if(error.filename) {
//     var file = error.filename.split('/');
//     message += file[file.length-1];
//   }
//
//   if(error.lineNumber) {
//     message += '\nOn Line: ' + error.lineNumber;
//   }
//
//   notifier.notify({title: title, message: message});
// };
//
// var bundler = watchify(browserify({
//   entries: ['./src/app.jsx'],
//   transform: [reactify],
//   extensions: ['.jsx'],
//   // external: ['react', 'reflux', 'react-bootstrap'],
//   debug: true,
//   cache: {},
//   packageCache: {},
//   fullPaths: true
// }));
//
// function bundle() {
//     gutil.log('Rebundle...');
//   return bundler
//     .bundle()
//     .on('error', notify)
//     .pipe(source('kidstat.js'))
//     .pipe(gulp.dest('../static/js/'))
// }
// bundler.on('update', bundle);
//
// gulp.task('build', function() {
//   bundle()
// });
//
// gulp.task('default', ['build']);