const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

// const self = this;

//Intsall ServiceWorker
self.addEventListener('install', (event) => {
    event.waitUntill(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Opened cache");

                return cache.addAll(urlsToCache);
            })
    )
});


//Listen to Request
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => {
                        caches.match('offline.html')
                    })
            })
    )
});

// Activate the ServiceWorker
self.addEventListener('activate', (event) => {
    const cacheWhiltelist = [];
    cacheWhiltelist.push(CACHE_NAME);

    event.waitUntill(
        caches.keys().then((cacheName)=>{
            if(!cacheWhiltelist.includes(cacheName)){
                return caches.delete(cacheName);
            }
        })
    )
});