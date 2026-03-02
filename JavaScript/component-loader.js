// component-loader.js
document.addEventListener('DOMContentLoaded', async () => {
    const sections = [
        { id: 'navbar-placeholder',    file: 'components/navbar.html'    },
        { id: 'hero-placeholder',       file: 'components/hero.html'     },
        { id: 'about-placeholder',      file: 'components/about.html'    },
        { id: 'album-placeholder',      file: 'components/album.html'    },
        { id: 'experience-placeholder', file: 'components/experience.html' },
        { id: 'projects-placeholder',   file: 'components/projects.html' },
        { id: 'skills-placeholder',     file: 'components/skills.html'   },
        { id: 'certificates-placeholder', file: 'components/certificates.html' },
        { id: 'contact-placeholder',    file: 'components/contact.html'  }
    ];

    await Promise.all(
        sections.map(async ({ id, file }) => {
            try {
                const res = await fetch(file);
                if (!res.ok) throw new Error(`Failed to load ${file}`);
                document.getElementById(id).innerHTML = await res.text();
            } catch (err) {
                console.error(err);
            }
        })
    );

    console.log("All sections loaded");
});