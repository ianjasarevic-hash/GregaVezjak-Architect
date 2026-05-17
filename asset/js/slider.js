// Project Slider - Desktop: Auto-discovers images and creates mobile stacked gallery
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Slider JS loaded');
        var sliderImg = document.getElementById('slider-img');
        var prevBtn = document.getElementById('prev-btn');
        var nextBtn = document.getElementById('next-btn');
        var projectSlider = document.getElementById('project-slider');
        var mobileGallery = document.getElementById('mobile-gallery');

        console.log('mobileGallery element:', mobileGallery);
        console.log('window.innerWidth:', window.innerWidth);

        // Hide slider on mobile, show on desktop (>= 768px)
        function updateSliderVisibility() {
            var isMobile = window.innerWidth < 768;
            console.log('isMobile:', isMobile);
            if (projectSlider) {
                projectSlider.style.display = isMobile ? 'none' : 'block';
            }
            if (mobileGallery) {
                mobileGallery.style.display = isMobile ? 'block' : 'none';
                mobileGallery.className = 'space-y-4 px-6 py-8';
                console.log('mobileGallery display set to:', isMobile ? 'block' : 'none');
            }
        }

        if (!sliderImg || !mobileGallery) {
            console.log('Missing slider or mobileGallery elements');
            return;
        }

        // Initial visibility check
        updateSliderVisibility();
        window.addEventListener('resize', updateSliderVisibility);

        var heroSrc = sliderImg.src;
        console.log('Hero source:', heroSrc);

        // ALWAYS add hero image first
        var availableImages = [heroSrc];
        var currentIndex = 0;
        var maxImages = 30;
        var checked = 0;

        // Extract project name from hero image src
        var projectName = '';
        var match = heroSrc.match(/([a-z-]+)-hero\.jpg/);
        if (match) {
            projectName = match[1].replace(/-/g, ' ').toUpperCase();
            console.log('Project name:', projectName);
        }

        // Preload images and check if they complete
        function checkNextImage(index) {
            if (index > maxImages || checked > maxImages) {
                // Done discovering, show what we have
                showGallery();
                return;
            }
            checked++;
            var testSrc = heroSrc.replace('-hero.jpg', '-' + index + '.jpg');
            console.log('Checking image:', testSrc);
            var img = new Image();
            img.onload = function() {
                console.log('Found image:', testSrc);
                if (availableImages.indexOf(testSrc) === -1) {
                    availableImages.push(testSrc);
                }
                checkNextImage(index + 1);
            };
            img.onerror = function() {
                console.log('Not found:', testSrc);
                checkNextImage(index + 1);
            };
            img.src = testSrc;
        }

        function showGallery() {
            console.log('Showing gallery with images:', availableImages);

            // Clear existing content
            mobileGallery.innerHTML = '';

            if (availableImages.length > 0) {
                // Add all discovered images
                availableImages.forEach(function(imgSrc) {
                    var img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = projectName || 'Project Image';
                    img.className = 'w-full';
                    mobileGallery.appendChild(img);
                });

                // Enable slider buttons if multiple
                if (availableImages.length > 1 && prevBtn && nextBtn) {
                    prevBtn.style.display = 'flex';
                    nextBtn.style.display = 'flex';
                    prevBtn.addEventListener('click', function() {
                        currentIndex = (currentIndex - 1 + availableImages.length) % availableImages.length;
                        sliderImg.src = availableImages[currentIndex];
                    });
                    nextBtn.addEventListener('click', function() {
                        currentIndex = (currentIndex + 1) % availableImages.length;
                        sliderImg.src = availableImages[currentIndex];
                    });
                }
            }

            console.log('Mobile gallery populated with', availableImages.length, 'images');
        }

        // Start checking from image 1
        checkNextImage(1);
    });
})();