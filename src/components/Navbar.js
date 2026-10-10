/**
 * Navbar Component
 * Responsive navigation, active section tracking, theme toggle, and mobile drawer.
 */
import { profile } from '../data/profile.js';
import { profilePhotoDataUri } from '../data/profilePhoto.js';

export function renderNavbar() {
  const photoSrc = profilePhotoDataUri || '/public/images/profile.jpg';

  return `
    <nav class="navbar" id="main-navbar" aria-label="Main Navigation">
      <div class="container navbar-inner">
        <a href="#hero" class="nav-brand" aria-label="Mimansha Bhatnagar Home">
          <div class="brand-monogram" style="overflow: hidden; padding: 0; border: 1px solid rgba(99, 102, 241, 0.4);">
            <img 
              src="${photoSrc}" 
              alt="${profile.displayName}" 
              style="width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block;" 
            />
          </div>
          <div class="brand-info">
            <span class="brand-name">${profile.displayName}</span>
            <span class="brand-title">${profile.role} · AI & Business</span>
          </div>
        </a>

        <ul class="nav-links" id="desktop-nav-links">
          <li><a href="#hero" class="nav-link active">Home</a></li>
          <li><a href="#about" class="nav-link">About</a></li>
          <li><a href="#projects" class="nav-link">Projects</a></li>
          <li><a href="#coa-lab" class="nav-link">COA Lab</a></li>
          <li><a href="#skills" class="nav-link">Skills</a></li>
          <li><a href="#journey" class="nav-link">Journey</a></li>
          <li><a href="#gallery" class="nav-link">Certificates & Gallery</a></li>
          <li><a href="#resume" class="nav-link">Resume</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
        </ul>

        <div class="nav-actions">
          <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Toggle Dark / Light Theme" title="Toggle Theme">
            <span id="theme-icon" aria-hidden="true">🌙</span>
          </button>
          
          <a href="#contact" class="btn btn-primary btn-sm">Let's Connect</a>

          <button id="mobile-toggle-btn" class="mobile-nav-toggle" aria-label="Open Mobile Menu" aria-expanded="false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-drawer" class="mobile-drawer" aria-hidden="true">
        <a href="#hero" class="mobile-nav-link">Home</a>
        <a href="#about" class="mobile-nav-link">About & Vision</a>
        <a href="#projects" class="mobile-nav-link">Featured Projects</a>
        <a href="#coa-lab" class="mobile-nav-link">COA Lab</a>
        <a href="#skills" class="mobile-nav-link">Technical Skills</a>
        <a href="#journey" class="mobile-nav-link">Education & Board Journey</a>
        <a href="#gallery" class="mobile-nav-link">Certificates & Gallery</a>
        <a href="#resume" class="mobile-nav-link">Resume Viewer</a>
        <a href="#contact" class="mobile-nav-link">Contact & Socials</a>
        <div style="margin-top: 1rem;">
          <a href="#contact" class="btn btn-primary" style="width: 100%;">Get In Touch</a>
        </div>
      </div>
    </nav>
  `;
}

export function initNavbar() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const mobileBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  // 1. Theme Toggle logic
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  toggleBtn?.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  }

  // 2. Mobile drawer toggle logic
  mobileBtn?.addEventListener('click', () => {
    const isOpen = mobileDrawer?.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  function openMobileMenu() {
    mobileDrawer?.classList.add('open');
    mobileDrawer?.setAttribute('aria-hidden', 'false');
    mobileBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove('open');
    mobileDrawer?.setAttribute('aria-hidden', 'true');
    mobileBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  const mobileLinks = mobileDrawer?.querySelectorAll('.mobile-nav-link, .btn');
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // 3. Active link spy on scroll
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('#desktop-nav-links .nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id') || '';
      }
    });

    if (currentId) {
      desktopNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }, { passive: true });
}
