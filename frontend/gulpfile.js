
const { src, dest, watch } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
// const minify = require('gulp-minify');
// const htmlbeautify = require('gulp-html-beautify');
// const jsbeautify = require('gulp-jsbeautify');

function generateCSS(cb) {
    
    src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./css'));
    cb();
}

exports.css = generateCSS

function watchFiles(cb){
    watch('./sass/**/*.scss', generateCSS)
    // watch('./js/*.js', jsBeautify)
    // watch('./js/*.js', minifyJs)
    // watch('./*.html', htmlBeautify)
}

exports.watch = watchFiles;

// Minify function
// 
// function minifyJs(){
//     return src('./js/*.js', {allowEmpty: true})
//     .pipe(minify({noSource: true}))
//     .pipe(dest('./js/min/'))

// }

// exports.minify = minifyJs

// HTML Beautify

// function htmlBeautify(){
//     return src('./*.html', {allowEmpty: true})
//     .pipe(htmlbeautify())
//     .pipe(dest('./'))
// }

// exports.htmlbeautify = htmlBeautify

// JS Beautify

// function jsBeautify(){
//     return src('./js/*.js')
//     .pipe(jsbeautify())
//     .pipe(dest('./js'))
// }

// exports.jsbeautify = jsBeautify