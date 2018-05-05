# Web Tooling and Automation

## Table of Contents
* [Links](#links)
* [Introduction](#introduction)
* [Productive Editing](#productive-editing)
* [Powerful Builds](#powerful-builds)
* [Expressive Line Editing](#expressive-line-editing)
* [How to Prevent Disasters](#how-to-prevent-disasters)
* [Awesome Optimizations](#awesome-optimizations)

## Links
* [Udacity Course - Web Tooling and Automation](https://www.udacity.com/course/web-tooling-automation--ud892)
* [Progressive Web Apps Training - Introduction to Gulp](https://developers.google.com/web/ilt/pwa/introduction-to-gulp-slides)
* [Gulp](https://gulpjs.com/)
* [Gulp - Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
* [Progressive Web Apps Training - Lab: Gulp Setup](https://developers.google.com/web/ilt/pwa/lab-gulp-setup)
* [Sass](http://sass-lang.com/)
* [Gulp - gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
* [Save Changes To Disk With Workspaces](https://developers.google.com/web/tools/setup/setup-workflow?utm_source=dcc&utm_medium=redirect&utm_campaign=2016q3)
* [Browsersync](https://www.browsersync.io/)
* [A Comparison of JavaScript Linting Tools](https://www.sitepoint.com/comparison-javascript-linting-tools/)
* [ESLint](https://eslint.org/)
* [Gulp - gulp-eslint](https://www.npmjs.com/package/gulp-eslints)
* [Gulp - gulp-jasmine-phantom](https://www.npmjs.com/package/gulp-jasmine-phantom)

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

```javascript
npm install --save-dev gulp-sass
npm install --save-dev gulp-autoprefixer
```

```javascript
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

# Expressive Line Editing
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

```javascript
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

# How to Prevent Disasters
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

# Awesome Optimizations
Most optimizations are only meant for production.
It's recommended to split your tasks into development and production.
Development tasks contain things you really need no matter what.
However, keep in mind that while developing, this means you'll be using a different version of your app than your users. Make sure to always test the production version from time to time.

```javascript
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
