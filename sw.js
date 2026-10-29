// Leiden service worker: offline shell, network-first for the page so updates arrive immediately.
const CACHE = 'leiden-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', e=>{
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts: cache-first
  if(FONT_HOSTS.includes(url.hostname)){
    e.respondWith(caches.match(req).then(hit=>hit || fetch(req).then(res=>{
      const copy = res.clone();
      caches.open(CACHE).then(c=>c.put(req, copy));
      return res;
    })));
    return;
  }

  // GitHub API and other origins are never cached (sync must always be live)
  if(url.origin !== self.location.origin) return;

  // Same origin: network-first, fall back to cache offline
  e.respondWith(fetch(req).then(res=>{
    if(res.ok){
      const copy = res.clone();
      caches.open(CACHE).then(c=>c.put(req, copy));
    }
    return res;
  }).catch(()=>caches.match(req).then(hit=>hit || (req.mode==='navigate' ? caches.match('./index.html') : undefined))));
});
