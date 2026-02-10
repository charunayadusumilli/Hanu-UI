# Building Hanu Corporation's Modern IT Services Website

The optimal approach combines **GSAP ScrollTrigger** for premium animations inspired by mont-fort.com, a **navy-blue corporate palette** common in trusted IT companies, **Web3Forms** for backend-less contact handling, and deployment via **Railway** using the `serve` package. This guide provides production-ready code and configurations to launch immediately.

## Design inspiration from mont-fort.com reveals key techniques

Mont-fort.com, an Awwwards Site of the Day winner (animation score **9.00/10**), was built by Immersive Garden using a sophisticated but replicable stack. Their hero section employs full-viewport layouts with scroll-triggered content reveals, parallax background effects, and smooth scrolling via the **Lenis** library. The site's visual hierarchy relies on large numbered section markers (1, 2, 3, 4) and generous whitespace between content blocks.

Their confirmed technology stack includes:
- **GSAP + ScrollTrigger** for timeline-based scroll animations
- **Three.js** for subtle 3D/WebGL depth effects
- **Lenis** for buttery-smooth scroll behavior
- **Astro** as the static site framework

The color palette is deliberately minimalist: **primary blue #29648e** for headers and CTAs, **background light #f4f6f8** for sections, and high-contrast text. Typography uses a geometric sans-serif (similar to Inter or Neue Haas Grotesk) with bold **600-700 weight** headlines and regular **400 weight** body text. Section padding runs **80-120px vertical** with **24-40px** grid gaps between cards.

For Hanu Corporation, this translates to a clean, professional aesthetic with scroll-triggered fade-ins on service cards, parallax backgrounds in hero sections, and numbered service categories creating clear visual hierarchy.

## Modern IT company websites follow specific design patterns

Effective tech company websites share consistent patterns across hero sections, navigation, and service presentation. Hero headlines should be **8 words maximum**, leading with benefits rather than features—"Transform Your Business with Intelligent Technology" outperforms "Enterprise IT Solutions Provider." The hero must include a single focused CTA button, client logos as social proof (5-7 recognizable brands), and either abstract tech graphics, product screenshots, or subtle video backgrounds.

**Recommended color palette for Hanu Corporation:**

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary Blue | Trust/Authority | #0066CC |
| Deep Navy | Headers | #1E3A5F |
| Accent Teal | Innovation | #00B4D8 |
| Light Background | Clean sections | #F4F5F7 |
| Dark Text | Readability | #1A1A1A |

**Typography pairing:** Use **Inter** or **Poppins** (Google Fonts) for headlines at 48-72px desktop, paired with **Source Sans Pro** or **DM Sans** for body text at 16-18px. Maintain line-height of **1.5-1.7** for body and limit to 2 font families maximum.

Service cards should follow a consistent structure: icon at top (40-60px), service title in bold 18-24px, 2-3 line description, and optional "Learn More" link. Cards use **8-16px border-radius**, subtle shadows (`box-shadow: 0 4px 6px rgba(0,0,0,0.1)`), and hover effects that lift the card with increased shadow depth.

Navigation should limit items to **5-7 main links** with structure: Services | Solutions | About | Resources | Contact. Include a sticky header that compacts on scroll and always keep the primary CTA visible in the header.

## GSAP ScrollTrigger provides production-ready animation code

For mont-fort.com-style animations, GSAP offers the best performance and flexibility. Include via CDN for simplicity:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14/dist/ScrollTrigger.min.js"></script>
```

**Fade-in elements on scroll:**
```javascript
gsap.registerPlugin(ScrollTrigger);

// Animate service cards with stagger
gsap.from('.service-card', {
  scrollTrigger: {
    trigger: '.services-section',
    start: 'top 75%'
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power2.out'
});

// Hero content fade-out on scroll
gsap.to('.hero-content', {
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: '+=400',
    scrub: 1
  },
  y: -80,
  opacity: 0
});

// Parallax background effect
gsap.to('.hero-background', {
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  },
  y: 200,
  ease: 'none'
});
```

**For simpler implementation, AOS (Animate On Scroll)** offers declarative HTML attributes:
```html
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css">
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>AOS.init({ duration: 800, once: true, offset: 100 });</script>

<!-- Usage in HTML -->
<div class="service-card" data-aos="fade-up" data-aos-delay="100">
  <!-- Card content -->
</div>
```

**CSS hover effects for cards:**
```css
.service-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
}
```

**Accessibility is mandatory.** Always include reduced-motion support:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  gsap.globalTimeline.timeScale(0);
}
```

## Railway deployment requires specific configuration

Railway auto-detects Node.js projects but needs explicit configuration for static sites. Create this file structure:

```
hanu-website/
├── index.html
├── about.html
├── services.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
├── package.json
└── railway.json
```

**package.json:**
```json
{
  "name": "hanu-corporation-website",
  "version": "1.0.0",
  "scripts": {
    "start": "serve -s . -l $PORT"
  },
  "dependencies": {
    "serve": "^14.2.0"
  },
  "engines": {
    "node": ">=18"
  }
}
```

**railway.json:**
```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "deploy": {
    "startCommand": "npx serve -s . -l $PORT",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

**Deployment steps:**
1. Push code to GitHub repository
2. Go to railway.com/new → "Deploy from GitHub repo"
3. Connect GitHub account and select repository
4. Railway auto-deploys; navigate to Settings → Networking → Generate Domain
5. Initial deployment URL: `yourproject.up.railway.app`

**GoDaddy domain connection requires Cloudflare** because GoDaddy doesn't support CNAME flattening for root domains:

1. Create free Cloudflare account and add your domain
2. In GoDaddy: change nameservers to Cloudflare's (provided during setup)
3. In Cloudflare DNS, add CNAME record:
   - **Type:** CNAME, **Name:** `@`, **Target:** `yourproject.up.railway.app`
4. In Cloudflare SSL/TLS settings, select **"Full"** (not "Full Strict")
5. In Railway: add custom domain and verify connection

Railway automatically provisions **Let's Encrypt SSL certificates** for all custom domains with auto-renewal.

## Web3Forms handles contact submissions without backend code

Web3Forms offers **250 free submissions/month** with no account required, making it ideal for the initial launch. Get an access key at web3forms.com by entering your email.

**Complete contact form HTML:**
```html
<form id="contact-form" action="https://api.web3forms.com/submit" method="POST">
  <!-- Web3Forms Configuration -->
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
  <input type="hidden" name="subject" value="New Inquiry from Hanu Website">
  <input type="hidden" name="redirect" value="https://hanucorp.com/thank-you">

  <!-- Honeypot spam protection -->
  <div style="position: absolute; left: -9999px;" aria-hidden="true">
    <input type="text" name="botcheck" tabindex="-1" autocomplete="off">
  </div>

  <div class="form-group">
    <label for="name">Full Name <span aria-hidden="true">*</span></label>
    <input type="text" id="name" name="name" required minlength="2"
           autocomplete="name" placeholder="John Smith">
    <span class="error-message" role="alert" aria-live="polite"></span>
  </div>

  <div class="form-group">
    <label for="email">Email Address <span aria-hidden="true">*</span></label>
    <input type="email" id="email" name="email" required
           autocomplete="email" placeholder="john@company.com">
    <span class="error-message" role="alert" aria-live="polite"></span>
  </div>

  <div class="form-group">
    <label for="company">Company Name</label>
    <input type="text" id="company" name="company"
           autocomplete="organization" placeholder="Acme Inc.">
  </div>

  <div class="form-group">
    <label for="service">Service Interest <span aria-hidden="true">*</span></label>
    <select id="service" name="service" required>
      <option value="">Select a service...</option>
      <option value="ai-automation">AI & Automation</option>
      <option value="cloud-transformation">Cloud Transformation</option>
      <option value="devops">DevOps & Infrastructure</option>
      <option value="custom-software">Custom Software Development</option>
      <option value="data-analytics">Data Analytics</option>
      <option value="managed-it">Managed IT Services</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div class="form-group">
    <label for="message">How can we help? <span aria-hidden="true">*</span></label>
    <textarea id="message" name="message" required minlength="20"
              rows="5" placeholder="Tell us about your project..."></textarea>
    <span class="hint">Minimum 20 characters</span>
  </div>

  <button type="submit" id="submit-btn">
    <span class="btn-text">Send Message</span>
    <span class="btn-loading" style="display:none;">Sending...</span>
  </button>

  <div id="form-status" role="status" aria-live="polite"></div>
</form>
```

**JavaScript form handling with validation:**
```javascript
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const submitBtn = form.querySelector('#submit-btn');
  const statusDiv = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Check honeypot
    if (form.querySelector('[name="botcheck"]').value) return;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').style.display = 'none';
    submitBtn.querySelector('.btn-loading').style.display = 'inline';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        statusDiv.className = 'status-message success';
        statusDiv.textContent = 'Thank you! We\'ll be in touch within 24 hours.';
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      statusDiv.className = 'status-message error';
      statusDiv.textContent = 'Something went wrong. Please try again or email us directly.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').style.display = 'inline';
      submitBtn.querySelector('.btn-loading').style.display = 'none';
    }
  });
});
```

**Form CSS styling:**
```css
.form-group { margin-bottom: 1.5rem; }

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1E3A5F;
}

input, textarea, select {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #0066CC;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2);
}

button[type="submit"] {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: #0066CC;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

button[type="submit"]:hover:not(:disabled) {
  background-color: #0052a3;
}

button[type="submit"]:disabled { opacity: 0.6; cursor: not-allowed; }

.status-message.success {
  padding: 1rem;
  margin-top: 1rem;
  background-color: #dcfce7;
  color: #166534;
  border-radius: 8px;
}

.status-message.error {
  padding: 1rem;
  margin-top: 1rem;
  background-color: #fef2f2;
  color: #991b1b;
  border-radius: 8px;
}
```

## Complete hero section implementation

Here's production-ready code for the Hanu Corporation homepage hero:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hanu Corporation | Enterprise IT Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0066CC;
      --primary-dark: #0052a3;
      --navy: #1E3A5F;
      --teal: #00B4D8;
      --light-bg: #F4F5F7;
      --text: #1A1A1A;
      --text-muted: #6B7280;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--text);
      line-height: 1.6;
    }

    /* Navigation */
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 1.25rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      transition: padding 0.3s, box-shadow 0.3s;
    }

    .nav.scrolled {
      padding: 0.75rem 2rem;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--navy);
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav-links a {
      text-decoration: none;
      color: var(--text);
      font-weight: 500;
      transition: color 0.2s;
    }

    .nav-links a:hover { color: var(--primary); }

    .nav-cta {
      padding: 0.75rem 1.5rem;
      background: var(--primary);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.2s;
    }

    .nav-cta:hover { background: var(--primary-dark); }

    /* Hero Section */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 8rem 2rem 4rem;
      background: linear-gradient(135deg, #F4F5F7 0%, #E8F4FC 100%);
      position: relative;
      overflow: hidden;
    }

    .hero-background {
      position: absolute;
      top: 0;
      right: -10%;
      width: 60%;
      height: 100%;
      opacity: 0.1;
      background: radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 70%);
    }

    .hero-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .hero-content { position: relative; z-index: 1; }

    .hero-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: rgba(0, 102, 204, 0.1);
      color: var(--primary);
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: 50px;
      margin-bottom: 1.5rem;
    }

    .hero-title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      color: var(--navy);
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }

    .hero-title .highlight {
      background: linear-gradient(90deg, var(--primary), var(--teal));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-description {
      font-size: 1.25rem;
      color: var(--text-muted);
      margin-bottom: 2rem;
      max-width: 500px;
    }

    .hero-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2rem;
      background: var(--primary);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1.125rem;
      transition: background 0.2s, transform 0.2s;
    }

    .hero-cta:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
    }

    .hero-cta svg { transition: transform 0.2s; }
    .hero-cta:hover svg { transform: translateX(4px); }

    .hero-clients {
      margin-top: 3rem;
      opacity: 0.6;
    }

    .hero-clients p {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
    }

    .client-logos {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .client-logos img {
      height: 32px;
      filter: grayscale(100%);
      opacity: 0.7;
    }

    /* Services Section */
    .services {
      padding: 6rem 2rem;
      background: white;
    }

    .services-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 1rem;
    }

    .section-subtitle {
      font-size: 1.125rem;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .service-card {
      padding: 2rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .service-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .service-number {
      display: inline-block;
      width: 48px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      background: var(--light-bg);
      color: var(--primary);
      font-weight: 700;
      font-size: 1.25rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
    }

    .service-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--navy);
      margin-bottom: 0.75rem;
    }

    .service-card p {
      color: var(--text-muted);
      margin-bottom: 1rem;
    }

    .service-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary);
      text-decoration: none;
      font-weight: 500;
    }

    .service-link:hover { text-decoration: underline; }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-container { grid-template-columns: 1fr; text-align: center; }
      .hero-description { margin: 0 auto 2rem; }
      .client-logos { justify-content: center; flex-wrap: wrap; }
      .nav-links { display: none; }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="logo">HANU</div>
    <ul class="nav-links">
      <li><a href="/services">Services</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/solutions">Solutions</a></li>
      <li><a href="/resources">Resources</a></li>
    </ul>
    <a href="/contact" class="nav-cta">Get Started</a>
  </nav>

  <section class="hero">
    <div class="hero-background"></div>
    <div class="hero-container">
      <div class="hero-content">
        <span class="hero-badge">Enterprise IT Solutions</span>
        <h1 class="hero-title">
          Transform Your Business with <span class="highlight">Intelligent Technology</span>
        </h1>
        <p class="hero-description">
          We architect, build, and manage modern IT solutions that drive growth,
          enhance security, and accelerate your digital transformation journey.
        </p>
        <a href="/contact" class="hero-cta">
          Schedule a Consultation
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 10h10M12 6l4 4-4 4"/>
          </svg>
        </a>
        <div class="hero-clients">
          <p>Trusted by industry leaders</p>
          <div class="client-logos">
            <!-- Replace with actual client logos -->
            <img src="/images/client-1.svg" alt="Client 1">
            <img src="/images/client-2.svg" alt="Client 2">
            <img src="/images/client-3.svg" alt="Client 3">
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="services">
    <div class="services-container">
      <div class="section-header">
        <h2 class="section-title">What We Do</h2>
        <p class="section-subtitle">
          Comprehensive IT services designed to modernize your infrastructure
          and unlock new possibilities for your business.
        </p>
      </div>
      <div class="services-grid">
        <div class="service-card" data-aos="fade-up" data-aos-delay="0">
          <span class="service-number">01</span>
          <h3>AI & Automation</h3>
          <p>Leverage machine learning and intelligent automation to streamline operations and unlock data-driven insights.</p>
          <a href="/services/ai-automation" class="service-link">Learn more →</a>
        </div>
        <div class="service-card" data-aos="fade-up" data-aos-delay="100">
          <span class="service-number">02</span>
          <h3>Cloud Transformation</h3>
          <p>Migrate, modernize, and optimize your cloud infrastructure across AWS, Azure, and Google Cloud platforms.</p>
          <a href="/services/cloud" class="service-link">Learn more →</a>
        </div>
        <div class="service-card" data-aos="fade-up" data-aos-delay="200">
          <span class="service-number">03</span>
          <h3>DevOps & Infrastructure</h3>
          <p>Build reliable CI/CD pipelines, container orchestration, and infrastructure-as-code solutions.</p>
          <a href="/services/devops" class="service-link">Learn more →</a>
        </div>
        <div class="service-card" data-aos="fade-up" data-aos-delay="300">
          <span class="service-number">04</span>
          <h3>Custom Software</h3>
          <p>Design and develop tailored applications that solve your unique business challenges.</p>
          <a href="/services/software" class="service-link">Learn more →</a>
        </div>
        <div class="service-card" data-aos="fade-up" data-aos-delay="400">
          <span class="service-number">05</span>
          <h3>Data Analytics</h3>
          <p>Transform raw data into actionable intelligence with modern analytics platforms and visualization.</p>
          <a href="/services/analytics" class="service-link">Learn more →</a>
        </div>
        <div class="service-card" data-aos="fade-up" data-aos-delay="500">
          <span class="service-number">06</span>
          <h3>Managed IT Services</h3>
          <p>24/7 monitoring, maintenance, and support to keep your systems running at peak performance.</p>
          <a href="/services/managed-it" class="service-link">Learn more →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- AOS Library -->
  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css">
  <script src="https://unpkg.com/aos@next/dist/aos.js"></script>

  <script>
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });

    // Sticky nav scroll effect
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  </script>
</body>
</html>
```

## Conclusion

This implementation combines **mont-fort.com's premium animation approach** (GSAP ScrollTrigger, numbered section markers, generous whitespace) with **proven IT company design patterns** (navy/blue palette, benefit-driven headlines, trust indicators). The tech stack—**static HTML/CSS/JS, AOS or GSAP for animations, Web3Forms for contact handling, and Railway for deployment**—provides a fast, maintainable, and cost-effective solution.

Key differentiators for Hanu Corporation's site: use the numbered service card pattern (01, 02, 03...) to create clear hierarchy, implement scroll-triggered fade-ins with stagger delays to guide user attention, and ensure the hero section leads with outcome-focused messaging rather than technical jargon. The Railway deployment with Cloudflare DNS integration provides automatic SSL, global CDN benefits, and simple domain management.

For enhanced spam protection, add Cloudflare Turnstile to the contact form—it's invisible to users and free for up to 10 widgets. Consider upgrading to Formspree ($10/month) if you need CRM integrations, file uploads, or analytics on form submissions.
