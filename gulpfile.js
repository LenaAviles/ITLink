'use strict';

global.$ = {
  dev: true,
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  fs: require('fs'),
  browserSync: require('browser-sync').create(),
  sassGlob: require('gulp-sass-glob'),
  spritesmith: require('gulp.spritesmith'),
  buffer: require('vinyl-buffer'),
  merge: require('merge-stream'),
  babel : require('babelify'),
  cssunit: require('gulp-css-unit'),
  browserify : require('browserify'),
  source : require('vinyl-source-stream'),
  // phantomjssmith: require('phantomjssmith'),
  gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    // 'pug',
    'js:foundation',
    'js:process',
    'copy:image',
    'copy:fonts',
    'css:foundation',
    'sprite:svg',
    'sprite:png',
    'create:version'
  ),
  $.gulp.parallel(
    'nodemon'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));
