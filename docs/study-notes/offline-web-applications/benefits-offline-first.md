# The Benefits of Offline First

## Table of Contents
* [Links](#links)
* [Offline First](#offline-first)

## Links
* [Google Developers - Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)
* [wittr by Jake Archibald](https://github.com/jakearchibald/wittr)

## Offline First
There's a lot in between your mobile device and the server where the app and data lives. If something along the way fails, the whole thing fails. If something along the way runs slowly, then the whole thing run slow and there in lies poor connectivity or **Lie-Fi**.
Loads of stuff can go wrong and we can't predict any of this ahead of time.
So far the only way to know if we can get a response is to send a request and see what happens.
That can take a really long time and the worst thing we can leave the user with is nothing.

Fallback content implies having to wait for the network to fail before showing anything.
The gold standard is **Offline First**, it means getting as many things on the screen as possible, using stuff already on the user's device in caches and such. We might still go to the network but we're not going to wait for it.
We'll get stuff from a cache as much as we can and then update the page if we finally get content from the network.
When we get that fresh data from the network, we can update what the user is looking at and also save that new data into the cache for next time. If we can't get fresh data from the network, we stick with what we've got, it's way better than nothing.
Taking an offline first approach means the user is happy online, happy offline and even happy with Lie-Fi. The less the user has to care about connectivity, the better.

**Online First** means we try the network first. If that fails, we serve some offline content like some cached data, a fancy error page, etc. This is the way we typically approach development.
An online first approach works fine with good connectivity. In fact, it's no different.
Things work great offline because you provide fallback content instead of a browser error page.
Requiring the network to succeed or fail before showing anything is online first
Unfortunately, because we're waiting on the network, things are still terrible with Lie-fi.

**Offline First** means we try offline first and we also try to get stuff from the network just after.
If we can get something on the screen without waiting for the network to succeed or fail, that's offline first. Delivering full content without the network is a full offline first experience.
Getting even a part on screen while being busy with the network is still delivering offline first, it will give your app a better perceived performance versus a blank screen.
With offline first, we get a good experience in good connectivity, offline and Lie-Fi.
In fact, we become faster even if the user has good connectivity.
If we can get something on the screen without waiting for the network to succeed or fail, that's offline first. Delivering full content without the network is a full offline first experience.
Getting even a part without the network is still delivering offline first, it will give your app a better perceived performance versus a blank screen.

When you navigate to course app **wittr**, the browser makes a request for some HTML.
Like all web requests, this goes via the browser's **HTTP cache** and if there's no match there, it continues on to the internet. Hopefully, the response makes its way back to the browser.
The HTML the browser receives tells it it needs some CSS, so that's fetched.
Once that arrives, we get our first render, a page full of content.
But at the same time the browser downloaded the CSS, it's also requesting some JavaScript.
When that arrives it opens a **websocket**, a persistent connection that lets the server continually stream newer posts as they arrive - this provides the live updates.

```javascript
// wittr/public/js/main/index.js
import loadScripts from '../utils/loadScripts';
import IndexController from './IndexController';

const polyfillsNeeded = [];

if (!('Promise' in self)) polyfillsNeeded.push('/js/polyfills/promise.js');

try {
  new URL('b', 'http://a');
}
catch (e) {
  polyfillsNeeded.push('/js/polyfills/url.js');
}

loadScripts(polyfillsNeeded, function() {
  new IndexController(document.querySelector('.main'));
});
```

```javascript
// wittr/public/js/main/IndexController.js
import PostsView from './views/Posts';
import ToastsView from './views/Toasts';
import idb from 'idb';

export default function IndexController(container) {
  this._container = container;
  this._postsView = new PostsView(this._container);
  this._toastsView = new ToastsView(this._container);
  this._lostConnectionToast = null;
  this._openSocket();
}

// open a connection to the server for live updates
IndexController.prototype._openSocket = function() {
  var indexController = this;
  var latestPostDate = this._postsView.getLatestPostDate();

  // create a url pointing to /updates with the ws protocol
  var socketUrl = new URL('/updates', window.location);
  socketUrl.protocol = 'ws';

  if (latestPostDate) {
    socketUrl.search = 'since=' + latestPostDate.valueOf();
  }

  // this is a little hack for the settings page's tests,
  // it isn't needed for Wittr
  socketUrl.search += '&' + location.search.slice(1);

  var ws = new WebSocket(socketUrl.href);

  // add listeners
  ws.addEventListener('open', function() {
    if (indexController._lostConnectionToast) {
      indexController._lostConnectionToast.hide();
    }
  });

  ws.addEventListener('message', function(event) {
    requestAnimationFrame(function() {
      indexController._onSocketMessage(event.data);
    });
  });

  ws.addEventListener('close', function() {
    // tell the user
    if (!indexController._lostConnectionToast) {
      indexController._lostConnectionToast = indexController._toastsView.show("Unable to connect. Retrying…");
    }

    // try and reconnect in 5 seconds
    setTimeout(function() {
      indexController._openSocket();
    }, 5000);
  });
};

// called when the web socket sends message data
IndexController.prototype._onSocketMessage = function(data) {
  var messages = JSON.parse(data);
  this._postsView.addPosts(messages);
};
```
