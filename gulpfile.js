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

gulp.task('styles', function() {
    return gulp.src('<<css source files>>')
        .pipe(sass({'<<sass source files>>'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('<<django static dir>>'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('<<django static dir>>'))
        .pipe(notify({ message: 'Styles task complete.' }));
});

gulp.task('scripts', function() {
    return gulp.src('<<js source files>>')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('django static js dir'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('<<django static js dir>>'))
        .pipe(notify({ message: "Scripts task complete.' }));
});

gulp.task('images', function() {
    return gulp.src('<<image source files>>')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('<<django images dir>>'))
        .pipe(notify({ message: "Images task complete." }));
});

gulp.task('clean', function(cb) {
    del(['<<django static css dir>>', '<<django static js dir>>', '<<django static images dir>>'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
    gulp.watch('<<sass source files>>', ['styles']);
    gulp.watch('<<js source files>>', ['scripts']);
    gulp.watch('<<image source files>>', ['images']);
});
