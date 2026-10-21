/*
 * Orbita · service worker
 * - Al instalarse guarda el núcleo de la app (interfaz, visor 3D, fuentes, íconos).
 * - Los recursos de cada módulo (modelos, fotos, PDF) se guardan al visitarlos
 *   o con el botón "Descargar" de Ayuda; después funcionan sin conexión.
 * Cambia VERSION cada vez que publiques una actualización.
 */
const VERSION = 'v1.0.1';
const CORE_CACHE = 'orbita-core-' + VERSION;
const MODULE_CACHE = 'orbita-modulos-v1';
const CORE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/orbita.css',
  'js/data.js',
  'js/app.js',
  'vendor/model-viewer.min.js',
  'fonts/nunito-latin-400-normal.woff2',
  'fonts/nunito-latin-600-normal.woff2',
  'fonts/nunito-latin-700-normal.woff2',
  'fonts/nunito-latin-800-normal.woff2',
  'img/icons/icon-192.png',
  'img/icons/icon-512.png',
  'img/icons/favicon-64.png',
  'img/instrumentos/erlenmeyer.webp',
  'img/instrumentos/tubo.webp',
  'img/fichas/ficha-m1.webp',
  'img/fichas/ficha-m2.webp',
  'img/fichas/ficha-m3.webp',
  'img/fichas/ficha-m4.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CORE_CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k.startsWith('orbita-core-') && k !== CORE_CACHE).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(MODULE_CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => (req.mode === 'navigate' ? caches.match('index.html') : Response.error()));
    })
  );
});
