const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const workboxBuild = require('workbox-build');
const cleanCSS = require('gulp-clean-css');

// Task: clean-build
// Removes all files in build.
gulp.task('clean-build', () => {
  return del.sync('build');
})

// Task: copy-app
// Copies all app files from app to build.
gulp.task('copy-app', () =>
  gulp.src([
    'app/*.html',
    'app/css/**/*.css',
    'app/js/**/*.js',
    'app/img/**',
    'app/favicon.ico',
    'app/manifest.json'
  ], {base: 'app/.'})
  .pipe(gulp.dest('build'))
);

// Task: copy-html
gulp.task('copy-html', () =>
  gulp.src('app/*.html')
  .pipe(gulp.dest('build'))
);

// Task: copy-css
gulp.task('copy-css', () =>
  gulp.src('app/css/**/*.css')
  .pipe(gulp.dest('build/css'))
);

// Task: copy-js
gulp.task('copy-js', () =>
  gulp.src('app/js/**/*.js')
  .pipe(gulp.dest('build/js'))
);

// Task: copy-images
gulp.task('copy-images', () =>
  gulp.src('app/img/**')
  .pipe(gulp.dest('build/img'))
);

// Task: copy-favicon
gulp.task('copy-favicon', () =>
  gulp.src('app/favicon.ico')
  .pipe(gulp.dest('build'))
);

// Task: copy-manifest
gulp.task('copy-manifest', () =>
  gulp.src('app/manifest.json')
  .pipe(gulp.dest('build'))
);

// Task: minify-css
// Minify CSS using clean-css.
gulp.task('minify-css', () => {
  return gulp.src('app/css/**/*.css')
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
  .pipe(gulp.dest('build/css'));
});

// Task: service-worker
gulp.task('service-worker', () => {
  return workboxBuild.injectManifest({
    swSrc: "app/sw.js",
    swDest: "build/sw.js",
    globDirectory: 'build',
    globPatterns: [
      "**/*.{html,css,js}",
      "favicon.ico",
      "manifest.json",
      "img/touch/*.png"
    ],
    globIgnores: [
      "sw.src.js",
      "workbox-config.js",
      "node_modules/**/*"
    ]
  }).catch(err => {
    console.log('[ERROR] ' + err);
  });
});

// Task: browser-sync
// Browsersync static server.
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
  });
});

// Task: default
gulp.task('default', cb => {
  runSequence(
    'clean-build',
    'copy-app',
    'service-worker', cb);
});

// Task: watch
// This task watches our "app" files & rebuilds whenever they change.
gulp.task('watch', () => {
  gulp.watch('app/*.html', ['copy-html']);
  gulp.watch('app/css/**/*.css', ['copy-css']);
  gulp.watch('app/js/**/*.js', ['copy-js']);
  gulp.watch('app/img/**', ['copy-images']);
  gulp.watch('app/manifest.json', ['copy-manifest']);
});

// Task: build
// Build the production app.
gulp.task('build', cb => {
  runSequence(
    'clean-build',
    ['copy-html', 'copy-js', 'copy-images', 'copy-favicon', 'copy-manifest'],
    'minify-css', 'service-worker',
    cb);
});
