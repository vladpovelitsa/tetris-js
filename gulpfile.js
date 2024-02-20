const { src, dest, parallel, watch } = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');

const buildScripts = () =>
    src('js/*.js')
        .pipe(babel())
        .pipe(dest('output/'));

const buildStyles = () =>
    src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest('css/'));

const buildHtml = () =>
    src('./layouts/*.html')
        .pipe(rigger())
        .pipe(dest('./'))

const globalWatch = () => {
    watch('./js/*.js', buildScripts)
    watch('./scss/**/*.scss', buildStyles)
    watch('./templates/*.html', buildHtml)
};

exports.default = globalWatch