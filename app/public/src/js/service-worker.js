
// #######################################################
// ##### INSTALLABLE PWA AND OFFLINE FUNCTIONABILITY #####
// #######################################################

const CACHE_NAME = 'sw-cache';
const toCache = [
  '/',
  // check path
  '/src/js/pwa.js',
  '/src/js/status.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(toCache)
      })
      .then(self.skipWaiting())
  )
})



// #######################################################
// ############## FETCH OFFLINE RESOURCES ################
// #######################################################

// This checks every request that is made on the page.
// If it can be served by using the cache, it will use the cached file.

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match(event.request)
          })
      })
  )
})



// #######################################################
// ################### ACTIVATE WORKER ###################
// #######################################################

// activate the worker and refresh the cache 

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
  )
})