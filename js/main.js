/**
 * Hanu Corporation - Main JavaScript
 * Handles animations, navigation, and form interactions
 */

(function() {
  'use strict';

  // =====================================================
  // AOS (Animate On Scroll) Initialization
  // =====================================================
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
      });
    }
  }

  // =====================================================
  // Sticky Navigation
  // =====================================================
  function initStickyNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    function handleScroll() {
      const currentScroll = window.scrollY;

      // Add/remove scrolled class for compact nav
      nav.classList.toggle('scrolled', currentScroll > scrollThreshold);

      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on load
  }

  // =====================================================
  // Mobile Menu Toggle
  // =====================================================
  function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    function toggleMenu() {
      const isOpen = navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen);

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMenu() {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  // =====================================================
  // Contact Form Handling
  // =====================================================
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('#submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    const statusDiv = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Check honeypot (spam protection)
      const honeypot = form.querySelector('[name="botcheck"]');
      if (honeypot && honeypot.value) {
        return;
      }

      // Set loading state
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline';
      if (statusDiv) {
        statusDiv.className = 'form-status';
        statusDiv.textContent = '';
        statusDiv.style.display = 'none';
      }

      try {
        const formData = new FormData(form);

        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success
          if (statusDiv) {
            statusDiv.className = 'form-status success';
            statusDiv.textContent = 'Thank you for your message! We\'ll be in touch within 24 hours.';
            statusDiv.style.display = 'block';
          }
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        // Error
        if (statusDiv) {
          statusDiv.className = 'form-status error';
          statusDiv.textContent = 'Something went wrong. Please try again or email us directly at info@hanucorp.com';
          statusDiv.style.display = 'block';
        }
        console.error('Form submission error:', error);
      } finally {
        // Reset button state
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'inline';
        if (btnLoading) btnLoading.style.display = 'none';
      }
    });
  }

  // =====================================================
  // Smooth Scroll for Anchor Links
  // =====================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // =====================================================
  // Reduced Motion Check
  // =====================================================
  function checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
      // Disable AOS animations for users who prefer reduced motion
      if (typeof AOS !== 'undefined') {
        AOS.init({
          disable: true
        });
      }
    }
  }

  // =====================================================
  // Active Navigation Link
  // =====================================================
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // =====================================================
  // Initialize All Functions
  // =====================================================
  function init() {
    checkReducedMotion();
    initAOS();
    initStickyNav();
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    setActiveNavLink();
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
