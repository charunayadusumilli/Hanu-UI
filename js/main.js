/**
 * Hanu Corporation - Main JavaScript
 * Handles animations, navigation, and form interactions
 */

(function () {
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
  // Mouse Glow Effect on Cards with Tilt
  // =====================================================
  function initMouseGlow() {
    const cards = document.querySelectorAll('.service-card, .stat-card, .contact-preview-item, .value-card');

    cards.forEach(card => {
      let rect;

      card.addEventListener('mouseenter', () => {
        rect = card.getBoundingClientRect();
      });

      card.addEventListener('mousemove', (e) => {
        if (!rect) rect = card.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Set mouse position for glow
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);

        // Calculate tilt based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rotateX = ((mouseY - centerY) / centerY) * -8;
        const rotateY = ((mouseX - centerX) / centerX) * 8;

        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
        rect = null;
      });
    });
  }

  // =====================================================
  // Magnetic Button Effect
  // =====================================================
  function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.hero-cta, .btn-primary-large, .nav-cta, .btn-submit');

    magneticElements.forEach(el => {
      let bounds;

      el.addEventListener('mouseenter', () => {
        bounds = el.getBoundingClientRect();
        el.style.transition = 'transform 0.1s ease, box-shadow 0.2s ease';
      });

      el.addEventListener('mousemove', (e) => {
        const x = e.clientX - bounds.left - bounds.width / 2;
        const y = e.clientY - bounds.top - bounds.height / 2;

        const moveX = x * 0.35;
        const moveY = y * 0.35;

        el.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        el.style.boxShadow = `
          ${-moveX * 0.5}px ${-moveY * 0.5 + 20}px 40px rgba(6, 182, 212, 0.3),
          0 0 30px rgba(59, 130, 246, 0.2)
        `;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease';
        el.style.transform = 'translate(0, 0) scale(1)';
        el.style.boxShadow = '';
      });
    });
  }

  // =====================================================
  // Parallax Scroll Effect
  // =====================================================
  function initParallax() {
    const heroBackground = document.querySelector('.hero-background');
    const heroVisual = document.querySelector('.hero-visual');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      if (heroBackground) {
        heroBackground.style.transform = `translate(${scrollY * 0.05}px, ${scrollY * 0.1}px) scale(${1 + scrollY * 0.0002})`;
      }

      if (heroVisual && scrollY < window.innerHeight) {
        heroVisual.style.transform = `translateY(${-scrollY * 0.15}px)`;
      }
    }, { passive: true });
  }

  // =====================================================
  // Text Reveal Animation
  // =====================================================
  function initTextReveal() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    // Add animation delay to words
    const words = heroTitle.innerHTML.split(' ');
    heroTitle.innerHTML = words.map((word, i) =>
      `<span style="animation-delay: ${0.1 + i * 0.05}s">${word}</span>`
    ).join(' ');
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
  // Phone Number Auto-Formatting
  // =====================================================
  function initPhoneFormatting() {
    const phoneInput = document.getElementById('phone');
    const phoneWarning = document.querySelector('.phone-warning');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value;

      // Remove all non-digit characters
      let digits = value.replace(/\D/g, '');

      // Remove leading 1 if user typed it (we'll add +1 automatically)
      if (digits.startsWith('1') && digits.length > 10) {
        digits = digits.substring(1);
      }

      // Limit to 10 digits
      if (digits.length > 10) {
        digits = digits.substring(0, 10);
        if (phoneWarning) {
          phoneWarning.style.display = 'block';
          phoneWarning.textContent = 'Maximum 10 digits allowed';
        }
      } else {
        if (phoneWarning) {
          phoneWarning.style.display = 'none';
        }
      }

      // Format as +1 (XXX) XXX-XXXX
      let formatted = '';
      if (digits.length > 0) {
        formatted = '+1 ';
        if (digits.length <= 3) {
          formatted += '(' + digits;
        } else if (digits.length <= 6) {
          formatted += '(' + digits.substring(0, 3) + ') ' + digits.substring(3);
        } else {
          formatted += '(' + digits.substring(0, 3) + ') ' + digits.substring(3, 6) + '-' + digits.substring(6);
        }
      }

      e.target.value = formatted;
    });

    // Handle paste
    phoneInput.addEventListener('paste', (e) => {
      e.preventDefault();
      const pastedText = (e.clipboardData || window.clipboardData).getData('text');
      let digits = pastedText.replace(/\D/g, '');

      // Remove leading 1 if present
      if (digits.startsWith('1') && digits.length > 10) {
        digits = digits.substring(1);
      }

      // Limit and format
      digits = digits.substring(0, 10);

      if (digits.length > 0) {
        let formatted = '+1 ';
        if (digits.length <= 3) {
          formatted += '(' + digits;
        } else if (digits.length <= 6) {
          formatted += '(' + digits.substring(0, 3) + ') ' + digits.substring(3);
        } else {
          formatted += '(' + digits.substring(0, 3) + ') ' + digits.substring(3, 6) + '-' + digits.substring(6);
        }
        phoneInput.value = formatted;
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
      anchor.addEventListener('click', function (e) {
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
    initPhoneFormatting();
    initSmoothScroll();
    setActiveNavLink();

    // New elegant animations
    initMouseGlow();
    initMagneticButtons();
    initParallax();
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
