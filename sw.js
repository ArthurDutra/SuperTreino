/* SERVICE WORKER - KINE FORMIGA (FIX)
   Versão corrigida para instalação PWA.
*/

const CACHE_NAME = 'kine-formiga-fix-v2';

// CORREÇÃO: Caminhos com /Kine/
const urlsToCache = [
  '/Kine/',
  '/Kine/index.html',
  '/Kine/manifest.json',
  '/Kine/icon.png'
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
