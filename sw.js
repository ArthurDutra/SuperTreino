const CACHE_NAME = 'kine-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './kine.png',
  './spotify.png',
  './youtube.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
