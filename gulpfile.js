const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');

const paths = {
    scripts: ["src/js/*.js"],
    styles: ["src/css/*.css"],
    html: ["src/*.html"]
}

gulp.task('html', () => {
    return gulp.src(paths.html)
        .pipe(sourcemaps.init())
        .pipe(htmlmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', () => {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', () => {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(concat("styles.css"))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.html, ['html']);
    console.log("WATCH RUNNING: Now Watching HTML, CSS & JavaScript Files");
});

gulp.task('default', ['scripts', 'styles', 'html', 'watch']);