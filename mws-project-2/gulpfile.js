const gulp = require('gulp');
const workboxBuild = require('workbox-build');

// Task: copy
// Copies files from app to build.
gulp.task('copy', () =>
  gulp.src([
    'app/**/*',
  ]).pipe(gulp.dest('build'))
);

// Task: service-worker
gulp.task('service-worker', () => {
  return workboxBuild.injectManifest({
    swSrc: "app/sw.js",
    swDest: "build/sw.js",
    globDirectory: 'build',
    globPatterns: [
      "**/*.{html,css,js}",
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

// Task: default
gulp.task('default', ['copy', 'service-worker']);

// Task: watch
// this task watches our "app" files & rebuilds whenever they change
gulp.task('watch', function() {
  gulp.watch('app/**/*', ['copy', 'service-worker']);
});

// Gulp 4
// Task: default tasks (Gulp 4)
// gulp.task('default', gulp.series('copy', 'service-worker'));

// Task: watch (Gulp 4)
// function watchApp() {
//     return gulp.watch('app/**/*', gulp.series('copy', 'service-worker'));
// }
// gulp.task('watch', watchApp);
