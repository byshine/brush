const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

const paths = {
    scripts: ["src/js/*.js"],
    styles: ["src/css/*.css", "src/css/*.scss", "src/css/*.sass"],
    html: ["src/*.html"],
    views: ["src/*.pug"]
}

gulp.task('html', () => {
    return gulp.src(paths.html)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(htmlmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('views', () => {
    return gulp.src(paths.views)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(pug())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});


gulp.task('scripts', () => {
    return gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', () => {
    return gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
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
        gulp.watch(paths.views, ['views']);
        nodemon({
            script: 'app.js',
            ext: 'js',
            env: { 'NODE_ENV': 'development' }
        });

});

gulp.task('default', ['scripts', 'styles', 'html', 'views']);
gulp.task('develop', ['watch']);