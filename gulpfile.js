'use strict';

// general
const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const gulpif = require('gulp-if');

// sass
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// javascript
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// misc
const sourcemaps = require('gulp-sourcemaps');

//////////////////////////////////////////////////
// Variables
//////////////////////////////////////////////////

let env = 'dev'; // environment flag (default to 'dev')

const srcDir = 'client-src';
const destDir = 'public';

const config = {
  cssSrcDir: srcDir + '/scss',
  jsSrcDir: srcDir + '/js',
};

//////////////////////////////////////////////////
// Primary Tasks
//////////////////////////////////////////////////

gulp.task('watch', ['build'], () => {
  gulp.watch(config.cssSrcDir + '/**/*.*', ['styles']);
  gulp.watch(config.jsSrcDir + '/**/*.*', ['scripts']);
});

gulp.task('build', (cb) => {
  runSequence('clean', ['styles', 'scripts'], cb);
});
gulp.task('deploy', (cb) => {
  env = 'prod';
  gulp.start('build');
});

gulp.task('clean', () => {
  return del([destDir]);
});

gulp.task('default', () => {
  console.log('Primary gulp tasks:');
  console.log('- gulp clean  = wipes public directory');
  console.log('- gulp build  = builds assets for a development environment');
  console.log('- gulp deploy = builds assets for a production environment');
  console.log('- gulp watch  = builds dev assets and rebuilds when source changes');
  console.log('');
});

//////////////////////////////////////////////////
// Task Details
//////////////////////////////////////////////////

gulp.task('styles', () => {
  const files = config.cssSrcDir + '/**/*.scss';

  const sassOptions = {
    outputStyle: (env === 'dev') ? 'nested' : 'compressed',
    includePaths: [
      config.cssSrcDir,
      'node_modules',
    ],
  };

  const autoprefixerOptions = {
    browsers: ['> 1%', 'last 2 versions'],
    cascade: true,
    remove: true,
  };

  return gulp.src(files)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulpif(env === 'dev', sourcemaps.write('maps')))
    .pipe(gulp.dest(destDir + '/css'));
});

gulp.task('scripts', () => {
  const files = [
    config.jsSrcDir + '/global.js',
    config.jsSrcDir + '/**/*.js',
  ];

  const uglifyOptions = {
    compress: {
      'drop_console': true,
    },
  };

  return gulp.src(files)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('am.js'))
    .pipe(gulpif(env === 'dev', sourcemaps.write('maps')))
    .pipe(gulpif(env === 'prod', uglify(uglifyOptions)))
    .on('error', err => { console.log(err); })
    .pipe(gulp.dest(destDir + '/js'));
});
