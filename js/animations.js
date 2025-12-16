// Scroll-triggered Animations using Intersection Observer
(function() {
    // Fade-in animation on scroll
    const fadeInElements = document.querySelectorAll('.fade-in');

    if (fadeInElements.length > 0) {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        fadeInElements.forEach(element => {
            fadeInObserver.observe(element);
        });
    }

    // Stagger animation for list items
    const staggerItems = document.querySelectorAll('.stagger-item');

    if (staggerItems.length > 0) {
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        staggerItems.forEach(item => {
            staggerObserver.observe(item);
        });
    }

    // Page load animation
    window.addEventListener('load', () => {
        document.body.classList.add('page-enter');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.bg-white.dark\\:bg-gray-800.rounded-lg.shadow-lg');
    cards.forEach(card => {
        card.classList.add('card-hover');
    });

    // Parallax effect removed - was causing layout issues
})();

