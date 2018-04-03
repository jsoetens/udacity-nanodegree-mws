/**
 * Workbox
 * Workbox - https://developers.google.com/web/tools/workbox/
 * Codelab - https://codelabs.developers.google.com/codelabs/workbox-lab/
 *
 * Workbox creates a configuration file (in this case workbox-config.js) that
 * workbox-cli uses to generate service workers. The config file specifies where
 * to look for files (globDirectory), which files to precache (globPatterns),
 * and the file names for our source and production service workers (swSrc and
 * swDest, respectively). We can also modify this config file directly to change
 * what files are precached.
 */


/**
 * Importing Workbox
 *
 * The importScripts call imports the workbox-sw.js library so the workbox
 * object gives our service worker access to all the Workbox modules.
 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

if (workbox) {
  console.log(`[DEBUG] Workbox is loaded.`);

  // Debugging Workbox
  // Force development builds
  // workbox.setConfig({ debug: true });
  // Force production builds
  workbox.setConfig({ debug: false });

  // The precacheAndRoute method of the precaching module takes a precache
  // "manifest" (a list of file URLs with "revision hashes") to cache on service
  // worker installation. It also sets up a cache-first strategy for the
  // specified resources, serving them from the cache by default.
  // In addition to precaching, the precacheAndRoute method sets up an implicit
  // cache-first handler.
  workbox.precaching.precacheAndRoute([
    {
      "url": "css/styles.css",
      "revision": "42545e85bb0a38228ef7f8e36e96bb59"
    },
    {
      "url": "data/restaurants.json",
      "revision": "500a3defff288a163f63f80b48025716"
    },
    {
      "url": "index.html",
      "revision": "cfaf9ff76e5561be7f41c638eac0bf7e"
    },
    {
      "url": "js/dbhelper.js",
      "revision": "e68051d2f94543853f3641b63f9051fb"
    },
    {
      "url": "js/main.js",
      "revision": "ff3fca18d778da7d033184c2d4e45f1e"
    },
    {
      "url": "js/restaurant_info.js",
      "revision": "8ad50d3d6e2488d447d49231ec3ff92b"
    },
    {
      "url": "restaurant.html",
      "revision": "935be362157523ba7662486040655e12"
    }
  ]);

  // Google APIs
  // https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate
  workbox.routing.registerRoute(
    new RegExp('(.*).(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pwa-cache-googleapis',
      cacheExpiration: {
        maxEntries: 20
      },
      // Status 0 is the response you would get if you request a cross-origin
      // resource and the server that you're requesting it from is not
      // configured to serve cross-origin resources.
      cacheableResponse: {statuses: [0, 200]}
    })
  );

  // Images
  // https://developers.google.com/web/tools/workbox/modules/workbox-strategies#cache_first_cache_falling_back_to_network
  // https://developers.google.com/web/tools/workbox/modules/workbox-cache-expiration
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    // Whenever the app requests images, the service worker checks the
    // cache first for the resource before going to the network.
    workbox.strategies.cacheFirst({
      cacheName: 'pwa-cache-images',
      // A maximum of 60 entries will be kept (automatically removing older
      // images) and these files will expire in 30 days.
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        })
      ]
    })
  );

  // Restaurants
  // https://developers.google.com/web/tools/workbox/modules/workbox-cacheable-response
  // http://localhost:8887/restaurant.html?id=1
  workbox.routing.registerRoute(
    new RegExp('.*restaurant\.html\?'),
    workbox.strategies.cacheFirst({
      cacheName: 'pwa-cache-restaurants',
      // The workbox-cacheable-response module provides a standard way of
      // determining whether a response should be cached based on its numeric
      // status code, the presence of a header with a specific value,
      // or a combination of the two.
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    })
  );

} else {
  console.log(`[DEBUG] Workbox didn't load.`);
}
