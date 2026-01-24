/* SERVICE WORKER - KINE CAMUNDONGO
   Versão atualizada para forçar atualização no cache do navegador.
*/

const CACHE_NAME = 'kine-camundongo-v2-fix';

// Arquivos da interface gráfica para cache
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.jpg'
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
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
