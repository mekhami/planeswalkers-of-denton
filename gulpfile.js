var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename  = require('gulp-rename'),
    concat  = require('gulp-concat'),
    notify  = require('gulp-notify'),
    cache  = require('gulp-cache'),
    livereload  = require('gulp-livereload'),
    del  = require('del');

var css_source_files = "planeswalkers/static_source/css/**/*.css"
var sass_source_files = "planeswalkers/static_source/sass/**/*.scss"
var js_source_files = "planeswalkers/static_source/js/**/*.js"
var image_source_files = "planeswalkers/static_source/images/**/*"
var static_dest = 'planeswalkers/static/'

gulp.task('styles', function() {
    return gulp.src(css_source_files)
        .pipe(sass(sass_source_files))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(static_dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(static_dest))
        .pipe(notify({ message: 'Styles task complete.' }));
});

gulp.task('scripts', function() {
    return gulp.src(js_source_files)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(static_dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(static_dest))
        .pipe(notify({ message: "Scripts task complete.' }));
});

gulp.task('images', function() {
    return gulp.src(image_source_files)
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest(static_dest))
        .pipe(notify({ message: "Images task complete." }));
});

gulp.task('clean', function(cb) {
    del([static_dest], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
    gulp.watch(sass_source_files, ['styles']);
    gulp.watch(js_source_files, ['scripts']);
    gulp.watch(image_source_files, ['images']);
});
