
function initAlbumEffects() {
    const albumSection = document.getElementById('album');
    let isAlbumFullscreen = false;

   
    let fullscreenBtn = document.getElementById('albumFullscreenToggle');
    if (!fullscreenBtn) {
       
        fullscreenBtn = document.createElement('button');
        fullscreenBtn.id = 'albumFullscreenToggle';
        fullscreenBtn.className = 'album-fullscreen-btn';
        fullscreenBtn.setAttribute('aria-label', 'Toggle fullscreen');
        fullscreenBtn.title = 'Fullscreen';
        fullscreenBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
      
        if (albumSection && albumSection.querySelector('.album-container')) {
            albumSection.querySelector('.album-container').prepend(fullscreenBtn);
        } else {
            document.body.appendChild(fullscreenBtn);
        }
        console.log('Album fullscreen button created and appended');
    } else {
        console.log('Album fullscreen button already exists');
    }

    if (fullscreenBtn) {
   
        const updateFsBtnPos = () => {
            if (!fullscreenBtn) return;
            const margin = 5;
            if (isAlbumFullscreen) {
               
                fullscreenBtn.style.top = '20px';
                fullscreenBtn.style.right = '20px';
            } else if (albumSection) {
             
                const desc = albumSection.querySelector('.album-container p');
                if (desc) {
                    const rect = desc.getBoundingClientRect();
                   
                    const offset = -10;
                    fullscreenBtn.style.top = (rect.top + margin + offset) + 'px';
                } else {
                    const rect = albumSection.getBoundingClientRect();
                    fullscreenBtn.style.top = (rect.top + margin) + 'px';
                }
              
                const albumRect = albumSection.getBoundingClientRect();
                const horizontalOffset = 20;
                fullscreenBtn.style.right = (window.innerWidth - albumRect.right + margin - horizontalOffset) + 'px';
            }
        };

 
        window.addEventListener('scroll', updateFsBtnPos);
        window.addEventListener('resize', updateFsBtnPos);
      
        document.addEventListener('fullscreenchange', updateFsBtnPos);

       
        updateFsBtnPos();

       
        fullscreenBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                if (!document.fullscreenElement) {
                    if (albumSection && albumSection.requestFullscreen) {
                        await albumSection.requestFullscreen();
                    } else {
                     
                        document.body.classList.add('album-fullscreen');
                        isAlbumFullscreen = true;
                        fullscreenBtn.innerHTML = '<i class="bi bi-fullscreen-exit"></i>';
                        fullscreenBtn.title = 'Exit fullscreen';
                    }
                } else {
                    if (document.exitFullscreen) {
                        await document.exitFullscreen();
                    } else {
                        document.body.classList.remove('album-fullscreen');
                        isAlbumFullscreen = false;
                        fullscreenBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
                        fullscreenBtn.title = 'Fullscreen';
                    }
                }
            } catch (err) {
                console.error('Album fullscreen toggle failed:', err);
            }
        });

      
        document.addEventListener('fullscreenchange', () => {
            const fs = !!document.fullscreenElement;
            isAlbumFullscreen = fs;
              fullscreenBtn.style.display = fs ? 'none' : 'block';

            if (fs) {
                document.body.classList.add('album-fullscreen');
                fullscreenBtn.innerHTML = '<i class="bi bi-fullscreen-exit"></i>';
                fullscreenBtn.title = 'Exit fullscreen';
            } else {
                document.body.classList.remove('album-fullscreen');
                fullscreenBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
                fullscreenBtn.title = 'Fullscreen';
            }
        });

      
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.fullscreenElement) {
                if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
            }
        });
    }

    const swiperContainer = document.querySelector('.albumSwiper');
    if (swiperContainer) {
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
    }

    setTimeout(async () => {
        const realSlides = document.querySelectorAll('.albumSwiper .swiper-slide:not(.swiper-slide-duplicate) img');
        if (realSlides.length === 0) return;

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
            setTimeout(() => {
                const pswpEl = document.querySelector('.pswp');
                if (pswpEl && !pswpEl.querySelector('.pswp-fullscreen-btn')) {
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
}


function waitForAlbumAndInit() {
    const albumContainer = document.querySelector('.albumSwiper');
    if (albumContainer) {
        initAlbumEffects();
    } else {
        setTimeout(waitForAlbumAndInit, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForAlbumAndInit);
} else {
    waitForAlbumAndInit();
}
