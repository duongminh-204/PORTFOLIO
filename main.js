
import './JavaScript/aos-init.js';
import './JavaScript/theme-toggle.js';
import './JavaScript/typed-init.js';
import './JavaScript/smooth-scroll.js';
import './JavaScript/pdf-preview.js';
import './JavaScript/cv-modal.js';
import './JavaScript/album-effects.js';
import './JavaScript/project-tilt.js';
import './JavaScript/background-music.js';
import './JavaScript/component-loader.js';


document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized – Duong Quang Minh');

    
    console.log('• Theme toggle initialized');
    console.log('• Typed.js initialized');
    console.log('• Smooth scrolling enabled');
    console.log('• PDF preview & CV modal ready');
    console.log('• Album Swiper + PhotoSwipe initialized');
    console.log('• Project card tilt effect ready');
    console.log('• Background music controller ready');


});


window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.message, event.filename, event.lineno);
});


window.addEventListener('beforeunload', () => {
    const audio = document.getElementById('bgMusic');
    if (audio) {
        audio.pause();
    }
});