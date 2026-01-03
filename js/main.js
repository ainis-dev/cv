// Smooth Scroll Navigation
(function() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    let isSmoothScrolling = false;
    let scrollTargetId = null;
    
    // Expose flag to other functions
    window.navScrollState = {
        isSmoothScrolling: false,
        scrollTargetId: null
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetId = target.getAttribute('id');
                const offsetTop = target.offsetTop - 80;
                
                // Set flag to prevent scroll-based highlighting during smooth scroll
                isSmoothScrolling = true;
                scrollTargetId = targetId;
                window.navScrollState.isSmoothScrolling = true;
                window.navScrollState.scrollTargetId = targetId;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Immediately highlight the clicked nav link
                if (anchor.classList.contains('nav-link')) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    anchor.classList.add('active');
                }
                
                // Reset flag after smooth scroll completes (estimate ~1000ms for long scrolls)
                const scrollDistance = Math.abs(window.pageYOffset - offsetTop);
                const estimatedDuration = Math.min(scrollDistance / 2, 1000);
                
                setTimeout(() => {
                    isSmoothScrolling = false;
                    scrollTargetId = null;
                    window.navScrollState.isSmoothScrolling = false;
                    window.navScrollState.scrollTargetId = null;
                }, estimatedDuration + 100);
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
        // Don't update if we're in the middle of a smooth scroll animation
        if (window.navScrollState && window.navScrollState.isSmoothScrolling) {
            // Keep the clicked section highlighted during smooth scroll
            const targetId = window.navScrollState.scrollTargetId;
            if (targetId) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${targetId}`) {
                        link.classList.add('active');
                    }
                });
            }
            return;
        }
        
        const scrollY = window.pageYOffset || window.scrollY;
        const navHeight = 80;
        const viewportTop = scrollY + navHeight; // Top of viewport after navbar
        const viewportBottom = scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        let currentSection = null;

        // Special case: if we're near the bottom of the page, select the last section (contact)
        if (viewportBottom >= documentHeight - 100) {
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                const lastSectionId = lastSection.getAttribute('id');
                if (lastSectionId !== 'home') {
                    currentSection = lastSectionId;
                }
            }
        }

        // Find the last section whose top we've scrolled past
        // This handles short sections correctly - we select the section we're currently in
        if (!currentSection) {
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const sectionTop = section.offsetTop;
                const sectionId = section.getAttribute('id');
                
                // Skip home section for nav highlighting
                if (sectionId === 'home') continue;
                
                // If we've scrolled past this section's top (with some tolerance)
                if (viewportTop >= sectionTop - 100) {
                    // Check if we haven't reached the next section yet
                    const nextSection = sections[i + 1];
                    if (!nextSection || viewportTop < nextSection.offsetTop - 100) {
                        currentSection = sectionId;
                        break; // Found the right section, stop looking
                    }
                }
            }
        }

        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        // Handle top of page - remove all active states
        if (scrollY < 150) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
        }
    }

    // Throttle scroll events for better performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Detect when smooth scroll ends by checking if scroll position has stabilized
    let scrollEndTimeout;
    let lastScrollY = window.pageYOffset;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollEndTimeout);
        scrollEndTimeout = setTimeout(() => {
            // Scroll has stopped
            if (window.navScrollState && window.navScrollState.isSmoothScrolling) {
                window.navScrollState.isSmoothScrolling = false;
                window.navScrollState.scrollTargetId = null;
                updateActiveNav(); // Update once scroll is complete
            }
        }, 150);
    }, { passive: true });
    
    updateActiveNav();
})();


