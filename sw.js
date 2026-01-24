/* SERVICE WORKER - KINE CAPIVARA
   Estratégia: Network First para arquivos principais (HTML/Data)
*/

const CACHE_NAME = 'kine-capivara-v1';
const urlsToCache = [
  './icon.png',
  './manifest.json'
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
  // Estratégia Network First: Tenta rede, se falhar, vai pro cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    // Para outros recursos, Cache First (opcional, ou mantemos Network First para garantir)
    // Mantendo Network First geral para garantir update
    event.respondWith(
        fetch(event.request)
          .catch(() => caches.match(event.request))
      );
  }
});
