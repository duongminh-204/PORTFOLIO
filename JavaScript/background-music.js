// background-music.js
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
            audio.play().catch(console.error);
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