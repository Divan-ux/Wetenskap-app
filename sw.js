const CACHE_NAME = "science-glass-v1";
const urlsToCache = [
  "./",                         // your main page
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
  // add any other critical assets (CSS, JS) that you host separately
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});