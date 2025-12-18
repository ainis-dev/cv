// Smooth Scroll Navigation
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// Active Navigation Link Highlighting Based on Scroll Position
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const logoLink = document.querySelector('.handwritten-logo');

    // Update logo link to scroll to top
    if (logoLink && logoLink.getAttribute('href') === '/') {
        logoLink.setAttribute('href', '#home');
    }

    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        const navHeight = 80;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Handle top of page
        if (scrollY < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
        }
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
})();


