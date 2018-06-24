const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
// const browserify = require('browserify');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const webp = require('gulp-webp');
const responsive = require('gulp-responsive');
const $ = require('gulp-load-plugins')();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const workboxBuild = require('workbox-build');


/**
 * Cleanup
 * - clean-build
 * - clean-images
 * - clean-js
 */

// Remove all files in build.
gulp.task('clean-build', () => {
  return del.sync('build');
});

// Remove all images except src.
gulp.task('clean-images', () => {
  return del.sync([
    'app/img',
    'build/img'
  ]);
});

// Remove all JS in build.
gulp.task('clean-js', () => {
  return del.sync([
    'build/js'
  ]);
});


/*
 * Images
 * - images-copy2app
 * - images-webp
 * - images-resize
 * - images-copy2build
 */

// Copy images that need no manipulations to app.
gulp.task('images-copy2app', () =>
  gulp.src([
    'src/images/touch/**'
  ])
  .pipe(gulp.dest('app/img/touch'))
);

// Create WebP images.
gulp.task('images-webp', () =>
  gulp.src('src/images/*.jpg')
  .pipe(webp())
  .pipe(gulp.dest('src/images'))
);

// Create responsive images.
// https://github.com/mahnunchik/gulp-responsive/blob/HEAD/examples/multiple-resolutions.md
gulp.task('images-resize', function () {
  return gulp.src('src/images/*.{jpg,webp}')
    .pipe($.responsive({
      // Resize all JPEG/WebP images to sizes: 300, 433, 552, 653, 752, 800.
      '*.{jpg,webp}': [{
        width: 300,
        rename: { suffix: '_w_300' },
      }, {
        width: 433,
        rename: { suffix: '_w_433' },
      }, {
        width: 552,
        rename: { suffix: '_w_552' },
      }, {
        width: 653,
        rename: { suffix: '_w_653' },
      }, {
        width: 752,
        rename: { suffix: '_w_752' },
      }, {
        width: 800,
        rename: { suffix: '_w_800' },
      }],
    }, {
      // Global configuration for all images.
      // The output quality for JPEG, WebP and TIFF output formats.
      quality: 70,
      // Use progressive (interlace) scan for JPEG and PNG output.
      progressive: true,
      // Zlib compression level of PNG output format
      compressionLevel: 6,
      // Strip all metadata.
      withMetadata: false,
    }))
    .pipe(gulp.dest('app/img'));
});

// Copy the images from app to build.
gulp.task('images-copy2build', () =>
  gulp.src('app/img/**/*', {base: 'app/img/'})
  .pipe(gulp.dest('build/img'))
);


/**
 * HTML
 * - html-copy2build
 */

// Copy HTML from app to build.
gulp.task('html-copy2build', () =>
  gulp.src('app/*.html')
  .pipe(gulp.dest('build'))
);


/**
 * CSS
 * - css-minify
 * - css-copy2build
 */

// Minify CSS using clean-css.
gulp.task('css-minify', () => {
  // return gulp.src('app/css/**/*.css')
  return gulp.src('app/css/styles.css')
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/css'));
});

// Copy CSS from app to build.
gulp.task('css-copy2build', () =>
  gulp.src('app/css/**/*.css')
  .pipe(gulp.dest('build/css'))
);


/**
 * JavaScript
 * - js-babel
 * - js-minify-main
 * - js-minify-resto
 * - js-minify-review
 */

// http://babeljs.io/docs/setup/#installation
// https://babeljs.io/docs/usage/babelrc/
// https://github.com/babel/gulp-babel
gulp.task('js-babel', () => {
  // return gulp.src('app/js/**/*.js')
  return gulp.src([
    'app/js/dbhelper.js', 'app/js/app.js', 'app/js/restaurant_info.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel())
    // .pipe(concat('app.min.js'))
    // .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('js-minify-idb', () => {
  return gulp.src([
    'app/js/idb-promised.js', 'app/js/idb.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('idb-bundle.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('js-minify-main', () => {
  return gulp.src([
    'app/js/dbhelper.js', 'app/js/app.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main-bundle.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('js-minify-resto', () => {
  return gulp.src([
    'app/js/dbhelper.js', 'app/js/resto-bundle.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('resto-bundle.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('js-minify-review', () => {
  return gulp.src([
    'app/js/dbhelper.js', 'app/js/review-bundle.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('review-bundle.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'));
});

/*
 * Progressive Web Apps
 * - pwa-service-worker
 * - pwa-manifest-copy2build
 */

// Create a service worker in build.
gulp.task('pwa-service-worker', () => {
  return workboxBuild.injectManifest({
    swSrc: 'src/js/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatterns: [
      '**\/*.{html,css,js}',
      'img/touch/*.png',
      // 'favicon.ico',
      'manifest.json'
    ],
    globIgnores: [
      'workbox-config.js',
      'node_modules/**/*'
    ]
  }).then(({count, size, warnings}) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(
      `[INFO] ${count} files will be precached, totaling ${size} bytes.`);
  }).catch(err => {
    console.log('[ERROR] ' + err);
  });
});

// Copy manifest.json to build.
gulp.task('pwa-manifest-copy2build', () =>
  gulp.src('app/manifest.json')
  .pipe(gulp.dest('build'))
);


/**
 * Default / Watch
 * - CSS / Sass is handled by webpack
 */

// Default Gulp task.
gulp.task('default', ['build']);

// This task watches our "app" files & rebuilds whenever they change.
gulp.task('watch', () => {
  gulp.watch('app/img/**', ['images-copy2build']);
  gulp.watch('app/*.html', ['html-copy2build']);
  gulp.watch('app/css/**/*.css', ['css-copy2build']);
  gulp.watch('app/js/**/*.js', ['build-js']);
  gulp.watch('app/manifest.json', ['pwa-manifest-copy2build']);
  gulp.watch('src/js/sw.js', ['pwa-service-worker']);
});


/**
 * Build
 * - build-images
 * - build-js
 * - build
 */

// Clean up and build the images.
gulp.task('build-images', cb => {
  runSequence(
    'clean-images', 'images-copy2app', 'images-webp', 'images-resize',
    'images-copy2build',
    cb);
});

// Clean up and build the JavaScript.
gulp.task('build-js', cb => {
  runSequence(
    'clean-js',
    'js-minify-idb',
    ['js-minify-main', 'js-minify-resto', 'js-minify-review'],
    'pwa-service-worker',
    cb);
});

// Clean up and build the production app.
gulp.task('build', cb => {
  runSequence(
    'clean-build',
    'build-images',
    'html-copy2build',
    'css-copy2build',
    ['js-minify-idb', 'js-minify-main', 'js-minify-resto', 'js-minify-review'],
    'pwa-manifest-copy2build', 'pwa-service-worker',
    cb);
});
