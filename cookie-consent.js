/**
 * Cookie Consent Manager for Desk-mate.it
 * This script handles the cookie consent functionality including:
 * - Showing the cookie banner on first visit
 * - Storing user preferences
 * - Managing cookie settings modal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieModal = document.getElementById('cookie-modal');
    const acceptAllBtn = document.getElementById('accept-all-cookies');
    const acceptNecessaryBtn = document.getElementById('accept-necessary-cookies');
    const openSettingsBtn = document.getElementById('open-cookie-settings');
    const openModalSettingsBtn = document.getElementById('open-modal-settings');
    const saveSettingsBtn = document.getElementById('save-cookie-settings');
    const closeModalBtn = document.getElementById('close-cookie-modal');
    
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookie_consent');
    
    // Show banner if no consent has been given yet
    if (!hasConsent) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000); // Small delay for better UX
    }
    
    // Event Listeners
    if (acceptAllBtn) {
        acceptAllBtn.addEventListener('click', function() {
            acceptAllCookies();
            hideBanner();
        });
    }
    
    if (acceptNecessaryBtn) {
        acceptNecessaryBtn.addEventListener('click', function() {
            acceptNecessaryCookies();
            hideBanner();
        });
    }
    
    if (openSettingsBtn) {
        openSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    if (openModalSettingsBtn) {
        openModalSettingsBtn.addEventListener('click', function() {
            openModal();
            hideBanner();
        });
    }
    
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            saveSettings();
            closeModal();
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === cookieModal) {
            closeModal();
        }
    });
    
    // Functions
    function hideBanner() {
        cookieBanner.classList.remove('show');
    }
    
    function openModal() {
        // Load current settings into toggles
        loadCurrentSettings();
        cookieModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
    
    function closeModal() {
        cookieModal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    function acceptAllCookies() {
        const settings = {
            necessary: true,
            analytics: true,
            functional: true,
            marketing: false, // Not used currently
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        
        localStorage.setItem('cookie_consent', JSON.stringify(settings));
        enableCookies(settings);
    }
    
    function acceptNecessaryCookies() {
        const settings = {
            necessary: true,
            analytics: false,
            functional: false,
            marketing: false,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        
        localStorage.setItem('cookie_consent', JSON.stringify(settings));
        enableCookies(settings);
    }
    
    function saveSettings() {
        const settings = {
            necessary: true, // Always true
            analytics: document.getElementById('analytics-cookies').checked,
            functional: document.getElementById('functional-cookies').checked,
            marketing: false, // Not used currently
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        
        localStorage.setItem('cookie_consent', JSON.stringify(settings));
        enableCookies(settings);
    }
    
    function loadCurrentSettings() {
        let settings = getConsentSettings();
        
        // Set toggle states
        document.getElementById('necessary-cookies').checked = true; // Always checked and disabled
        document.getElementById('analytics-cookies').checked = settings.analytics;
        document.getElementById('functional-cookies').checked = settings.functional;
        // Marketing cookies are not currently used
    }
    
    function getConsentSettings() {
        const defaultSettings = {
            necessary: true,
            analytics: false,
            functional: false,
            marketing: false,
            timestamp: null,
            version: '1.0'
        };
        
        const storedSettings = localStorage.getItem('cookie_consent');
        return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
    }
    
    function enableCookies(settings) {
        // Enable or disable cookies based on settings
        // This is where you would add or remove actual cookies
        
        // For Google Analytics, for example:
        if (settings.analytics) {
            enableGoogleAnalytics();
        } else {
            disableGoogleAnalytics();
        }
        
        // Other cookie handling can be added here
    }
    
    function enableGoogleAnalytics() {
        // Google Analytics code would go here
        // For example:
        /*
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        
        ga('create', 'UA-XXXXX-Y', 'auto');
        ga('send', 'pageview');
        */
        console.log('Google Analytics enabled');
    }
    
    function disableGoogleAnalytics() {
        // Remove Google Analytics cookies
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.indexOf('_ga') === 0 || cookie.indexOf('_gid') === 0 || cookie.indexOf('_gat') === 0) {
                document.cookie = cookie.split('=')[0] + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            }
        }
        console.log('Google Analytics disabled');
    }
});
