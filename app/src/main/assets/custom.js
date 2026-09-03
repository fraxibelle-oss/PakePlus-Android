window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
// (Upgraded version to block scam redirects)

const hookClick = (e) => {
    const origin = e.target.closest('a');
    const isBaseTargetBlank = document.querySelector('head base[target="_blank"]');
    
    if (origin && origin.href) {
        try {
            const linkUrl = new URL(origin.href);
            // 🚫 AD BLOCKER LOGIC: If the link goes to a different domain, KILL IT.
            if (linkUrl.hostname !== window.location.hostname) {
                e.preventDefault();
                e.stopPropagation(); // Stop the click from bubbling up
                console.log('Blocked external ad click:', origin.href);
                return;
            }
        } catch (err) {
            // Invalid URL, ignore
        }

        // 🟢 PAKEPLUS LOGIC: Allow internal site navigation to work normally
        if (origin.target === '_blank' || isBaseTargetBlank) {
            e.preventDefault();
            console.log('Handling internal link:', origin.href);
            location.href = origin.href;
        }
    }
};

// 🚫 BLOCK window.open completely (Ads use this to pop up new browser windows)
window.open = function (url, target, features) {
    console.log('Blocked window.open ad attempt:', url);
    return null; // Returning null prevents the app from navigating away!
};

document.addEventListener('click', hookClick, { capture: true });