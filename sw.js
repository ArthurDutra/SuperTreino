/* SERVICE WORKER - KINE TAMANDUÁ v1
   Estratégia: Network First para arquivos principais (HTML/Data)
*/

const CACHE_NAME = 'kine-tamandua-v1';
const urlsToCache = [
  './icon.png',
  './manifest.json',
  './kine.png',
  './spotify.png',
  './youtube.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    event.respondWith(
        fetch(event.request)
          .catch(() => caches.match(event.request))
      );
  }
});
