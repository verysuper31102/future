const CACHE_NAME = 'carelink-v2';

const getBasePath = () => {
  if (typeof self !== 'undefined' && self.location) {
    const pathname = self.location.pathname;
    if (pathname.startsWith('/future')) {
      return '/future/';
    }
  }
  return '/future/';
};

const BASE = getBasePath();

const urlsToCache = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'apple-touch-icon.png',
  BASE + 'pwa-192x192.png',
  BASE + 'pwa-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.warn('SW cache addAll warning:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
