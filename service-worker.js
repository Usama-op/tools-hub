// Bump this on every deploy. It's the ONLY thing that forces old caches
// (and therefore old, possibly-buggy HTML/CSS/JS) off a returning user's
// device. Previously the cache-first strategy below meant fixes shipped
// in a new version could sit invisible forever - a returning visitor kept
// getting the stale files straight from cache instead of the network.
const CACHE_VERSION = 'v15';
const SHELL_CACHE = `toolshub-shell-${CACHE_VERSION}`;
const STATIC_CACHE = `toolshub-static-${CACHE_VERSION}`;

// App shell: code that changes on every update. Served network-first so
// fixes are picked up immediately when online; cache is only a fallback
// for offline use.
const SHELL_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './install.js',
  './manifest.json',
  './offline.html',
  './privacy.html',
  './license.html',
];

// Static/binary assets that rarely change. Served cache-first for speed.
const STATIC_ASSETS = [
  './icons-imgs/bg-hero.webp',
  './icons-imgs/bg-hero.jpg',
  './icons-imgs/bg-hero-mobile.webp',
  './icons-imgs/timer-beep.wav',
  './icons-imgs/screenshot-desktop.png',
  './icons-imgs/screenshot-mobile.png',
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
  './icons-imgs/convertico-toolhubicon_512x512.png',
];

// Install: precache the shell and static assets under the new version.
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)),
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
    ]).then(() => self.skipWaiting())
  );
});

// Activate: delete every cache that isn't this version, then take control
// of open tabs immediately so the fix applies without a manual refresh.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((name) => name !== SHELL_CACHE && name !== STATIC_CACHE)
        .map((name) => caches.delete(name))
    )).then(() => self.clients.claim())
  );
});

function isShellRequest(request) {
  if (request.mode === 'navigate') return true;
  return SHELL_ASSETS.some((path) => request.url.endsWith(path.replace('./', '/')) || request.url.endsWith(path));
}

// Network-first for the app shell: always try to get the freshest HTML/
// CSS/JS when online, only falling back to cache when offline.
async function networkFirst(request) {
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.status === 200) {
      const cache = await caches.open(SHELL_CACHE);
      cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (err) {
    const cached = await caches.match(request, { cacheName: SHELL_CACHE });
    if (cached) return cached;
    if (request.mode === 'navigate') {
      return caches.match('./offline.html', { cacheName: SHELL_CACHE });
    }
    throw err;
  }
}

// Cache-first for static assets: fast, cheap, and fine to be a little stale.
async function cacheFirst(request) {
  const cached = await caches.match(request, { cacheName: STATIC_CACHE });
  if (cached) return cached;
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.status === 200) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (err) {
    return cached; // undefined if never cached - browser will show its own offline error
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  if (isShellRequest(request)) {
    event.respondWith(networkFirst(request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});
