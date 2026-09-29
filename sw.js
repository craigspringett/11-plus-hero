// Offline support: keeps a copy of every file so the app opens without
// internet. Bump VERSION whenever any file changes so phones pick it up.
const VERSION = 'eleven-plus-hero-1.1.4';
const FILES = [
  './', 'index.html', 'manifest.webmanifest', 'css/app.css',
  'fonts/fredoka.woff2', 'fonts/nunito.woff2',
  'icons/icon.svg', 'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png',
  'js/main.js', 'js/engine.js', 'js/state.js', 'js/util.js', 'js/art.js', 'js/sound.js',
  'js/content/maths.js', 'js/content/spelling.js', 'js/content/grammar.js', 'js/content/vocab.js', 'js/content/reading.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Newest version first whenever there's internet (so updates are never
// stuck behind an old copy); the saved copy if offline or if the network
// takes more than 4 seconds (slow bedtime Wi-Fi).
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  const fromCache = () => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html'));
  const fromNetwork = fetch(e.request, { cache: 'no-cache' }).then((res) => {
    if (res.ok) {
      const copy = res.clone();
      caches.open(VERSION).then((c) => c.put(e.request, copy));
    }
    return res;
  });
  const slow = new Promise((resolve) => setTimeout(resolve, 4000)).then(fromCache);
  e.respondWith(
    Promise.race([fromNetwork.catch(fromCache), slow.then((r) => r || fromNetwork)])
  );
});
