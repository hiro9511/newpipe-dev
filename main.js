/**
 * Hero Portfolio - Main JavaScript
 * Version: 2026-01
 */

(function () {
    'use strict';

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');

    function getStoredTheme() { return localStorage.getItem('theme') || 'dark'; }
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) { themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️'; }
    }

    setTheme(getStoredTheme());

    themeToggle?.addEventListener('click', () => {
        const currentTheme = getStoredTheme();
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Mobile Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    navToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Initialize Animations
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('aos-animate');
    });
})();
