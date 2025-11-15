const CACHE_NAME = 'lokafit-v1'
const API_CACHE_NAME = 'lokafit-api-v1'
const IMAGE_CACHE_NAME = 'lokafit-images-v1'

const urlsToCache = [
  '/',
  '/home',
  '/login',
  '/manifest.json',
  '/offline.html',
]

// Install event - Cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
  self.skipWaiting()
})

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== CACHE_NAME &&
            cacheName !== API_CACHE_NAME &&
            cacheName !== IMAGE_CACHE_NAME
          ) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - Different strategies for different resources
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // API requests - Network first, fallback to cache
  if (url.pathname.includes('/api/')) {
    return event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response
          }
          const responseClone = response.clone()
          caches.open(API_CACHE_NAME).then((cache) => {
            cache.put(request, responseClone)
          })
          return response
        })
        .catch(() => {
          return caches.match(request)
        })
    )
  }

  // Image requests - Cache first
  if (request.destination === 'image') {
    return event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request).then((response) => {
            if (!response || response.status !== 200) {
              return response
            }
            const responseClone = response.clone()
            caches.open(IMAGE_CACHE_NAME).then((cache) => {
              cache.put(request, responseClone)
            })
            return response
          })
        )
      })
    )
  }

  // Default - Network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response || response.status !== 200) {
          return response
        }
        const responseClone = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone)
        })
        return response
      })
      .catch(() => {
        return caches.match(request).then((response) => {
          return response || caches.match('/offline.html')
        })
      })
  )
})

// Background sync for wardrobe updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-wardrobe') {
    event.waitUntil(syncWardrobe())
  }
})

async function syncWardrobe() {
  try {
    const cache = await caches.open(API_CACHE_NAME)
    const response = await fetch('/api/v1/wardrobe/sync', {
      method: 'POST',
    })
    if (response.ok) {
      await cache.put('/api/v1/wardrobe/items', response.clone())
    }
  } catch (error) {
    console.error('Wardrobe sync failed:', error)
  }
}

// Message handler for cache clearing
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName)
      })
    })
  }
})
