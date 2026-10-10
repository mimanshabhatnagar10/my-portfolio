/**
 * Footer Component
 * Refined branding, sitemap, social links, and smooth back-to-top interaction.
 */
import { profile } from '../data/profile.js';

export function renderFooter() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="footer" aria-label="Footer Navigation">
      <div class="container">
        
        <div class="footer-inner">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <div class="brand-monogram" style="width: 34px; height: 34px; font-size: 0.9rem;">MB</div>
            <div>
              <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${profile.displayName}</div>
              <div style="font-size: 0.775rem; color: var(--text-muted); font-family: var(--font-mono);">${profile.role} · Mohali, India</div>
            </div>
          </div>

          <ul class="footer-links">
            <li><a href="#hero" class="footer-link">Home</a></li>
            <li><a href="#about" class="footer-link">About</a></li>
            <li><a href="#projects" class="footer-link">Projects</a></li>
            <li><a href="#coa-lab" class="footer-link">COA Lab</a></li>
            <li><a href="#skills" class="footer-link">Skills</a></li>
            <li><a href="#journey" class="footer-link">Journey</a></li>
            <li><a href="#gallery" class="footer-link">Certificates & Gallery</a></li>
            <li><a href="#resume" class="footer-link">Resume</a></li>
            <li><a href="#contact" class="footer-link">Contact</a></li>
          </ul>

          <div style="display: flex; align-items: center; gap: var(--space-4);">
            <a href="${profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="footer-link" aria-label="LinkedIn Profile">LinkedIn</a>
            <a href="${profile.socials.github}" target="_blank" rel="noopener noreferrer" class="footer-link" aria-label="GitHub Profile">GitHub</a>
            <button id="back-to-top-btn" class="btn btn-ghost btn-sm" title="Back to top of page">
              <span>↑ Top</span>
            </button>
          </div>
        </div>

        <div style="margin-top: var(--space-6); padding-top: var(--space-4); border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <p class="footer-copy">
            © ${currentYear} ${profile.displayName}. Built with precision, pure HTML, CSS, and modern JavaScript.
          </p>
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
            Chandigarh University · B.E. CSE (AI)
          </div>
        </div>

      </div>
    </footer>
  `;
}

export function initFooter() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
