const staticQuickChatWs = "dev-quickchat-for-whatsapp"
const assets = [
    "/",
    "/index.html",
    "/assets/css/style.css",
    "/assets/js/main.js",
    "/assets/images/send-icon.svg",
    "/assets/images/ws-icon.svg",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticQuickChatWs).then(cache => {
            cache.addAll(assets)
        })
    )
})


self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})
