const CACHE_NAME = 'sw-cache-dc';
const toCache = [
    '/index.html',
    '/**'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(toCache)
            })
            .then(self.skipWaiting())
    );
    console.log('used to register the service worker')
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match(event.request)
                    })
            })
    );
    console.log('used to intercept requests so we can check for the file or data in the cache');
})

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
            .then((keyList) => {
                return Promise.all(keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[ServiceWorker] Removing old cache', key)
                        return caches.delete(key)
                    }
                }))
            })
            .then(() => self.clients.claim())
    );
    console.log('this event triggers when the service worker activates')
});