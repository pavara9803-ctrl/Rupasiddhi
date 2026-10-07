

const CACHE_NAME = 'pada-rupasiddhi-v4';

// Offline භාවිතය සඳහා Cache කරගත යුතු සියලුම අත්‍යවශ්‍ය ගොනු ලැයිස්තුව
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/themes.css',
  './css/main.css',
  './css/shadakara.css',
  './js/app.js',
  './js/shadakara-view.js',
  './data/0_shadakara_intro/shadakara_details.js',
  './data/1_sandhi/01_sanna.js',
  './data/1_sandhi/02_sara.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// 1. Service Worker Install වීම හා ගොනු Cache කිරීම
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] සියලු ගොනු Cache කරමින් පවතී...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// 2. පැරණි Caches ඉවත් කිරීම (Activate වීම)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] පැරණි Cache ඉවත් කරමින්:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// 3. Network First / Cache Fallback මඟින් දත්ත ලබාදීම (Offline Support)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // අලුතින් ඉල්ලූ සාර්ථක සම්පත්ද Cache වෙත එකතු කර ගැනීම
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Offline අවස්ථාවේදීද අත්‍යවශ්‍ය මූලික පිටුව ලබාදීම
        if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
