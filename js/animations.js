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

// Mobile Menu Toggle
(function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');
            
            if (isOpen) {
                mobileMenu.classList.remove('open');
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            } else {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('open');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
})();

// Scroll Spy for Active Navigation
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-nav]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 150; // Offset for navbar
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if we're near the bottom of the page (for contact section)
        const isNearBottom = scrollPos + windowHeight >= documentHeight - 100;
        
        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // For contact section, check if we're near bottom
            if (sectionId === 'contact' && isNearBottom) {
                activeSection = sectionId;
            }
            // For other sections, check normal scroll position
            else if (scrollPos >= sectionTop - 100 && scrollPos < sectionTop + sectionHeight - 100) {
                activeSection = sectionId;
            }
        });
        
        // Update nav links
        if (activeSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-nav') === activeSection) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);
    window.addEventListener('resize', updateActiveNav);
})();

// Back to Top Button
(function() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
        
        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop();
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
})();

// Timeline Expand/Collapse Functionality
(function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const expandBtn = item.querySelector('.expand-btn');
        const expandableContent = item.querySelector('.expandable-content');
        const expandIcon = expandBtn.querySelector('svg');
        
        if (!expandBtn || !expandableContent) return;
        
        // Toggle function
        const toggleExpand = (scrollToItem = false) => {
            const isExpanded = !expandableContent.classList.contains('hidden');
            
            if (isExpanded) {
                // Collapse
                expandableContent.classList.add('hidden');
                expandIcon.style.transform = 'rotate(0deg)';
                item.classList.remove('expanded');
                expandBtn.setAttribute('aria-expanded', 'false');
            } else {
                // Expand
                expandableContent.classList.remove('hidden');
                expandIcon.style.transform = 'rotate(180deg)';
                item.classList.add('expanded');
                expandBtn.setAttribute('aria-expanded', 'true');
                
                // Smooth scroll to item if needed
                if (scrollToItem) {
                    setTimeout(() => {
                        const rect = item.getBoundingClientRect();
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        const itemTop = rect.top + scrollTop - 100; // 100px offset for nav
                        
                        window.scrollTo({
                            top: itemTop,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        };
        
        // Button click handler
        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleExpand(true);
        });
        
        // Card click handler - toggle expand/collapse
        item.addEventListener('click', (e) => {
            // Don't toggle if clicking on the button (handled separately)
            if (e.target.closest('.expand-btn')) return;
            
            toggleExpand(false);
        });
    });
})();

// Typing Animation
(function() {
    const typingElement = document.getElementById('typing-text');
    const cursorElement = document.getElementById('typing-cursor');
    if (!typingElement || !cursorElement) return;

    const text = 'Hi, I am Ainis Vabolis';
    let index = 0;
    let isDeleting = false;
    let currentText = '';

    // Blinking cursor animation
    function blinkCursor() {
        cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
    }
    setInterval(blinkCursor, 530);

    function type() {
        if (!isDeleting && index < text.length) {
            currentText = text.substring(0, index + 1);
            typingElement.textContent = currentText;
            index++;
            setTimeout(type, 100);
        } else if (isDeleting && index > 0) {
            currentText = text.substring(0, index - 1);
            typingElement.textContent = currentText;
            index--;
            setTimeout(type, 50);
        } else if (!isDeleting && index === text.length) {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 2000);
        } else if (isDeleting && index === 0) {
            isDeleting = false;
            setTimeout(type, 500);
        }
    }

    type();
})();

