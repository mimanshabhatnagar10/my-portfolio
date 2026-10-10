/**
 * Master Application Orchestration
 * Mimansha Bhatnagar - Personal Portfolio Website
 */

import { renderNavbar, initNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderAbout } from './components/About.js';
import { renderProjects, initProjects } from './components/Projects.js';
import { renderCoaLab, initCoaLab } from './components/CoaLab.js';
import { renderSkills } from './components/Skills.js';
import { renderJourney } from './components/Journey.js';
import { renderGallery, initGallery } from './components/Gallery.js';
import { renderResumeViewer, initResumeViewer } from './components/ResumeViewer.js';
import { renderContact, initContact } from './components/Contact.js';
import { renderModal, initModal } from './components/Modal.js';
import { renderFooter, initFooter } from './components/Footer.js';

function bootstrapApp() {
  const root = document.getElementById('app');
  if (!root) return;

  // Render Master Template
  root.innerHTML = `
    <div class="ambient-background"></div>
    ${renderNavbar()}
    <main id="main-content">
      ${renderHero()}
      ${renderAbout()}
      ${renderProjects()}
      ${renderCoaLab()}
      ${renderSkills()}
      ${renderJourney()}
      ${renderGallery()}
      ${renderResumeViewer()}
      ${renderContact()}
    </main>
    ${renderFooter()}
    ${renderModal()}
  `;

  // Initialize Interactive Components
  initNavbar();
  initProjects();
  initCoaLab();
  initGallery();
  initResumeViewer();
  initContact();
  initModal();
  initFooter();

  // Handle Hash Anchor Scrolling on Load
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
}

// Mount application once DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
