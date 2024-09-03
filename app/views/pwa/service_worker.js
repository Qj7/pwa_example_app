self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('documents').then((cache) => cache.addAll(['/manifest.json', '/']))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.protocol.startsWith('http')) {
    let cacheName, shouldCache;

    if (url.pathname.startsWith('/') || url.pathname.endsWith('manifest.json')) {
      cacheName = 'documents';
      shouldCache = true;
    } else if (['script', 'style', 'image'].includes(request.destination)) {
      cacheName = 'assets';
      shouldCache = true;
    }

    if (shouldCache) {
      event.respondWith(
        caches.match(request).then((response) => {
          console.log(`Responding to: ${request.url}`);
          return response || fetch(request).then((networkResponse) => {
            caches.open(cacheName).then((cache) => cache.put(request, networkResponse.clone()));
            console.log(`Using CacheFirst to respond to '${request.url}'`);
            return networkResponse;
          });
        })
      );
    }
  } else {
    console.log(`Skipping caching for unsupported protocol: ${url.protocol}`);
  }
});
