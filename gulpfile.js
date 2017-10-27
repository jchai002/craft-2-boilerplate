const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const size = require('gulp-size');

var stylesSrc = '_src/styles/';
var stylesDist = 'public/assets/css/';
var scriptsSrc = '_src/scripts/';
var scriptsDist = 'public/assets/js/';

gulp.task('build-css', function() {
	console.log('buidling css..');
	gulp
		.src(stylesSrc + 'main.scss')
		.pipe(bulkSass())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(
			autoprefixer({
				browsers: ['last 25 versions']
			})
		)
		.pipe(minify())
		.pipe(
			rename({
				basename: 'main',
				suffix: '.min'
			})
		)
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(stylesDist));
});

gulp.task('build-js', function() {
	gulp
		.src([
			scriptsSrc + 'core/jquery-2.0.0.js',
			scriptsSrc + 'core/jquery-easing.min.js',
			scriptsSrc + 'core/tether.min.js',
			scriptsSrc + 'core/bootstrap.min.js',
			scriptsSrc + 'vendor/**/*',
			scriptsSrc + 'modules/*/**',
			scriptsSrc + 'app.js'
		])
		.pipe(concat('main.js'))
		.pipe(
			babel({
				presets: ['env']
			})
		)
		.pipe(gulp.dest(scriptsDist))
		// create minified version for production use
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(scriptsDist))
		.pipe(size({ gzip: true, showFiles: true }));
});

gulp.task('watch', function() {
	gulp.watch(stylesSrc + '**/*.scss', ['build-css']);
	gulp.watch(scriptsSrc + '**/*', ['build-js']);
});

gulp.task('default', ['build-css', 'build-js', 'watch']);
