importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");

const { CacheFirst } = workbox.strategies;
const { registerRoute } = workbox.routing;

registerRoute(
  ({ url, request }) => url.pathname.startsWith('/') || url.pathname.endsWith('manifest.json'),
  new CacheFirst({
    cacheName: 'documents',
  })
);

registerRoute(
  ({ request }) => ['script', 'style', 'image'].includes(request.destination),
  new CacheFirst({
    cacheName: 'assets',
  })
);

