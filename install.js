let deferredPrompt;
const installBtn = document.getElementById('pwa-install-btn');
const banner = document.getElementById('pwa-banner');
const bannerInstallBtn = document.getElementById('banner-install-btn');
const bannerCloseBtn = document.getElementById('banner-close-btn');
const iosModal = document.getElementById('pwa-ios-modal');

// Check if user dismissed the banner recently (e.g., within 24 hours)
const isBannerDismissed = () => {
    const dismissedAt = localStorage.getItem('pwa_banner_dismissed');
    if (!dismissedAt) return false;
    const hoursElapsed = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60);
    return hoursElapsed < 24; 
};

// Handle "Install App" prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show the static corner button
    installBtn.style.display = 'flex';

    // Show the automatic popup/banner after 2 seconds if not dismissed
    if (!isBannerDismissed()) {
        setTimeout(() => {
            banner.style.display = 'flex';
            setTimeout(() => banner.classList.add('show'), 100);
        }, 2000);
    }
});

const triggerInstall = async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            installBtn.style.display = 'none';
            closeBanner();
        }
        deferredPrompt = null;
    }
};

const closeBanner = () => {
    banner.classList.remove('show');
    localStorage.setItem('pwa_banner_dismissed', Date.now().toString());
    setTimeout(() => {
        banner.style.display = 'none';
    }, 600);
};

installBtn.addEventListener('click', triggerInstall);
bannerInstallBtn.addEventListener('click', triggerInstall);
bannerCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeBanner();
});

// iOS detection
const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
};
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

if (isIos() && !isInStandaloneMode()) {
    // Show install btn for iOS to trigger instructions
    installBtn.style.display = 'flex';
    installBtn.onclick = () => {
        iosModal.style.display = 'flex';
    };
}

document.querySelector('.close-modal')?.addEventListener('click', () => {
    iosModal.style.display = 'none';
});

window.addEventListener('appinstalled', () => {
    installBtn.style.display = 'none';
});