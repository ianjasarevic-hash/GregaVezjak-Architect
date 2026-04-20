document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Custom Cursor Elements
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let rafId = null;
        
        const updateCursorPos = () => {
            document.documentElement.style.setProperty('--cursor-x', `${mouseX}px`);
            document.documentElement.style.setProperty('--cursor-y', `${mouseY}px`);
            rafId = null;
        };

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!document.body.classList.contains('cursor-active')) {
                document.body.classList.add('cursor-active');
            }

            const target = e.target;
            const isInteractive = target.closest('a, button, [role="button"], input, textarea, .scale-hover');
            
            if (isInteractive) {
                document.body.classList.add('cursor-hover');
            } else {
                document.body.classList.remove('cursor-hover');
            }

            if (!rafId) {
                rafId = requestAnimationFrame(updateCursorPos);
            }
        }, { passive: true });

        document.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-active');
        });
        document.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-active');
        });
    }

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
});
