const CACHE_NAME = 'toolshub-cache-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './install.js',
  './manifest.json',
  './offline.html',
  './icons-imgs/1234.png',
  './icons-imgs/convertico-toolhubicon_16x16.png',
  './icons-imgs/convertico-toolhubicon_32x32.png',
  './icons-imgs/convertico-toolhubicon_48x48.png',
  './icons-imgs/convertico-toolhubicon_64x64.png',
  './icons-imgs/convertico-toolhubicon_72x72.png',
  './icons-imgs/convertico-toolhubicon_96x96.png',
  './icons-imgs/convertico-toolhubicon_128x128.png',
  './icons-imgs/convertico-toolhubicon_144x144.png',
  './icons-imgs/convertico-toolhubicon_152x152.png',
  './icons-imgs/convertico-toolhubicon_192x192.png',
  './icons-imgs/convertico-toolhubicon_384x384.png',
  './icons-imgs/convertico-toolhubicon_512x512.png'
];


// Install Event: Cache all essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).then(() => {
        self.skipWaiting();
      });
    })
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
                  .map((name) => caches.delete(name))
      ).then(() => {
        self.clients.claim();
      });
    })
  );
});

// Fetch Event: Serve from cache, then network with network fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request).then((fetchResponse) => {
        // Cache new resources
        if (fetchResponse.status === 200) {
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return fetchResponse;
      }).catch(() => {
        // Offline fallback
        if (event.request.mode === 'navigate') {
          return caches.match('./offline.html');
        }
        // Return cached assets even if expired
        return caches.match(event.request);
      });
    })
  );
});