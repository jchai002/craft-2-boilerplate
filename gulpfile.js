var gulp = require('gulp'),
	sass = require('gulp-sass'),
	bulkSass = require('gulp-sass-bulk-import'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCss = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	size = require('gulp-size');

var scssSource = '_src/styles/';
var cssDest = 'public/assets/css/';
var jsSource = '_src/scripts/';
var jsDest = 'public/assets/js/';

gulp.task('build-css', function() {
	console.log('buidling css..');
	gulp
		.src(scssSource + 'manifest.scss')
		.pipe(bulkSass())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(
			autoprefixer({
				browsers: ['last 25 versions']
			})
		)
		.pipe(cleanCss())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(cssDest));
});

gulp.task('build-js', function() {
	gulp
		.src([
			jsSource + 'core/jquery-3.0.0.js',
			jsSource + 'core/tether.min.js',
			jsSource + 'core/bootstrap.min.js',
			jsSource + 'vendor/**/*',
			jsSource + 'modules/**/*',
			jsSource + 'app.js'
		])
		.pipe(concat('main.js'))
		.pipe(gulp.dest(jsDest))
		// create minified version for production use
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(jsDest))
		.pipe(size({ gzip: true, showFiles: true }));
});

gulp.task('watch', function() {
	gulp.watch(scssSource + '**/*.scss', ['build-css']);
	gulp.watch(jsSource + '**/*', ['build-js']);
});

gulp.task('default', ['build-css', 'build-js', 'watch']);
