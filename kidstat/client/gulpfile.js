var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var watchify = require('watchify');

var notifier = require('node-notifier');


var notify = function (error) {
    var message = 'In: ';
    var title = 'Error: ';
    console.log(error);
    if (error.description) {
        title += error.description;
    }
    else if (error.message) {
        title += error.message;
    }

    if (error.filename) {
        var file = error.filename.split('/');
        message += file[file.length - 1];
    }

    if (error.lineNumber) {
        message += '\nOn Line: ' + error.lineNumber;
    }

    notifier.notify({title: title, message: message});
};

var bundler = watchify(browserify({
    entries: ['./src/app.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    // external: ['react', 'react-dom', 'react-bootstrap', 'reflux'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}));

function bundle() {
    return bundler
        .bundle()
        .on('error', notify)
        .pipe(source('kidstat.js'))
        .pipe(gulp.dest('../static/js/'))
}
bundler.on('update', bundle);

gulp.task('build', function () {
    bundle()
});


// TODO: add "test" task
// gulp.task('test', function () {
//     return 
// })

gulp.task('default', ['build']);
