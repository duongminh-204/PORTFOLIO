// theme-toggle.js
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);

    themeToggle.innerHTML = theme === 'light'
        ? '<i class="bi bi-sun-fill"></i>'
        : '<i class="bi bi-moon-stars-fill"></i>';
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-bs-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});