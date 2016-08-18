var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');


var browserCompatibleOptions = [
  'last 2 version',
  'ie >= 9',
  'Android >= 4.3'
];

gulp.task('css', function () {
  var processors = [
    autoprefixer({browsers: browserCompatibleOptions})
  ];

  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'));
});