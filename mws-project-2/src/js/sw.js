importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

/**
 * Workbox 3.2.0
 * Workbox - https://developers.google.com/web/tools/workbox/
 * Codelab - https://codelabs.developers.google.com/codelabs/workbox-lab/
 *
 * Workbox creates a configuration file (in this case workbox-config.js) that
 * workbox-cli uses to generate service workers. The config file specifies where
 * to look for files (globDirectory), which files to precache (globPatterns),
 * and the file names for our source and production service workers (swSrc and
 * swDest, respectively). We can also modify this config file directly to change
 * what files are precached.
 * The importScripts call imports the workbox-sw.js library so the workbox
 * object gives our service worker access to all the Workbox modules.
 */

if (workbox) {
  console.log(`[DEBUG] Workbox is loaded.`);

  // Debugging Workbox
  // Force development builds
  // workbox.setConfig({ debug: true });
  // Force production builds
  workbox.setConfig({ debug: false });

  // Custom Cache Names
  // https://developers.google.com/web/tools/workbox/guides/configure-workbox
  workbox.core.setCacheNameDetails({
    prefix: 'pwa',
    suffix: 'v1'
  });
  // The precacheAndRoute method of the precaching module takes a precache
  // "manifest" (a list of file URLs with "revision hashes") to cache on service
  // worker installation. It also sets up a cache-first strategy for the
  // specified resources, serving them from the cache by default.
  // In addition to precaching, the precacheAndRoute method sets up an implicit
  // cache-first handler.
  workbox.precaching.precacheAndRoute([]);

  // Google Fonts
  // https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts
  // https://developers.google.com/web/tools/workbox/modules/workbox-strategies#cache_first_cache_falling_back_to_network
  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'pwa-cache-google-fonts',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
        }),
      ],
    }),
  );

  // Google Maps APIs
  // https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate
  // Use cache but update in the background ASAP.
  // workbox.routing.registerRoute(
  //   new RegExp('https://maps.(?:googleapis|gstatic).com/(.*)'),
  //   workbox.strategies.staleWhileRevalidate({
  //     cacheName: 'pwa-maps-cache',
  //     cacheExpiration: {
  //       maxEntries: 20
  //     },
  //     // Status 0 is the response you would get if you request a cross-origin
  //     // resource and the server that you're requesting it from is not
  //     // configured to serve cross-origin resources.
  //     cacheableResponse: {statuses: [0, 200]}
  //   })
  // );

  // Images
  // https://developers.google.com/web/tools/workbox/modules/workbox-strategies#cache_first_cache_falling_back_to_network
  // https://developers.google.com/web/tools/workbox/modules/workbox-cache-expiration
  workbox.routing.registerRoute(
    /\.(?:jpeg|webp|png|gif|jpg|svg)$/,
    // Whenever the app requests images, the service worker checks the
    // cache first for the resource before going to the network.
    workbox.strategies.cacheFirst({
      cacheName: 'pwa-images-cache',
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
  // https://developers.google.com/web/tools/workbox/modules/workbox-strategies#network_first_network_falling_back_to_cache
  // http://localhost:8887/restaurant.html?id=1
  workbox.routing.registerRoute(
    new RegExp('restaurant.html(.*)'),
    workbox.strategies.networkFirst({
      cacheName: 'pwa-restaurants-cache',
      // Status 0 is the response you would get if you request a cross-origin
      // resource and the server that you're requesting it from is not
      // configured to serve cross-origin resources.
      cacheableResponse: {statuses: [0, 200]}
    })
  );

} else {
  console.log(`[DEBUG] Workbox didn't load.`);
}
