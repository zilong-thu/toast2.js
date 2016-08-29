var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');


var browserCompatibleOptions = [
  'last 3 version',
  'ie >= 8',
  'ios >= 6',
  'Android >= 4.3'
];

gulp.task('css', function () {
  var processors = [
    autoprefixer({browsers: browserCompatibleOptions})
  ];

  return gulp.src('./src/toast.css')
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'));
});