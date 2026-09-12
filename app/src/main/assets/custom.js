window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 🛡️ NUCLEAR PROTECTION (Windows & Android Universal)

// 1. Permanently lock down window.open so ads can't spawn new browser windows
Object.defineProperty(window, 'open', {
    value: function(url) { 
        try {
            if (url) {
                const targetUrl = new URL(url, window.location.origin);
                // Allow internal site links to work normally
                if (targetUrl.hostname === window.location.hostname) {
                    window.location.href = url; 
                    return window;
                }
            }
        } catch(e) {}
        // External ad/scam link -> KILL IT (returns null instead of opening browser)
        return null; 
    },
    writable: false,
    configurable: false
});

// 2. Intercept ALL clicks at the absolute lowest level
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href) {
        // Block Android intents (harmless to keep on Windows)
        if (link.href.startsWith('intent://') || (!link.href.startsWith('http') && !link.href.startsWith('/') && !link.href.startsWith('#'))) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        try {
            const url = new URL(link.href, window.location.origin);
            // Block external domains
            if (url.hostname !== window.location.hostname) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return false;
            }
        } catch (err) {}
    }

    // Kill invisible ad overlays
    if (e.target.tagName !== 'VIDEO' && !e.target.closest('video') && !e.target.closest('button')) {
        const rect = e.target.getBoundingClientRect();
        if (rect.width === window.innerWidth && rect.height === window.innerHeight) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
}, true);

// 3. Watchdog to prevent the site from breaking your blockers
setInterval(() => {
    try {
        if (window.open.toString().includes('location.href')) {
            Object.defineProperty(window, 'open', {
                value: function() { return null; },
                writable: false, configurable: false
            });
        }
    } catch (e) {}
}, 1000);