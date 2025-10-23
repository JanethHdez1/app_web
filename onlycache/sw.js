const offlinePage = './offline.html';
const cacheName = 'offline-cache-v1';


const assetsToCache = [
  './',
  './index.html',
  './pages/conocenos.html',
  './pages/oferta.html',
  './offline.html',
  './main.js'
];



self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(assetsToCache);
      })
      .then(() => self.skipWaiting())
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then(networkResponse => {
            return caches.open(cacheName).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          })
          .catch(() => {
            if (event.request.mode === 'navigate') {
              return caches.match(offlinePage);
            }
          });
      })
  );
});

