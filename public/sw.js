// navigator.serviceWorker.getRegistration('/sw.js').then((registration) => {
//   if (registration) {
//     registration.unregister().then(() => {
//       console.log('Service worker unregistered');
//     });
//   }
// });


// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     // Get all cache keys (names)
//     caches.keys().then((cacheNames) => {
//       // Delete all caches
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           return caches.delete(cacheName);
//         })
//       );
//     }).then(() => {
//       console.log('All caches cleared.');
//     })
//   );
// });


const CACHE_NAME = 'dynamic-cache-v1';
const EXPIRATION_TIME = 60 * 60 * 24 * 7; // 1 week in seconds

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', (event) => {
  const { destination } = event.request;

  // Cache images, JavaScript, and CSS files
  if (['image', 'script', 'style'].includes(destination)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return caches.open(CACHE_NAME).then(async (cache) => {
            const metadata = await cache.match(event.request.url + '-metadata');

            if (metadata) {
              const { timestamp } = await metadata.json();
              const now = Date.now();
              if (now - timestamp > EXPIRATION_TIME * 1000) {
                // Cache expired, remove it
                cache.delete(event.request);
                cache.delete(event.request.url + '-metadata');
                return fetchAndCache(event, cache); // Fetch and cache new file
              }
            }
            return cachedResponse; // Return cached response if not expired
          });
        } else {
          return caches.open(CACHE_NAME).then((cache) => {
            return fetchAndCache(event, cache); // Fetch and cache new file
          });
        }
      })
    );
  }
});

// Helper function to fetch and cache files with metadata (timestamp)
function fetchAndCache(event, cache) {
  return fetch(event.request).then((networkResponse) => {
    const clonedResponse = networkResponse.clone();

    // Store the file in the cache
    cache.put(event.request, clonedResponse);

    // Store the timestamp in the cache
    const metadata = { timestamp: Date.now() };
    const metadataBlob = new Blob([JSON.stringify(metadata)], {
      type: 'application/json',
    });
    cache.put(
      event.request.url + '-metadata',
      new Response(metadataBlob)
    );

    return networkResponse;
  });
}
