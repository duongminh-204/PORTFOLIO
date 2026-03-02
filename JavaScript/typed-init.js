// typed-init.js
function initTyped() {
    const typedElem = document.getElementById('typed');
    if (!typedElem) return;

    new Typed('#typed', {
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
}

initTyped();