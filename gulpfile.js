var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest("js"))
    .pipe(browserSync.stream());
});

gulp.task('minify-css', () => {
     return gulp.src('css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('css'));
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'scss/*.scss'], gulp.series('sass'));
  gulp.watch('css/*.css', function(evt) {
  gulp.task('minify-css');
  });
  gulp.watch("*.html").on('change', browserSync.reload);
}));

gulp.task("default", gulp.series("js", "serve"));
