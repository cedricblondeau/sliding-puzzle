'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('html', function() {
    gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function () {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'app/css/main.scss'
    ])
        .pipe(concat('main.css'))
        .pipe(sass({
            precision: 10
        }).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
    browserify({
        entries: './app/js/main.jsx',
        debug: false
    })
        .transform([reactify, babelify])
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch-js', function () {
    var bundler = watchify(browserify('./app/js/main.jsx', watchify.args))
        .on('update', function () { util.log('Rebundling...'); })
        .on('time', function (time) {
            util.log('Rebundled in:', util.colors.cyan(time + 'ms'));
        });
    bundler.transform(reactify);
    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
            .on('error', function (err) {
                util.log(err);
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./dist/js'))
            .pipe(browserSync.reload({ stream: true }));
    }
    return rebundle();
});

gulp.task('serve', ['css', 'html', 'watch-js'], function() {
    browserSync({
        server: ['./dist']
    });
    gulp.watch(['app/index.html'], ['html', browserSync.reload]);
    gulp.watch(['app/css/**/*'], ['css', browserSync.reload]);
});

gulp.task('build', ['html', 'css', 'js']);

gulp.task('default', ['serve']);