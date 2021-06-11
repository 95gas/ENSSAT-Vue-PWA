// we react to events that
// we cannot access DOM from serviceWorker
// installable and offline functionable pwa

self.addEventListener('install', function() {
    console.log('SW installed');
    // store files in cache
});

// event fetch for fetching file from cache   --> OFFLINE