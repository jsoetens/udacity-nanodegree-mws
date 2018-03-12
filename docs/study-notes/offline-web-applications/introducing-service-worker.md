# Introducing the Service Worker

## Table of Contents
* [Links](#links)
* [Service Worker](#service-worker)

## Links
* [Google Developers - Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)
* [Is Service Worker Ready?](https://jakearchibald.github.io/isserviceworkerready/)
* [wittr by Jake Archibald](https://github.com/jakearchibald/wittr)
* [Google Developers - Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/)
* [MDN - Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
* [Caching Files with Service Worker](https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker)

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

JavaScript debugging also works with service workers, it even has its own panel in the Application tab.
