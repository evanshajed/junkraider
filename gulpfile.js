'use strict';

const {watch, series, parallel, src, dest} = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  csso = require('gulp-csso'),
  webpack = require('webpack-stream'),
  fileInclude = require('gulp-file-include'),
  browserSync = require('browser-sync').create();

// const styles = () => {
//   return src('./assets/scss/style.scss')
//     .pipe(sass())
//     .pipe(autoprefixer())
//     .pipe(csso())
//     .pipe(dest('./assets/css'))
//     .pipe(browserSync.stream());
// };
//
// const stylesFonts = () => {
//   return src('./assets/scss/base/fonts.scss')
//     .pipe(sass())
//     .pipe(autoprefixer())
//     .pipe(csso({
//       restructure: false
//     }))
//     .pipe(dest('./assets/css'))
// };

const scripts = () => {
  return src([
    './js/scripts.js'
  ])
    .pipe(webpack({
      output: {
        filename: 'scripts.min.js'
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: "babel-loader",
            query: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      externals: {
        jquery: 'jQuery'
      },
      watch: false,
      mode: 'production'
    }))
    .pipe(dest('./js'))
    .pipe(browserSync.stream());
};

// const fileinclude = () => {
//   return src('./assets/html-dev/*.html')
//     .pipe(fileInclude({
//       prefix: '@@',
//       basepath: './assets/html-dev/',
//     }))
//     .pipe(dest('./assets/'))
//     .pipe(browserSync.stream());
// };

const watcher = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  // watch('./assets/scss/**/*.scss', styles);
  watch('./js/scripts.js', scripts);
  // watch('./assets/html-dev/**/*.html', fileinclude);
  // watch('./assets/html-dev/**/*.html').on('change', browserSync.reload);
};

exports.default = series(scripts, watcher);

// const export_CSS = () => { return src('./assets/css/*.css').pipe(dest('./dist/css/')); }
// const export_IMG = () => { return src('./assets/img/**/*').pipe(dest('./dist/img/')); }
const export_JS = () => { return src('./js/scripts.min.js').pipe(dest('./js/')); }
// const export_FONTS = () => { return src('./assets/fonts/**/*').pipe(dest('./dist/fonts/')); }
// const export_HTML = () => { return src('./assets/*.html').pipe(dest('./dist/')); }

// exports.build = series(fileinclude, parallel(styles, scripts), parallel(export_CSS, export_IMG, export_JS, export_FONTS, export_HTML));
exports.build = series(scripts);
