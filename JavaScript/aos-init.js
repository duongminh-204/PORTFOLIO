// aos-init.js
// AOS is already loaded globally via script tag in HTML

if (window.AOS) {
    window.AOS.init({
        duration: 900,
        once: true,
        easing: 'ease-out',
        offset: 80
    });
} else {
    console.warn('AOS library not loaded');
}