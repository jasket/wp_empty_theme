const gulp = require('gulp');
const webpack = require('webpack-stream');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus');
const path = require('path');

const build = path.join(__dirname, './build');
const buildWP = path.join(process.env.WP_PATH, `./wp-content/themes/${process.env.WP_NAME || 'wp_empty_theme'}`);
const buildJs = path.join(build, 'js');

gulp.task('copy:assets', function buildHTML() {
  return gulp.src('assets/**/*').pipe(gulp.dest(build));
});

gulp.task('copy:build', function buildHTML() {
  return gulp.src('build/**/*').pipe(gulp.dest(buildWP));
});

gulp.task('babel:app', function() {
  return gulp
    .src([ 'src/*.js' ])
    .pipe(plumber())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(buildJs));
});

gulp.task('styl:main', function buildHTML() {
  return gulp.src('src/*.styl')
    .pipe(plumber())
    .pipe(stylus({'include css': true}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(build));
});

gulp.task('watch:js', function() {
  return gulp.watch([ 'src/**/*.js' ], gulp.series('babel:app', 'copy:build'));
});

gulp.task('watch:styl', function() {
  return gulp.watch([ '**/*.styl', '!node_modules/' ], gulp.series('styl:main', 'copy:build'));
});

gulp.task('watch:assets', function() {
  return gulp.watch([ 'assets/**/*' ], gulp.series('copy:assets', 'copy:build'));
});

gulp.task(
  'default',
  gulp.series(
    gulp.parallel(
      'copy:assets',
      'styl:main',
      'babel:app',
    ),

    'copy:build',

    gulp.parallel(
      'watch:js',
      'watch:styl',
      'watch:assets',
    ),
  )
);
