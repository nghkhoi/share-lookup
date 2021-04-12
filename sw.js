//Basic asset-caching
var CACHE='tmp-share-lookup-cache';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll([
        '/share-lookup/',
        '/share-lookup/index.html',
        '/share-lookup/app.webmanifest',
        '/share-lookup/icons/android-chrome-192x192.png',
        '/share-lookup/icons/android-chrome-512x512.png',
        '/share-lookup/icons/apple-touch-icon.png',
        '/share-lookup/icons/favicon-16x16.png',
        '/share-lookup/icons/favicon-32x32.png',
        '/share-lookup/icons/favicon.ico'
      ]);
    })
  );
 });
 
self.addEventListener('fetch', function(e) {
  e.respondWith(fromCache(e.request));
});

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request, { ignoreSearch: true }).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}