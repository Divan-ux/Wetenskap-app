const CACHE_NAME = "science-glass-v2";
const urlsToCache = [
  "./",
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
  "logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Notification scheduling
self.addEventListener("message", event => {
  if (event.data && event.data.action === "scheduleNotifications") {
    const events = event.data.events;
    events.forEach(ev => {
      const delay = ev.time - Date.now();
      if (delay > 0) {
        setTimeout(() => {
          self.registration.showNotification(ev.title, {
            body: ev.body || "",
            icon: "icon-192.png",
            badge: "icon-192.png",
            tag: ev.id,
            requireInteraction: true
          });
        }, delay);
      }
    });
    // Daily recurrence
    scheduleDaily();
  }
});

function scheduleDaily() {
  const now = new Date();
  const next8am = new Date(now);
  next8am.setHours(8, 0, 0, 0);
  if (next8am <= now) next8am.setDate(next8am.getDate() + 1);
  const delay = next8am.getTime() - now.getTime();
  setTimeout(() => {
    self.registration.showNotification("📚 Daily Reminder", {
      body: "Check your countdown – keep pushing!",
      icon: "icon-192.png",
      tag: "daily"
    });
    scheduleDaily();
  }, delay);
}
