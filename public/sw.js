const CACHE_NAME = 'bhima-images-v1'

const IMAGE_EXTENSIONS = /\.(webp|png|jpg|jpeg|svg|gif|woff|woff2|ttf)$/i

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  )

  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const request = event.request

  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // Only cache images/fonts from your billing application
  if (
    url.pathname.startsWith('/events/') &&
    IMAGE_EXTENSIONS.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }

        return fetch(request).then((networkResponse) => {
          if (networkResponse.ok) {
            const responseToCache = networkResponse.clone()

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache)
            })
          }

          return networkResponse
        })
      })
    )
  }
})