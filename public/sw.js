/* English Up GitHub Pages: scope-safe offline shell. No credentials or remote calls. */
const VERSION='english-up-pages-16';
const CACHE=VERSION+'-static';
const ROOT=self.registration.scope;
const absolute=path=>new URL(path, ROOT).href;
const CORE=['./','offline.html','manifest.webmanifest','icon-192.png','icon-512.png'].map(absolute);
self.addEventListener('install', event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await Promise.all(CORE.map(url=>cache.add(url).catch(()=>undefined)));
  await self.skipWaiting();
 })());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const names=await caches.keys();
  await Promise.all(names.filter(n=>n.startsWith('english-up-')&&n!==CACHE).map(n=>caches.delete(n)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(ROOT)||req.headers.has('authorization'))return;
 if(req.mode==='navigate'){
  event.respondWith((async()=>{
   try{const response=await fetch(req);if(response.ok){const cache=await caches.open(CACHE);await cache.put(absolute('./'),response.clone());}return response;}
   catch{return await caches.match(absolute('./'))||await caches.match(absolute('offline.html'))||Response.error();}
  })());return;
 }
 if(/\/_next\/static\//.test(url.pathname)||/\/(icon-\d+\.png|manifest\.webmanifest)$/.test(url.pathname)){
  event.respondWith((async()=>{
   const cached=await caches.match(req);if(cached)return cached;
   try{const response=await fetch(req);if(response.ok){const cache=await caches.open(CACHE);await cache.put(req,response.clone());}return response;}catch{return Response.error();}
  })());
 }
});
