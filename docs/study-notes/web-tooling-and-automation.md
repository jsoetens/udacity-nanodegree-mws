# Web Tooling and Automation

## Table of Contents
* [Links](#links)
* [Introduction](#introduction)
* [Productive Editing](#productive-editing)
* [Powerful Builds](#powerful-builds)
* [Expressive Line Editing](#expressive-line-editing)
* [How to Prevent Disasters](#how-to-prevent-disasters)
* [Awesome Optimizations](#awesome-optimizations)
* [Scaffolding](#scaffolding)

## Links
* [Udacity Course - Web Tooling and Automation](https://www.udacity.com/course/web-tooling-automation--ud892)
* [Progressive Web Apps Training - Introduction to Gulp](https://developers.google.com/web/ilt/pwa/introduction-to-gulp-slides)
* [Progressive Web Apps Training - Lab: Gulp Setup](https://developers.google.com/web/ilt/pwa/lab-gulp-setup)
* [Gulp](https://gulpjs.com/)
* [Gulp - Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
* [Gulp - gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
* [Gulp - gulp-eslint](https://www.npmjs.com/package/gulp-eslints)
* [Gulp - gulp-jasmine-phantom](https://www.npmjs.com/package/gulp-jasmine-phantom)
* [Gulp - gulp-concat](https://www.npmjs.com/package/gulp-concat)
* [Gulp - gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [Gulp - gulp-babel](https://www.npmjs.com/package/gulp-babel)
* [Gulp - gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
* [Gulp - imagemin](https://www.npmjs.com/package/gulp-imagemin)
* [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant)
* [Sass](http://sass-lang.com/)
* [Save Changes To Disk With Workspaces](https://developers.google.com/web/tools/setup/setup-workflow?utm_source=dcc&utm_medium=redirect&utm_campaign=2016q3)
* [Browsersync](https://www.browsersync.io/)
* [A Comparison of JavaScript Linting Tools](https://www.sitepoint.com/comparison-javascript-linting-tools/)
* [ESLint](https://eslint.org/)
* [The Difference Between Minification and Gzipping](https://css-tricks.com/the-difference-between-minification-and-gzipping/)
* [Babel](https://babeljs.io/)
* [Introduction to JavaScript Source Maps](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
* [HTML5 Boilerplate](https://html5boilerplate.com/)
* [Web Starter Kit](https://developers.google.com/web/tools/starter-kit/)
* [Yeoman](http://yeoman.io/)

## Introduction
While optimizing your work is generally good, not all optimizations are worth doing.
Be pragmatic instead of idealistic when choosing tools. Sticking to a tool that is well supported by the community, is pragmatic.
Some tools might be a little slower but consider the long-term value for your project.
Identify the real value of the tool and keep things modular and replaceable.

## Productive Editing
Using tools the right way, you can achieve what most developers dream of. The state of mind called flow.
You can do all sorts of useful things with an **IDE** (Integrated Development Environment) but they come at the expense of tools that do one thing really well. Most web developers decide to embrace the chaos and use individual tools best for each job while ensuring that they function well together.

Choosing the right editor can be tricky due to the overwhelming options but whatever editor you end up using, just make sure it's fast enough, can be extended with functionality, is well supported and stable. This course uses Sublime Text 3, a free alternative is GitHub's Atom editor.

The relationship with your editor will be a long one, and like with any good relationship, you need to work on it and invest early on.
In the first couple of days of using a new editor, try out lots of build-in shortcuts and features, even if they seem overkill. Try them all out and observe yourself. Which shortcuts stick, which do you have to force yourself to use?
Almost all modern editors can be extended with functionality.

## Powerful Builds
In today's life of a web developer, there's a large collection of tools that you feed tasks and that then automate and improve many aspects of your workflow.

A build tool should be fast, community-driven, modular and extensible, feature-rich.
**Gulp** has two significant advantages over Grunt. It's built for **speed** and can execute tasks in **parallel**, plus converts open files into super fast **streams** internally.
Gulp's tasks, use **code over configuration**, which means that you can just use normal JavaScript, and extend or modify tasks that don't work for you.

The main difference between Grunt and Gulp is that Grunt focuses on configuration, while Gulp focuses on code.
The second big argument is all about speed. Grunt executes tasks in sequence. Gulp, by default, executes tasks in parallel, and finishes when all have finished.
Gulp comes with the concept of streams, that cause much less IO, or file system access.

In Grunt, we must write intermediary files to disk.
This means that every task incurs a penalty for I/O in file system operations.
Gulp on the other hand, converts your input files into an in-memory stream.
So the I/O is only done initially, and at the very end of all tasks.
This is what gives Gulp such a great speed increase in many situations.

**Sass** is a super set of CSS that gets rid of many of CSS annoyances. We can then compile it to pure CSS.
Instead of prefixing CSS properties for every browser manually, we can automate it with auto prefixer.

```Shell
npm install --save-dev gulp-sass
npm install --save-dev gulp-autoprefixer
```

```JavaScript
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
  gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('styles', function() {
  gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./css'));
})
```

## Expressive Line Editing
**Live Editing** can be set up in a few different ways:
* Live on every keystroke in the editor.
* Every save via Gulp.
* Skipping the editor to move the entire workflow into the browser.

Advantages of live editing are fewer context switches, less clicks and keystrokes when changing code, quicker previews of changes.

One way of setting up live editing is within your browser. Chrome DevTools has a relatively little known feature called **Workspaces**.
Some editors also come with live editing built in, plugins exist for others.
The fundamental flaw with live editing in your editor is that it isn't aware of your build process.
Browsersync allows us to have live editing that is assisted by our build tool.
**Browsersync** works by creating or proxying a local web server which serves and tracks your files for changes.

```JavaScript
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
```

## How to Prevent Disasters
By utilizing your build and editor tools, you can quite heavily improve the quality output of your coding.

**Linting** is a way to automatically check your Java script code for errors. It can be done at various stages during development via your editor, your build process or your pre-commit hook in version control.
Choose the configuration that fits your coding style and project.

There's also the difference of **code style** linting versus **syntax** or structural linting.

Syntax or structural linting is what most people refer to when they say linting. These rules check for JavaScript anti-patterns, such as unreachable statements or forgetting to do a strict comparison against null.
Code style linting can complain about things such as variables that aren't properly camel cased, or a particular way of placing braces for a function.
The linter only checks for potential errors. It doesn't actually have any idea what you're trying to accomplish.

There are three popular JavaScript linters out there that developers use, JSHint, JSCS, and ESLint.

In order to test the functionality of your code, you should create **unit tests**.
Unit tests are essentially JavaScript functions that pragmatically test an API or aspect of your project.
The unit test for your front end only makes sense if they run in a browser.

The key to make Jasmine, the unit test framework, work with our build, is to use a headless browser that we can execute and instruct from the command line because that's what gulp can deal with.
Such a browser is called PhantomJS, and it's basically a headless version of WebKit. The gulp-jasmine-phantom plugin uses that to its advantage to actually run your tests in a real browser environment.

Running complex unit tests, especially in a headless browser, can get really slow.
So adding into our watch process would kill our life editing workflow.
Continuous Integration in the cloud is a great place for your time intensive tasks.

**Continuous Integration** is the idea that you're always making sure your code can be integrated with the remote repository. Across a team, you'll always have a stable build.
A cloud solution like Jenkins will watch the commits going into your repository and trigger any terminal commands you feed it. This means that the test suite can run after every commit but on a completely different computer.  If one of these tests now fails, you've got a notification and you  can fix it in your next commit.

## Awesome Optimizations
Most optimizations are only meant for production.
It's recommended to split your tasks into development and production.
Development tasks contain things you really need no matter what.
However, keep in mind that while developing, this means you'll be using a different version of your app than your users. Make sure to always test the production version from time to time.

```JavaScript
gulp.task('copy-html', function() {
  gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-images', function() {
  gulp.src('img/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('styles', function() {
  gulp.src('sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dist/css'));
});
```

Sass does both concatenation and minification for you. Manual concatenation isn't necessary, because you can simply include a single Sass file in your HTML.
Use the *@import* directive in your Sass to input other files into your base file. When the Sass compiler processes the Sass into CSS, it will automatically inline those inputs and generate one big CSS file.

```JavaScript
.pipe(sass({outputStyle: 'compressed'}))
```

In the world of JavaScript, **concatenation** solves two problems at once.

First and foremost, it reduces a number of HTTP requests needed to load your page in production.
Which is a big deal, especially if you're on a mobile connection with up to 300 milliseconds of latency per request.

Secondly, it's the most basic variant of dependency management. It's basic because obviously it isn't smart enough to detect dependency chains and the required load order.
You put all your script into a folder and you simply add a single script block that points to the generated output file, including all of them concatenated.

After concatenation we can do **minification** to shrink the file size of our JavaScript.
One the popular minifiers is UglifyJS which does some heavy but safe optimizations to squeeze every last bit out of your raw source code.
JavaScript minification is a very time-intensive stop. Therefore, it makes no sense to do this while live editing your code.

```Shell
npm install --save-dev gulp-concat
npm install --save-dev gulp-uglify
```

```JavaScript
const concat = require('gulp-concat');

gulp.task('scripts', function() {
  gulp.src('js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('scripts-dist', function() {
  gulp.src('js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});
```

Minification on its own is great, but **Gzipping** is even more affective.
Gzipping compresses the file before it gets in, and out to the browser, and the browser deflates it.
All of this happens transparently in the background and usually only requires a small server configuration change.

Standardization across browsers takes a long time but we can still safely run the latest spec of JavaScript. This is possible by using a **transpiler**, which converts one programming language into another.
Sometimes transpilers stay very close to ECMAScript syntax, adding in a few features here and there. In other cases, they are full language implementations.
A popular transpiler is Babel.

**JavaScript Source Maps** are files that associate line numbers from the processed file to the original. This way the browser can lookup the current line number in the source map and open the right source file at the correct line when debugging. In Chrome for instance, the DevTools support source maps both for CSS and JavaScript.
In addition to things like concatenation and minification, source maps also support some languages/extensions that transpile to JavaScript like Typescript, CoffeeScript and ES6 / JSX.

```Shell
npm install --save-dev gulp-sourcemaps
```

```JavaScript
const sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts-dist', function() {
  gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});
```

**Image Compression** is another crucial optimization.
Our build can help us optimize our images in many different ways, the most obvious of which is for file size. We can compress images with either lossless or lossy compression algorithms.

**Lossless compression** reduces a file in such a way that the original can be recreated from the compressed version. You can think of it as reducing the file size but not throwing away any information.

**Lossy compression**, on the other hand, can only recreate an approximation of the original. Lossy compression can give you really small file sizes at the expense of image quality.
But there are a few lossy optimizations that are truly smart, and **PNG quantization** is one of them. PNG quantization takes images with or without alpha transparency and converts them to 256 or less colored 8-bit pngs. Now if you do this manually and just convert a 16-bit image to a 8-bit image, you won’t like the results.
PNG quantization benefits from the fact that there are colors that our vision and brain perceives as very similar, even though they’re technically completely different. The quantization algorithm aims to understand which colors actually matter and remaps them to new, optimized colors.

```Shell
npm install --save-dev gulp-imagemin
```

```JavaScript
const imagemin = require('gulp-imagemin');

gulp.task('default', function() {
  return gulp.src('src/images/*')
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});
```

**Progressive rendering** loads an image in layers where each layer makes the image more detailed. It can make a page feel faster than typical rendering line by line.

Smaller images can tolerate more aggressive lossy compression. You might want to try other things like converting images to SVG where applicable.

## Scaffolding
If you set up plenty of projects, you might want to automate the automation.
**Scaffolding** is a way of creating a starting point structure for your project based on a couple of assumptions that you control.
It's very likely that you've already done the most basic form of scaffolding plenty of times, copy and paste.

Some scaffolding tools are the HTML5 Boilerplate, Web Starter Kit and Yeoman.
