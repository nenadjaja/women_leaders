var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var babelify = require('babelify');

// error handler (so when errors happen, gulp watch won't crash)
function handleError(error) {
	console.log("Errors: " + error.toString());
	this.emit('end');
}

// client javascript
gulp.task('client_js', function() {
	browserify('./public/javascripts/main.js')
		.transform(reactify)
		.bundle()
		.on('error', handleError)
		.pipe(source('main.js'))
		.pipe(gulp.dest('./public/build'));
});

// stylesheet
gulp.task('styles', function() {
	gulp.src(['./public/stylesheets/main.scss'])
			.pipe(sass())
			.on('error', handleError)
			.pipe(gulp.dest('./public/build'))
});

gulp.task('watch', function() {
	gulp.watch('./public/javascripts/**/*', ['client_js']);
	gulp.watch('./public/stylesheets/*', ['styles']);
});

gulp.task('default', ['watch', 'client_js', 'styles']);