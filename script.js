// ========================================
// LOVE LETTER WEBSITE — MAIN SCRIPT
// ========================================

(function () {
    'use strict';

    // ---- DOM REFERENCES ----
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    const heartsContainer = document.getElementById('heartsContainer');
    const sparkleContainer = document.getElementById('sparkleContainer');
    const finalHearts = document.getElementById('finalHearts');

    // ---- INTRO SCREEN ----
    introScreen.addEventListener('click', openLetter);
    introScreen.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') openLetter();
    });

    function openLetter() {
        introScreen.classList.add('hidden');
        mainContent.classList.add('visible');
        startFloatingHearts();
        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 900);
    }

    // ---- FLOATING HEARTS BACKGROUND ----
    const heartEmojis = ['❤️', '💖', '💕', '💗', '💓', '💘', '💝', '🩷'];

    function createFloatingHeart() {
        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.setProperty('--duration', (8 + Math.random() * 12) + 's');
        heart.style.setProperty('--delay', (Math.random() * 5) + 's');
        heart.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
        heartsContainer.appendChild(heart);

        // Remove after animation completes
        const totalTime = (parseFloat(heart.style.getPropertyValue('--duration')) +
            parseFloat(heart.style.getPropertyValue('--delay'))) * 1000;
        setTimeout(() => heart.remove(), totalTime + 1000);
    }

    function startFloatingHearts() {
        // Initial burst
        for (let i = 0; i < 8; i++) {
            setTimeout(createFloatingHeart, i * 300);
        }
        // Continuous spawn
        setInterval(createFloatingHeart, 2500);
    }

    // ---- SPARKLE CURSOR TRAIL ----
    let sparkleThrottle = false;
    document.addEventListener('mousemove', (e) => {
        if (sparkleThrottle) return;
        sparkleThrottle = true;
        setTimeout(() => { sparkleThrottle = false; }, 60);

        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.width = (3 + Math.random() * 5) + 'px';
        sparkle.style.height = sparkle.style.width;

        const colors = ['#ff6b9d', '#c44dff', '#ff9de2', '#72b4ff', '#ffd700'];
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];

        sparkleContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    });

    // ---- SCROLL REVEAL (Intersection Observer) ----
    const revealElements = document.querySelectorAll('.glassmorphism-card, .final-message');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));

    // ---- PARALLAX-LIKE SECTION BG SHIFT ----
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                document.querySelectorAll('.section').forEach((section) => {
                    const rect = section.getBoundingClientRect();
                    const offset = rect.top / window.innerHeight;
                    if (offset > -1 && offset < 2) {
                        section.style.backgroundPositionY = (offset * 30) + 'px';
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // ---- FINAL HEARTS ROW ----
    const finalHeartEmojis = ['💞', '💕', '❤️', '💖', '💗', '💓', '💘', '💝', '💕', '💞'];
    finalHeartEmojis.forEach((emoji, i) => {
        const span = document.createElement('span');
        span.classList.add('final-heart-item');
        span.textContent = emoji;
        span.style.setProperty('--delay', (i * 0.15) + 's');
        finalHearts.appendChild(span);
    });

    // ---- TOUCH SUPPORT: floating hearts on tap ----
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        for (let i = 0; i < 3; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = (touch.clientX + (Math.random() - 0.5) * 30) + 'px';
            sparkle.style.top = (touch.clientY + (Math.random() - 0.5) * 30) + 'px';
            sparkle.style.width = (4 + Math.random() * 6) + 'px';
            sparkle.style.height = sparkle.style.width;
            sparkle.style.background = '#ff6b9d';
            sparkleContainer.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 800);
        }
    }, { passive: true });

})();
