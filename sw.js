// Requisiciones POSTECSA — Service Worker v1.7.0
const CACHE_NAME = 'rq-postecsa-v1-7-0';
// Todos los archivos de esta lista deben existir en el repositorio; si falta uno, addAll falla y el SW no se instala.
const PRECACHE = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './logo.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE.map(u => new Request(u, {cache: 'reload'})))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const url = event.request.url;
  if (event.request.method !== 'GET') return;
  // Nunca interceptar Google (GAS, Sheets, fuentes) ni WhatsApp
  if (url.includes('script.google.com') || url.includes('googleusercontent.com') ||
      url.includes('docs.google.com') || url.includes('googleapis.com') ||
      url.includes('gstatic.com') || url.includes('wa.me')) return;
  // HTML, JSON y CSV: siempre la versión más reciente del servidor (evita quedarse con una app vieja en el celular)
  const fresco = event.request.mode === 'navigate' || /\.(html|json|csv)(\?|$)/.test(url) || url.endsWith('/');
  event.respondWith(
    fetch(fresco ? new Request(event.request, {cache: 'no-store'}) : event.request).then(res => {
      if (res && res.status === 200) { const cl = res.clone(); caches.open(CACHE_NAME).then(c => c.put(event.request, cl)); }
      return res;
    }).catch(() => caches.match(event.request))
  );
});
