// Bouncing Ball Animation
(function() {
    const ball = document.getElementById('bouncing-ball');
    if (!ball) return;
    
    // Don't initialize on mobile devices
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        ball.style.display = 'none';
        return;
    }
    
    // Get navbar and footer elements
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    
    // Function to get navbar height
    function getNavbarHeight() {
        if (!navbar) return 0;
        return navbar.offsetHeight;
    }
    
    // Function to get footer height
    function getFooterHeight() {
        if (!footer) return 0;
        const rect = footer.getBoundingClientRect();
        // Only count footer if it's visible in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            return footer.offsetHeight;
        }
        return 0;
    }
    
    // Ball properties
    const radius = 24; // Half of ball size (48px / 2)
    const navbarHeight = getNavbarHeight();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Start ball below navbar and above footer
    let x = Math.random() * (viewportWidth - 48); // Random starting X
    let y = navbarHeight + radius + Math.random() * (viewportHeight - navbarHeight - 48 - getFooterHeight()); // Random starting Y below navbar
    
    let vx = (Math.random() - 0.5) * 4 + 2; // Velocity X (2-6 or -2 to -6)
    let vy = (Math.random() - 0.5) * 4 + 2; // Velocity Y
    const damping = 0.998; // Continuous damping for gradual slowdown
    const bounceDamping = 0.85; // Damping on bounce (more aggressive)
    const minVelocity = 0.15; // Very slow minimum velocity (ball never stops)
    
    // Drag and throw state
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartTime = 0;
    let lastDragX = 0;
    let lastDragY = 0;
    let lastDragTime = 0;
    let animationRunning = true;
    
    // Ensure initial velocity is not too slow
    if (Math.abs(vx) < minVelocity) {
        vx = vx > 0 ? minVelocity : -minVelocity;
    }
    if (Math.abs(vy) < minVelocity) {
        vy = vy > 0 ? minVelocity : -minVelocity;
    }
    
    // Update ball position
    function updateBall() {
        if (!animationRunning) {
            requestAnimationFrame(updateBall);
            return;
        }
        
        if (isDragging) {
            requestAnimationFrame(updateBall);
            return;
        }
        // Get current viewport dimensions and element heights
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const navbarHeight = getNavbarHeight();
        const footerHeight = getFooterHeight();
        const footerTop = footer ? footer.getBoundingClientRect().top : viewportHeight;
        
        // Calculate boundaries
        const topBoundary = navbarHeight + radius;
        const bottomBoundary = Math.min(viewportHeight - radius, footerTop - radius);
        const leftBoundary = radius;
        const rightBoundary = viewportWidth - radius;
        
        // Apply continuous damping to slow down over time
        vx *= damping;
        vy *= damping;
        
        // Maintain very slow minimum velocity (ball never stops)
        if (Math.abs(vx) < minVelocity && vx !== 0) {
            vx = vx > 0 ? minVelocity : -minVelocity;
        }
        if (Math.abs(vy) < minVelocity && vy !== 0) {
            vy = vy > 0 ? minVelocity : -minVelocity;
        }
        
        // If velocity is zero (shouldn't happen, but safety check), give it a tiny push
        if (vx === 0) {
            vx = Math.random() > 0.5 ? minVelocity : -minVelocity;
        }
        if (vy === 0) {
            vy = Math.random() > 0.5 ? minVelocity : -minVelocity;
        }
        
        // Update position
        x += vx;
        y += vy;
        
        // Bounce off left/right walls with bounce damping
        if (x <= leftBoundary) {
            x = leftBoundary;
            vx = -vx * bounceDamping;
            // Ensure minimum velocity after bounce
            if (Math.abs(vx) < minVelocity) {
                vx = vx > 0 ? minVelocity : -minVelocity;
            }
        } else if (x >= rightBoundary) {
            x = rightBoundary;
            vx = -vx * bounceDamping;
            if (Math.abs(vx) < minVelocity) {
                vx = vx > 0 ? minVelocity : -minVelocity;
            }
        }
        
        // Bounce off navbar (top) and footer (bottom) with bounce damping
        if (y <= topBoundary) {
            y = topBoundary;
            vy = -vy * bounceDamping;
            // Ensure minimum velocity after bounce
            if (Math.abs(vy) < minVelocity) {
                vy = vy > 0 ? minVelocity : -minVelocity;
            }
        } else if (y >= bottomBoundary) {
            y = bottomBoundary;
            vy = -vy * bounceDamping;
            if (Math.abs(vy) < minVelocity) {
                vy = vy > 0 ? minVelocity : -minVelocity;
            }
        }
        
        // Apply position
        ball.style.left = `${x - radius}px`;
        ball.style.top = `${y - radius}px`;
        
        requestAnimationFrame(updateBall);
    }
    
    // Handle window resize - keep ball in viewport
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const navbarHeight = getNavbarHeight();
            const footerHeight = getFooterHeight();
            const footerTop = footer ? footer.getBoundingClientRect().top : viewportHeight;
            
            const topBoundary = navbarHeight + radius;
            const bottomBoundary = Math.min(viewportHeight - radius, footerTop - radius);
            
            // Clamp ball position to viewport boundaries
            if (x < radius) x = radius;
            if (x > viewportWidth - radius) x = viewportWidth - radius;
            if (y < topBoundary) y = topBoundary;
            if (y > bottomBoundary) y = bottomBoundary;
            
            // Update position immediately
            ball.style.left = `${x - radius}px`;
            ball.style.top = `${y - radius}px`;
        }, 100);
    });
    
    // Handle scroll - adjust ball position to stay in viewport
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const navbarHeight = getNavbarHeight();
            const footerHeight = getFooterHeight();
            const footerTop = footer ? footer.getBoundingClientRect().top : viewportHeight;
            
            const topBoundary = navbarHeight + radius;
            const bottomBoundary = Math.min(viewportHeight - radius, footerTop - radius);
            
            // Keep ball within visible viewport boundaries
            if (y > bottomBoundary) {
                y = bottomBoundary;
            }
            if (y < topBoundary) {
                y = topBoundary;
            }
            if (x < radius) x = radius;
            if (x > viewportWidth - radius) x = viewportWidth - radius;
        }, 50);
    });
    
    // Mouse/Touch event handlers for dragging
    function getEventPos(e) {
        if (e.touches && e.touches.length > 0) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
    }
    
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        const pos = getEventPos(e);
        dragStartX = pos.x;
        dragStartY = pos.y;
        lastDragX = pos.x;
        lastDragY = pos.y;
        dragStartTime = Date.now();
        lastDragTime = dragStartTime;
        
        // Stop physics animation while dragging
        vx = 0;
        vy = 0;
        
        // Visual feedback
        ball.style.cursor = 'grabbing';
        ball.style.transform = 'scale(1.2)';
        ball.querySelector('div:first-child').style.transform = 'scale(1.1)';
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const navbarHeight = getNavbarHeight();
        const footerTop = footer ? footer.getBoundingClientRect().top : viewportHeight;
        
        const topBoundary = navbarHeight + radius;
        const bottomBoundary = Math.min(viewportHeight - radius, footerTop - radius);
        const leftBoundary = radius;
        const rightBoundary = viewportWidth - radius;
        
        const pos = getEventPos(e);
        const now = Date.now();
        const deltaTime = Math.max(1, now - lastDragTime);
        
        // Clamp position to boundaries
        let newX = Math.max(leftBoundary, Math.min(rightBoundary, pos.x));
        let newY = Math.max(topBoundary, Math.min(bottomBoundary, pos.y));
        
        // Update position
        x = newX;
        y = newY;
        
        // Calculate velocity based on movement speed
        const dx = newX - lastDragX;
        const dy = newY - lastDragY;
        vx = (dx / deltaTime) * 16; // Scale velocity
        vy = (dy / deltaTime) * 16;
        
        // Clamp velocity to reasonable limits
        const maxVelocity = 12;
        vx = Math.max(-maxVelocity, Math.min(maxVelocity, vx));
        vy = Math.max(-maxVelocity, Math.min(maxVelocity, vy));
        
        lastDragX = newX;
        lastDragY = newY;
        lastDragTime = now;
        
        // Apply position
        ball.style.left = `${x - radius}px`;
        ball.style.top = `${y - radius}px`;
    }
    
    function endDrag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        isDragging = false;
        
        // Restore visual state
        ball.style.cursor = 'grab';
        ball.style.transform = 'scale(1)';
        ball.querySelector('div:first-child').style.transform = 'scale(1)';
        
        // Ensure minimum velocity if thrown too slowly
        if (Math.abs(vx) < minVelocity) {
            vx = vx > 0 ? minVelocity : (vx < 0 ? -minVelocity : minVelocity);
        }
        if (Math.abs(vy) < minVelocity) {
            vy = vy > 0 ? minVelocity : (vy < 0 ? -minVelocity : minVelocity);
        }
        
        // If velocity is zero, give it a tiny push
        if (vx === 0) {
            vx = Math.random() > 0.5 ? minVelocity : -minVelocity;
        }
        if (vy === 0) {
            vy = Math.random() > 0.5 ? minVelocity : -minVelocity;
        }
    }
    
    // Mouse events
    ball.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('mouseleave', endDrag); // Handle mouse leaving window
    
    // Touch events
    ball.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', endDrag);
    document.addEventListener('touchcancel', endDrag);
    
    // Ensure ball is interactive
    ball.style.pointerEvents = 'auto';
    ball.style.userSelect = 'none';
    ball.style.touchAction = 'none';
    
    // Initialize position
    ball.style.left = `${x - radius}px`;
    ball.style.top = `${y - radius}px`;
    
    // Start animation
    updateBall();
})();

