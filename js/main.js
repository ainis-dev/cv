// Active Navigation Link Highlighting
(function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Remove leading/trailing slashes and .html for comparison
        const normalizedLink = linkHref.replace(/^\/|\/$/g, '').replace(/\.html$/, '');
        const normalizedPath = currentPath.replace(/^\/|\/$/g, '').replace(/\.html$/, '');
        
        // Check if current path matches the link
        if (normalizedPath === normalizedLink || 
            (normalizedPath === '' && (normalizedLink === '' || normalizedLink === 'index.html')) ||
            (normalizedPath.endsWith(normalizedLink) && normalizedLink !== '')) {
            link.classList.add('active');
        }
    });
})();

// Smooth Scroll Navigation
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
})();


