# MWS Project 1 - Accessible and Responsive Web Apps

## Goal of the Project

Build a Restaurant Reviews App that meets accessibility standards and provides a responsive user experience. In this first stage, you will take a static design that lacks accessibility, and convert the design to be responsive on different sized displays and accessible for screen reader use. Add a service worker to begin converting to a Progressive Web Application by caching some assets for offline use.

The original starter code can be found on [GitHub](https://github.com/udacity/mws-restaurant-stage-1)

## Official Style Guide
This code adheres to the [Udacity Frontend Nanodegree Style Guide](https://udacity.github.io/frontend-nanodegree-styleguide/).

## Getting Started
Clone or download the repository.
Start up an HTTP server, you can use Python or Chrome extension [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en).

Example using Python:

```
pipenv --python 3.6
pipenv run python -m http.server 8887
```

Open url [localhost:8887](localhost:8887) in your favorite browser.

## Workbox
The service worker is created by the [Workbox CLI](https://developers.google.com/web/tools/workbox/modules/workbox-cli) using a source service worker and configuration file.

`workbox injectManifest workbox-config.js`

## Where can I learn more?
Follow the awesome [Udacity Mobile Web Specialist Nanodegree](https://www.udacity.com/course/mobile-web-specialist-nanodegree--nd024)!
