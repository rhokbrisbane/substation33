var gulp        = require('gulp');
var runSequence = require('run-sequence');
var es          = require('event-stream');

var $ = require('gulp-load-plugins')({
  camelize: true
});

var config = {
  dist: 'build/',
  appName: 'app'
};

gulp.task('usemin', function () {
  return gulp.src('./app/index.html')
    .pipe($.spa.html({
      assetsDir: 'app/',
      pipelines: {
        main: function (files) {
          return files.pipe($.minifyHtml({
            quotes: true
          }));
        },
        js: function (files) {

          var jsFiles = function () {
            return gulp.src('./app/assets/js/**/*.js')
              .pipe($.ngmin())
          };

          var angularTemplates = function () {
            return gulp.src('./app/assets/partials/**/*.html')
              .pipe($.minifyHtml({
                quotes: true
              }))
              .pipe($.angularTemplatecache({
                root: 'assets/partials/',
                module: config.appName // has to be the name of angular app
              }));
          };

          return es.concat(jsFiles(), angularTemplates())
            .pipe($.concat('app.js'))
            .pipe($.uglify())
            .pipe($.rev());

        },
        css: function (files) {
          return files
            .pipe($.minifyCss())
            .pipe($.concat('app.css'))
            .pipe($.rev());
        },
        vendor: function (files) {
          return files
            .pipe($.concat('vendor.js'))
            .pipe($.uglify())
            .pipe($.rev());
        }
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('connect', function () {
  $.connect.server({
    root: './app',
    livereload: true
  });
});

gulp.task('minify-html', function () {
  return gulp.src(config.dist + 'index.html')
    .pipe($.minifyHtml({
      empty: true,
      quotes: true
    }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe($.connect.reload());
});

gulp.task('scripts', function () {
  return gulp.src('app/assets/js/*.js')
    .pipe($.connect.reload());
});

gulp.task('css', function () {
  return gulp.src('app/assets/css/*.css')
    .pipe($.connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.html', './app/assets/partials/**/*.html'], ['html']);
  gulp.watch(['./app/assets/js/**/*.js'], ['scripts']);
  gulp.watch(['./app/assets/css/**/*.css'], ['css']);
});

gulp.task('clean', function () {
  return gulp.src(config.dist, {
    read: false
  }).pipe($.clean());
});

gulp.task('bower', function () {

  var filter = $.filter(['**/*.js']);

  var config = {
    starttag: 'files: [',
    endtag: ']',
    addRootSlash: false,
    transform: function (filepath, file, i, length) {
      return '  "' + filepath + '"' + (i + 1 < length ? ', \n' : '');
    }
  };

});

gulp.task('build', function () {

  runSequence(
    'clean',
    'usemin',
    function () {
      $.util.log('Build complete');
    });
});

gulp.task('default', ['connect', 'watch']);
gulp.task('serve', ['connect', 'watch']);
