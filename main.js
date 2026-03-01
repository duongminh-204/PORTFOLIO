// AOS Initialization
AOS.init({
    duration: 900,
    once: true,
    easing: 'ease-out',
    offset: 80
});

// Handle profile image click - open modal
// console.log('Script loaded, looking for profile image...');
// const profileImg = document.querySelector('.profile-img');
// console.log('Profile image found:', profileImg);

// if (profileImg) {
//     console.log('Attaching click listener to profile image');
//     profileImg.addEventListener('click', function (e) {
//         console.log('Profile image clicked!');
//         e.preventDefault();
//         e.stopPropagation();
//         const modalEl = document.getElementById('profileModal');
//         console.log('Modal element:', modalEl);
//         if (modalEl) {
//             const modal = new bootstrap.Modal(modalEl);
//             modal.show();
//             console.log('Modal shown');
//         } else {
//             console.error('Modal element not found!');
//         }
//     });
// } else {
//     console.error('Profile image not found!');
// }

// Typed.js - Hero typing effect
const typed = new Typed('#typed', {
    strings: [
        '.NET Backend Developer',
        'ASP.NET Core Specialist',
        'Real-time Systems Engineer',
        'Scalable Backend Builder'
    ],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 1800,
    loop: true
});

// Theme Toggle (dark/light)
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'light') {
        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    } else {
        themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
    }
}

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-bs-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Smooth scroll for nav links (optional enhancement)
document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});




const cvUrl = 'assets/cv/DuongQuangMinh_CV.pdf';

async function loadPdfPreview() {
    const loadingElement = document.getElementById('previewLoading');
    const canvas = document.getElementById('pdfPreviewCanvas');

    if (!canvas) return;

    try {

        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.mjs';

        const pdf = await pdfjsLib.getDocument(cvUrl).promise;
        const page = await pdf.getPage(1);

        const scale = 2.1;
        const viewport = page.getViewport({ scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: canvas.getContext('2d'),
            viewport: viewport
        };

        await page.render(renderContext).promise;


        if (loadingElement) loadingElement.style.display = 'none';

    } catch (error) {
        console.error('Lỗi khi render preview CV:', error);
        if (loadingElement) {
            loadingElement.innerHTML = 'Không thể tải preview CV<br><small>Vui lòng thử "Xem CV đầy đủ"</small>';
        }
    }
}


window.addEventListener('load', loadPdfPreview);



document.getElementById('previewTrigger').addEventListener('click', function () {
    const fullIframe = document.getElementById('pdfViewerIframe');
    const loading = document.getElementById('pdfLoading');

    if (loading) loading.style.display = 'block';

    fullIframe.src = cvUrl;

    const cvModal = new bootstrap.Modal(document.getElementById('cvModal'));
    cvModal.show();

    fullIframe.onload = () => {
        if (loading) loading.style.display = 'none';
    };

    document.getElementById('cvModal').addEventListener('hidden.bs.modal', function () {
        fullIframe.src = '';
        if (loading) loading.style.display = 'block';
    }, { once: true });
});

// Simple mouse tilt for project cards
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const tiltX = (y / rect.height) * 20;
        const tiltY = -(x / rect.width) * 20;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.04)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Background Music Control
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');
    const toggleBtn = document.getElementById('musicToggle');

    if (!audio || !toggleBtn) return;

    let isPlaying = false;

    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            audio.muted = true;
            toggleBtn.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
            toggleBtn.classList.remove('playing');
            isPlaying = false;
        } else {
            audio.muted = false;
            audio.volume = 0.25;
            audio.play().catch(e => {
                console.error("Không thể phát nhạc:", e);
            });
            toggleBtn.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
            toggleBtn.classList.add('playing');
            isPlaying = true;
        }
    });

    audio.addEventListener('ended', () => {
        if (isPlaying) {
            audio.currentTime = 0;
            audio.play();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Album Fullscreen Toggle
    const fullscreenBtn = document.getElementById('albumFullscreenToggle');
    const albumSection = document.getElementById('album');
    let isAlbumFullscreen = false;

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            isAlbumFullscreen = !isAlbumFullscreen;
            
            if (isAlbumFullscreen) {
                document.body.classList.add('album-fullscreen');
                fullscreenBtn.innerHTML = '<i class="bi bi-fullscreen-exit"></i>';
                fullscreenBtn.title = 'Exit fullscreen';
                albumSection.style.transitionProperty = 'all';
                albumSection.style.transitionDuration = '0.4s';
            } else {
                document.body.classList.remove('album-fullscreen');
                fullscreenBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
                fullscreenBtn.title = 'Fullscreen';
            }
        });

        // Exit fullscreen with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isAlbumFullscreen) {
                isAlbumFullscreen = true; // Set to true so toggle will set it to false
                fullscreenBtn.click();
            }
        });
    }

    new Swiper('.albumSwiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        speed: 900,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        coverflowEffect: {
            rotate: 45,
            stretch: 0,
            depth: 180,
            modifier: 1.4,
            slideShadows: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });


    setTimeout(async () => {
        const realSlides = document.querySelectorAll('.albumSwiper .swiper-slide:not(.swiper-slide-duplicate) img');

      
        const galleryItems = await Promise.all(
            Array.from(realSlides).map(img => {
                return new Promise((resolve) => {
                    const image = new Image();
                    image.onload = () => {
                        resolve({
                            src: img.src,
                           
                            width: image.naturalWidth,
                            height: image.naturalHeight
                        });
                    };
                    image.onerror = () => {
                        
                        console.warn('Could not load image for dimensions, using defaults', img.src);
                        resolve({ src: img.src, width: 800, height: 600 });
                    };
                    image.src = img.src;
                });
            })
        );

        const lightbox = new PhotoSwipeLightbox({
            dataSource: galleryItems,
            pswpModule: PhotoSwipe,
            wheelToZoom: true,
            pinchToClose: true,
            showHideAnimationType: 'zoom',
            bgOpacity: 0.98,
            padding: { top: 30, bottom: 40, left: 10, right: 10 }
        });

        lightbox.init();
        // Add a fullscreen toggle button into the PhotoSwipe lightbox when opened
        function createPswpFullscreenButton(pswpEl) {
            const btn = document.createElement('button');
            btn.className = 'pswp-fullscreen-btn';
            btn.setAttribute('aria-label', 'Toggle fullscreen');
            btn.title = 'Fullscreen';
            btn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
            pswpEl.appendChild(btn);

            const toggleFs = async () => {
                try {
                    if (!document.fullscreenElement) {
                        await (pswpEl.requestFullscreen ? pswpEl.requestFullscreen() : document.documentElement.requestFullscreen());
                    } else {
                        await document.exitFullscreen();
                    }
                } catch (err) {
                    console.error('Fullscreen toggle failed:', err);
                }
            };

            btn.addEventListener('click', toggleFs);

            const fsChangeHandler = () => {
                if (!document.fullscreenElement) {
                    btn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
                    btn.title = 'Fullscreen';
                } else {
                    btn.innerHTML = '<i class="bi bi-fullscreen-exit"></i>';
                    btn.title = 'Exit fullscreen';
                }
            };

            document.addEventListener('fullscreenchange', fsChangeHandler);

            return { btn, fsChangeHandler };
        }

        lightbox.on && lightbox.on('open', () => {
            // small delay to ensure PhotoSwipe DOM exists
            setTimeout(() => {
                const pswpEl = document.querySelector('.pswp');
                if (pswpEl && !pswpEl.querySelector('.pswp-fullscreen-btn')) {
                    // store reference globally so we can clean up on close
                    window.__pswpFs = createPswpFullscreenButton(pswpEl);
                }
            }, 60);
        });

        lightbox.on && lightbox.on('close', () => {
            if (window.__pswpFs) {
                const { btn, fsChangeHandler } = window.__pswpFs;
                try {
                    if (btn && btn.parentNode) btn.parentNode.removeChild(btn);
                    document.removeEventListener('fullscreenchange', fsChangeHandler);
                } catch (e) { console.warn(e); }

                // If still in fullscreen, exit
                if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => { });
                }

                window.__pswpFs = null;
            }
        });

        realSlides.forEach((img, index) => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                lightbox.loadAndOpen(index);
            });
        });

        console.log('PhotoSwipe đã fix thành công với', galleryItems.length, 'ảnh');
    }, 600);
});
