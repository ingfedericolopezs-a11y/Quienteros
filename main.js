/* ============================================================
   QUINTEROS S.A. — MAIN JAVASCRIPT
   Hero Slider + Navbar + Animations
   ============================================================ */

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---- MOBILE HAMBURGER ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close nav when any link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

/* ---- HERO SLIDER ---- */
const slides      = document.querySelectorAll('.hero-slide');
const dots        = document.querySelectorAll('.dot');
const progressBar = document.getElementById('progressBar');
const prevBtn     = document.getElementById('sliderPrev');
const nextBtn     = document.getElementById('sliderNext');

let current        = 0;
let autoplayTimer  = null;
let progressTimer  = null;
const SLIDE_DURATION = 5500; // ms per slide
const PROGRESS_STEP  = 100 / (SLIDE_DURATION / 80); // step every 80ms

function goToSlide(index) {
    // Remove active from old
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    // Set new
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');

    // Reset progress bar
    resetProgress();
}

function nextSlide() { goToSlide(current + 1); }
function prevSlide() { goToSlide(current - 1); }

// Progress bar animation
let progressWidth = 0;

function resetProgress() {
    clearInterval(progressTimer);
    progressWidth = 0;
    progressBar.style.width = '0%';
    progressBar.style.transition = 'none';

    setTimeout(() => {
        progressBar.style.transition = `width ${SLIDE_DURATION}ms linear`;
        progressBar.style.width = '100%';
    }, 50);
}

// Autoplay
function startAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, SLIDE_DURATION);
}

// Init
goToSlide(0);
startAutoplay();

// Arrows
prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoplay();
});
nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoplay();
});

// Dots
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        goToSlide(i);
        startAutoplay();
    });
});

// Pause on hover
const heroSlider = document.getElementById('heroSlider');
heroSlider.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
heroSlider.addEventListener('mouseleave', startAutoplay);

// Touch/swipe support
let touchStartX = 0;
heroSlider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
heroSlider.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
        startAutoplay();
    }
});

/* ---- KEYBOARD NAVIGATION ---- */
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { prevSlide(); startAutoplay(); }
    if (e.key === 'ArrowRight') { nextSlide(); startAutoplay(); }
});

/* ---- SMOOTH SCROLL (override default for nav links) ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = navbar.offsetHeight + 10;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        }
    });
});

/* ---- INTERSECTION OBSERVER (Fade in on scroll) ---- */
const fadeEls = document.querySelectorAll(
    '.sol-card, .stat-item, .milestone, .contact-form-panel, .contact-info-panel, .historia-image, .historia-text, .section-header'
);

const ioOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, ioOptions);

fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    io.observe(el);
});

// When element becomes visible
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
});

/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Mensaje enviado!';
        submitBtn.style.background = '#22c55e';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = 'Enviar Mensaje &nbsp;<i class="fa-solid fa-paper-plane"></i>';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3500);
    });
}

/* ---- STATS COUNTER ANIMATION ---- */
const statNums = document.querySelectorAll('.stat-num');

const counterIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const rawText = el.textContent.trim();
            const numMatch = rawText.match(/\d+/);
            if (!numMatch) return;
            const target = parseInt(numMatch[0]);
            const suffix = rawText.replace(/[\d]/g, '');
            let current = 0;
            const step  = Math.max(1, Math.floor(target / 60));
            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = current + suffix;
                if (current >= target) clearInterval(timer);
            }, 30);
            counterIO.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNums.forEach(el => counterIO.observe(el));
