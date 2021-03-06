var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var exec = require('child_process').exec;


var browserCompatibleOptions = [
  'last 3 version',
  'ie >= 8',
  'ios >= 6',
  'Android >= 4.3'
];

gulp.task('build-css', function () {
  var processors = [
    autoprefixer({browsers: browserCompatibleOptions})
  ];

  return gulp.src('./src/toast.css')
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'));
});


gulp.task('build-page-css', function () {
  return gulp.src('./views/index.less')
    .pipe(less())
    .pipe(gulp.dest('.'));
});


gulp.task('build-js', function() {
  exec('node ./build.js');
});


gulp.task('build', ['build-js', 'build-css', 'build-page-css'], function() {
  // 做一些事
  console.log('资源已重新打包');
});


/**
 * 开发中监控文件变动
 */
if (process.env.NODE_ENV === 'development') {
  const files = ['./src/*.*', './views/index.less', './views/index.tpl', './README.md', './package.json'];
  console.log('gulp is watching files: ', files);
  gulp.watch(files, ['build']);
}
