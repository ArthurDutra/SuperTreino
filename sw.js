/* SERVICE WORKER - CONTROLE DE CACHE OFFLINE
   Versão: Tatu-Bola
   Função: Guarda os arquivos no celular para o app abrir sem internet.
*/

// Nome da versão do Cache (Alterar isso força o celular a baixar tudo de novo)
const CACHE_NAME = 'super-treino-tatu-bola-v1';

// Lista de arquivos para salvar
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.jpg' // Certifique-se que o arquivo de imagem é .jpg
];

// 1. INSTALAÇÃO: Baixa os arquivos
self.addEventListener('install', event => {
  self.skipWaiting(); // Força o novo SW a assumir controle imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 2. ATIVAÇÃO: Limpa caches antigos (Mico-Leão, Fenix, etc)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            // Apaga versões velhas para liberar espaço e garantir atualizações
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. INTERCEPTAÇÃO: Serve arquivos do cache se estiver offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
