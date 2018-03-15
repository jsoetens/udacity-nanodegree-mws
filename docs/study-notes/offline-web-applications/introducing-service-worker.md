# Introducing the Service Worker

## Table of Contents
* [Links](#links)
* [Service Worker](#service-worker)

## Links
* [Google Developers - Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)
* [Is Service Worker Ready?](https://jakearchibald.github.io/isserviceworkerready/)
* [wittr by Jake Archibald](https://github.com/jakearchibald/wittr)
* [Google Developers - Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/)
* [Caching Files with Service Worker](https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker)
* [The Service Worker Lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)
* [Service Worker Registration](https://developers.google.com/web/fundamentals/primers/service-workers/registration)
* [The Offline Cookbook](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/)
* [MDN - Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
* [MDN - Navigator interface](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
* [MDN - Request interface](https://developer.mozilla.org/en-US/docs/Web/API/Request)
* [JavaScript Promises: an Introduction](https://developers.google.com/web/fundamentals/primers/promises)

## Service Worker

When launched from the user’s home screen, **service workers** enable a Progressive Web App to load instantly, regardless of the network state.
A service worker, written in JavaScript, is like a client-side proxy and puts you in control of the cache and how to respond to resource requests. By pre-caching key resources you can eliminate the dependence on the network, ensuring an instant and reliable experience for your users.

The Service Worker is a simple JavaScript file that sits between you and network requests.
It's a type of web worker, it runs separately from your page. It isn't visible to the user. It can't access the DOM, but it does control pages - it intercepts requests as the browser makes them. From that point, we can do whatever we want.
You register for a service worker by giving the location of your service worker script. It returns a **promise**, so we get callbacks for success and failure.
If you call register when the service worker is already registered, the browser won't re-register it. It'll just return a promise for the existing registration.

```javascript
navigator.serviceWorker.register('/sw.js').then(function(reg) {
  console.log('Yay!');
}).catch(function(err) {
  console.log('Boo!');
});
```

You can also provide a **scope**. The service worker will control any page whose URL begins with the scope and it will ignore any that don't. Be careful with trailing slashes.

```javascript
navigator.serviceWorker.register('/sw.js', {
  scope: '/my-app/'
});
```

You can have multiple service workers with different scopes.
The default scope is determined by the location of the service worker script.
The service worker listens for particular events, you can react to them or even prevent the default and do your own thing.
The scope of the service worker restricts the pages it controls but it will intercept pretty much any request made by controlled pages, regardless of URL.
We can alter these requests, changing headers or responding with something different.
Service workers live longer than pages so they could be used to persist attacks. Because of this, service workers are limited to **HTTPS**.
Because localhost is exempt from this rule, dev servers work fine.

The service worker is entirely progressive enhancement friendly. We can use it in browsers that support it without disrupting users of older browsers.
Have a look at [Is Service Worker Ready?] to determine current browser support.

To use service worker in a safe progressive enhancing way, just make sure you write code in a simple feature detect. If a browser doesn't support service workers, navigator.serviceWorker will be undefined, which is a faulty value.

```javascript
// version 1
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}
// version 2
if (!navigator.serviceWorker) return;

navigator.serviceWorker.register('/sw.js').then(function() {
  console.log('Service Worker registration successful!');
}).catch(function() {
  console.log('Service Worker registration failed');
});
```

The service worker receives events so we can add listeners for these.
When the user navigates to a page within your service worker scope, it controls it.
The network requests for its HTML goes to the service worker and triggers a Fetch event.
But not only that, you also get a Fetch event for every request triggered by that page.
CSS, JavaScript, images, you get a Fetch event for each, even if the requests were another origin.

```javascript
self.addEventListener('fetch', function(event) {
  console.log(event.request);
})
```

The **lifecycle of service workers** is quite complex. The service worker lives outside the document.
When you add a service worker and hit refresh, a new Window client is spawned, then the request goes off to the network, we get a response back and the old Window client goes away.
The service worker only **takes control of pages when they're loaded**.

If a page loads via service worker, it will check for an update to the service worker in the background. If it finds it has changed as in resources and byte identical, it becomes the next version.
But it doesn't take control, it waits. It won't take over until all pages using the current version are gone. This ensures there’s only one version of your site running at a given time like native apps.
Unfortunately, a refresh doesn't let the new version take over. This is due to overlap between Window clients, there isn't actually a moment when the current active service worker isn't in use.
For that to happen, a page needs to close or navigate to a page that isn't controlled by the service worker. When it does that, the new service worker takes over and future page loads will go through the new one.

When the browser refetches a service worker looking for updates, it will go through the browser cache as pretty much all requests do.
Because of this, it's strongly recommend to use a **cache time of 0** on service workers.
As a safety precaution, if you set your service worker script to cache for more than a day, the browser will ignore that and just set the cache to 24 hours.

JavaScript debugging also works with service workers, it even has its own panel in the Application tab. *Update on reload* is very useful during development.

Requests go from the page, through the service worker fetch event, then onto the network as usual, through the HTTP cache.
You can **hijack requests** by catching the request as it hits the service worker, and respond ourselves, so nothing goes to the network.
Over in the service worker script, we can call event.respondWith. This tells the browser that we're going to handle this request ourselves.

**event.respondWith()** tells the browser that we handle the request ourselves. it takes a response object or a promise that resolves with a response. One way to create a response is new response(). You can set headers as part of the response.

```javascript
// version 1
self.addEventListener('fetch', function(event) {
  event.respondWith(
    new Response('Hello <b class="a-winner-is-me">world</b>', {
      headers: {'Content-Type': 'text/html'}
    })
  );
});
// version 2
self.addEventListener('fetch', function(event) {
  if (event.request.url.endsWith('.jpg')) {
    event.respondWith(
      fetch('imgs/dr-evil.gif')
    );
  }
});
```

The **Fetch API** is a modern replacement for XMLHttpRequest and used to request resources and lets you read responses.
Our service worker event.respondwith() takes either a response or a promise that resolves to a response. Fetch returns a promise that
resolves to a response. So they can post together really well.
The Fetch API performs a normal browser fetch so the results may come from the cache.

```javascript
fetch('/foo').then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
}).catch(function() {
  console.log('It failed!');
});
```

```javascript
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response) {
      if (response.status == 404) {
        return new Response('Whoops, not found!');
      }
      return response;
    }).catch(function() {
      return new Response('Uh oh, that totally failed!');
    })
  );
});
```

The **fetch method** will take a full request object as well as a URL.
fetch returns a promise, you can then attach a **.then** call back to get the result if the operation was successful.
Whatever we return in this callback becomes the eventual value for the promise.
This means we can look at the response ourselves and respond with our own message or return the response we received.
**.catch** is similar to .then, but .then is for success and .catch is for failure.
Fetch will fail if it can't make a connection to the server at all, which includes offline.
So when that happens, we can respond with our own message.
If you return a promise within a promise, it passes the eventual value to the outer promise.

```javascript
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response) {
      if (response.status == 404) {
        return new Response('Whoops, not found!');
      }
      return response;
    }).catch(function() {
      return new Response('Uh oh, that totally failed!');
    })
  );
});
```

If we want to be able to load our app without using the network, we need somewhere to store our resources.
The **Cache API** provides a mechanism for storing request/response object pairs in the browser.
This Cache API gives us this **caches** object on the global.
Creating or opening a cache is done by calling caches.open with the name of the cache.
That returns a promise for a cache of that name. If I haven't opened a cache of that name before, it creates one and returns it.

```javascript
caches.open('my-stuff').then(function(cache) {
  // ...
});
```
A cache box contains request and response pairs from any secure origin.
We can use it to store fonts, scripts, images, and anything, from both our own origin as well as elsewhere on the web.
I can add cache items using *cache.put()* and pass in a request or a URL and a response.

We can also use *cache.addAll()*, this takes an array of requests or URLs, fetches them, and puts the request-response pairs into the cache.
This operation's atomic, if any of these fail to cache, none of them are added.
addAll uses fetch under the hood, so bear in mind that requests will go via the browser cache.

When we want to get something out of the cache, we can call *cache.match()*, passing in a request or a URL.
This will return a promise for a matching response if one is found, or null otherwise.
*caches.match()* does the same, but it tries to find a match in any cache, starting with the oldest.

```javascript
cache.put(request, response);
cache.addAll([
  '/foo',
  '/bar'
]);
cache.match(request);
caches.match(request);
```

When a browser runs a service worker for the first time, an event is fired within it, the **install** event.
The browser won't let this new service worker take control of pages until its install phase is completed, and we're in control of what that involves. We use it as an opportunity to get everything we need from the network and create a cache for them.

*event.waitUntil()* lets us signal the progress of the install. We pass it a promise and if and when the promise resolves, the browser knows the install is complete. If the promise rejects, it knows the install failed, and this service worker should be discarded.

```javascript
self.addEventListener('install', function(event) {
  var urlsToCache = [
    '/',
    '/foo',
  ];
  event.waitUntil(
    caches.open('my-app-static-v1').then(function(cache) {
      return cache.addAll(
        urlsToCache
      );
    })
  );
})
```

You need to call event.respondWith() synchronously. You can't call it within a promise handler, that's too late.
For a request, we can respond with a match in the cache. The event.request can be passed straight into caches.match.
There may not be a match in the cache for this particular request and in that case the promise will resolve with undefined.
If the request is truthy, meaning there's a match in the cache, we'll return it. Otherwise we'll return a fetch to the network for the original request.

```javascript
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    })
  );
});
```

So far we've cached once at install time. To become fully offline first we need to fix:
* Unobtrusive app updates.
* Get the user on the latest version.
* Continually update the cache.

*Update on reload* in dev tools actually reloads the service worker from the network on every refresh and causes it to install even if the service worker hasn't changed.

We change code all the time so we need the service worker to pick up changes and get those to our users as soon as possible with minimum disruption.
To get updates, the service worker needs to be changed. The browser will then treat this updated worker as a new version.
Because it's new, it'll get its own install event where it'll fetch the resources and put them in a new cache.
It won't put them in a different cache automatically. We need to change the name of our cache to make this happen.
We create a new cache because we don't want to disrupt the cache that's already there being used by the old service worker and the pages it controls.
Then, once the old service worker is released and we're ready to take over, we delete the old cache so the next page load gets resources from the new cache.
A change to the service worker will cause it to spin up a new instance and that change can just be renaming the cache from v1 to v2.

The **activate** event fires when a service worker becomes active, when it's ready to control pages and the previous service worker is gone.
This makes it the perfect time to get rid of old caches.
Like the install event, you can use event.waitUntil() to signal the length of the process. While you're activating, the browser will queue other service worker events such as fetch. By the time your service worker receives its first fetch, you have the caches how you want them.

```javascript
self.addEventListener('activate', function(event) {
  // ...
})
```

You can delete caches using caches.delete(), passing in the name of the cache.
You can also get the names of all your caches using caches.keys().
Both of these methods return promises.

```javascript
caches.delete(cacheName);
caches.keys();
```

Service worker won't activate until pages using the current version go away.
So either close a tab, navigate it to a page out of the service worker scope or shift refresh it.

Bumping up version numbers of the static cache in the service worker is not that scalable.
Users might be updating from older versions. An approach is to maintain a safe
list of cache names that we want to keep and remove the others.

```javascript
var staticCacheName = 'my-app-static-v1';

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('my-app-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
```

Checking the cache startsWith() means we don't delete caches from other apps that might be running on the same origin.
Some sites might have many service workers sharing the same origin.
When updating the cache remember that requests are going by the standard browser cache.
So if one of these resources had a cache time of say a year, the update would just be fetched from the HTTP cache.
In a development server, all the resources are set to have a **cache age** of zero as in they don't cache.
In production, it's strongly recommended to have versioning as part of your resource names.
Using build scripts, version numbers can be generated from the content of the file.
Then you can give these resources a cache time of a year or more.

Changes will be in the waiting worker but ideally we want users to be on the latest version as soon as possible.
Before a new worker can take over, it waits until all pages using the current version go away.
Our goal here is to tell the user once an update has been found, and give them a button to ignore it or refresh the page to get the new version.

When you register for a service worker it returns a promise. That promise fulfills with a **service worker registration object**.
This object has properties and methods relating to the service worker registration.
We get methods to unregister the service worker or programmatically trigger an update.
We also get free properties installing, waiting, and active.
These will point to a serviceWorker object or be null.

```javascript
navigator.serviceWorker.register('/sw.js').then(function(reg) {
  reg.unregister();
  reg.update();
  reg.installing;
  reg.waiting;
  reg.active;
  reg.addEventListener('updatefound', function() {
    // reg.installing has changed
  })
});
```

The dev tools view is actually just looking at registration objects. The registration object will emit an event *updatefound* when a new update is found.
On the serviceWorker objects themselves, you can look at their state.

```javascript
var sw = reg.installing;
console.log(sw.state); // ...logs "installing"
// state can also be:
// "installed"
// "activating"
// "activated"
// "redundant"
sw.addEventListener('statechange', function() {
  // sw.state has changed
});
```

The serviceWorker fires an event *statechange* whenever the state property changes.
Also *navigator.serviceWorker.controller* refers to the service worker that controls the page.

We want to tell users about updates, whether they're already there, in progress or start some time later.
Because the service worker update happens in the background, the update could be ready and waiting, it could be in progress or it might not have started yet.
We need to look at the state of things when the page loads but we may also need to listen for future changes.
For instance, if there's no controller, that means a page didn't load using a service worker, so content was loaded from the network.

```javascript
if (!navigator.serviceWorker.controller) {
  // page didn't load using a service worker
}
```

Otherwise, we need to look at the registration. If there's a waiting worker there's an update ready and waiting so we tell the user about it.
If there is an installing worker there's an update in progress or the update may even fail.
We listen to the state changes to track it and if it reaches the installed state, we tell the user.

```javascript
if (reg.waiting) {
  // there's an update in progress
  reg.installing.addEventListener('statechange', function() {
    if (this.state == 'installed') {
      // there's an update ready!
    }
  });
}
```

Otherwise, we listen for the *updatefound* event. When that fires we track the state of the installing worker and if it reaches the installed state, we tell the user.


```javascript
reg.addEventListener('updatefound', function() {
  reg.installing.addEventListener('statechange', function() {
    if (this.state == 'installed') {
      // there's an update ready!
    }
  });
});
```

First off, if the controller is falsely, we bail.
The user already has the latest version if it wasn't loaded via a service worker.
If there's a worker waiting, we trigger a notification and return.
If there's a worker installing, we want to listen to its state changes.
In method trackInstalling, we take the worker, and listen to its statechange event.
When that fires, we look at the state, and if it's installed, the user gets notified.
If there isn't an installing worker, we listen for updates.
Once there's an update, we call trackInstalling again.

```javascript
navigator.serviceWorker.register(/'sw.js').then(function(reg) {
  if (!navigator.serviceWorker.controller) {
    return;
  }

  if (reg.waiting) {
    indexController._updateReady();
    return;
  }

  if (reg.installing) {
    indexController._trackInstalling(reg.installing);
  }
})
```

When a user clicks an update notification button, it needs to tell the waiting service worker that it should take over straightaway, bypassing the usual life cycle.
We then want to refresh the page so it reloads with the latest assets from the newest cache.
Three new components help us achieve this.

A service worker can call *self.skipWaiting()* while it's waiting or installing.
This signals that it shouldn't queue behind another service worker and take over straight away. We want to call this when a user hits the refresh button in our update notification.

Your page can send messages to any service worker using *postMessage()* and you can listen for messages in the service worker using the message event.

```javascript
// from a page
reg.installing.postMessage({foo: 'bar'});

// in the service worker:
self.addEventListener('message', function(event) {
  event.data; // {foo: 'bar'}
});
```

The page gets an event when its value changes, meaning a new service worker has taken over. We're going to use this as a signal that we should reload the page.

```javascript
navigator.serviceWorker.addEventListener('controllerchange', function() {
  // navigator.serviceWorker.controller has changed
});
```
