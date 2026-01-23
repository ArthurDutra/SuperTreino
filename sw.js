/* SERVICE WORKER - CAPIVARA CIBERNÉTICA
   Responsável por manter o App carregado mesmo com internet instável,
   mas agora o App exige conexão para buscar dados frescos do Firebase.
*/

const CACHE_NAME = 'super-treino-capivara-v2';

// Arquivos da interface gráfica para cache
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.jpg'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Ativa imediatamente
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
            return caches.delete(cacheName); // Limpa versões antigas
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
