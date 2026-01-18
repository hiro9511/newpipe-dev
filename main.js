/**
 * Hero Portfolio - Main JavaScript
 * Version: 2026-01
 */

(function () {
    'use strict';

    // ==========================================================================
    // Theme Toggle
    // ==========================================================================

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');

    function getStoredTheme() {
        return localStorage.getItem('theme') || 'dark';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    }

    // Initialize theme
    setTheme(getStoredTheme());

    themeToggle?.addEventListener('click', () => {
        const currentTheme = getStoredTheme();
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // ==========================================================================
    // Mobile Navigation
    // ==========================================================================

    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
            navToggle?.classList.remove('active');
        });
    });

    // ==========================================================================
    // Navbar Scroll Effect
    // ==========================================================================

    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.scrollY;

        // Add scrolled class
        if (currentScroll > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ==========================================================================
    // Active Navigation Link
    // ==========================================================================

    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ==========================================================================
    // Smooth Scroll
    // ==========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================================================
    // AOS-like Animation on Scroll
    // ==========================================================================

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        animationObserver.observe(el);
    });

    // ==========================================================================
    // Typing Animation (Optional Enhancement)
    // ==========================================================================

    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const originalText = typingText.textContent;
        const texts = [
            'Physics Researcher',
            'HarmonyOS Developer',
            'Python Enthusiast',
            'Curious Mind'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        function typeEffect() {
            const currentText = texts[textIndex];

            if (isPaused) {
                setTimeout(typeEffect, 2000);
                isPaused = false;
                isDeleting = true;
                return;
            }

            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                }
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentText.length) {
                    isPaused = true;
                }
            }

            const speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }

        // Start typing animation after a delay
        setTimeout(typeEffect, 3000);
    }

    // ==========================================================================
    // Parallax Effect for Hero (Subtle)
    // ==========================================================================

    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        }, { passive: true });
    }

    // ==========================================================================
    // Console Easter Egg
    // ==========================================================================

    console.log('%c👋 Welcome!', 'font-size: 24px; font-weight: bold;');
    console.log('%cDesigned & Built by Hero', 'font-size: 14px; color: #667eea;');
    console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 12px; color: #888;');

})();
