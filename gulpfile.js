const gulp = require('gulp');
const {dest, src} = require('gulp');

// * html
const htmlmin = require('gulp-htmlmin')

// * css
const sass = require("gulp-sass")(require("sass"));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

// * для очистки папки
const del = require("del");

const browserSync = require('browser-sync');

const fileinclude = require('gulp-file-include');

// ! to concat htmlfiles

function html (){
	return src(['./src/**/*.html', '!' + './src/parts/*.html'])
		.pipe(fileinclude({
			prefix: '@@',
		}))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(dest('./dist')) 
}

// ! compile sass file to css

function scss (){
	return src('./src/scss/*.+(scss|sass)')
		.pipe(sass())
		.pipe(concat('index.css'))
		.pipe(rename({suffix: '.min', prefix: ''}))
		.pipe(autoprefixer())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(dest('./dist'))
		.pipe(browserSync.stream());
}

function js(){
	return src('./src/js/*.js')
		.pipe(fileinclude())
		.pipe(dest('./dist/'))
		.pipe(browserSync.stream());
}

function copyFonts() {
	return src('./src/fonts/**/*.{ttf,woff,eof,svg}')
	.pipe(gulp.dest('./dist/fonts'));
 }

//* для очистки папку дист
function clean(){
	return del('./dist');
}

// * copy data 
function copyAssets(){
	return gulp.src("./src/assets/**/*.*")
		.pipe(dest("dist/assets"))
		.pipe(browserSync.stream())
}

function server(){
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
		port: 7777,
		notify: true
	})
}

// * для слежки с изменениями
function watch(){
	// gulp.watch('src/js/**/*.js', gulp.parallel(js));
	gulp.watch("src/scss/**/*.(scss|sass)", gulp.parallel(scss));
	gulp.watch("src/assets/**/*.*)", gulp.parallel(copyAssets));
	gulp.watch("src/js/*.js)", gulp.parallel(js));
	gulp.watch('src/**/*.html', gulp.parallel(html)).on("change", browserSync.reload);
}

gulp.task('default',	gulp.series(clean,copyAssets,copyFonts, gulp.parallel(watch, html, js, scss, server)))


exports.html = html;
exports.scss = scss;

