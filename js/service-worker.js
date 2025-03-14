const CACHE_NAME = "music-player-cache-v1";
const assets = [
    "/",
    "/index.html",
    "/manifest.json",
    "/media/icon-192x192.png",
    "/media/icon-512x512.png",
    "/styles.css",
    "/script.js"
];

// Install event
self.addEventListener("install", (event) => {
    console.log("Service Worker Installing...");
    event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated!");
});

self.addEventListener("fetch", (event) => {
    console.log("Fetching:", event.request.url);
});

