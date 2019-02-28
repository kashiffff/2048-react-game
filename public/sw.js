
var cacheName = 'shell-content1';
var filesToCache = [
  '../src/App.js',
  '../src/App.css',
  '../src/index.js',
  '../src/index.css',
  '../src/App.test.js',
  

  '/',
];

self.addEventListener('activate', function (e) {

    e.waitUntil(
        
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })

    );
    return self.clients.claim();
});

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function (e) {

    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );

});