document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
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

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');

    let currentImages = [];
    let currentIndex = 0;

    // Open lightbox - find all images in the same section
    document.querySelectorAll('.lightbox-trigger').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Find parent section with class 'reveal'
            const section = link.closest('section');
            if (!section) return;

            // Get all images in this section
            const imgElements = section.querySelectorAll('img');
            currentImages = [];
            imgElements.forEach(img => {
                if (img.src) {
                    currentImages.push(img.src);
                }
            });

            if (currentImages.length === 0) return;

            // Find which image was clicked
            currentIndex = Array.from(imgElements).findIndex(img => img.src === link.src);
            if (currentIndex === -1) currentIndex = 0;

            showImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Navigation
    lightboxPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage();
    });

    lightboxNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        if (e.key === 'ArrowRight') currentIndex = (currentIndex + 1) % currentImages.length;
        showImage();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showImage() {
        if (currentImages[currentIndex]) {
            lightboxImg.src = currentImages[currentIndex];
            lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
        }
    }
});