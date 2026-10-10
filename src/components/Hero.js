/**
 * Hero Component
 * Asymmetric editorial layout with profile photo, live status pill, and key highlights.
 */
import { profile } from '../data/profile.js';
import { profilePhotoDataUri } from '../data/profilePhoto.js';

export function renderHero() {
  const photoSrc = profilePhotoDataUri || '/public/images/profile.jpg';

  return `
    <section id="hero" class="hero-section" aria-label="Introduction">
      <div class="container">
        <div class="hero-grid">
          
          <!-- Left: Narrative & Identity -->
          <div class="hero-content">
            <div class="hero-greeting">
              <span class="status-pill">
                <span class="status-dot"></span>
                <span>${profile.status}</span>
              </span>
              <span class="tag tag-accent">Mohali, India</span>
            </div>

            <div>
              <h1 class="hero-name">
                <span class="text-gradient">${profile.displayName}</span>
              </h1>
              <p style="font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 600; margin-top: 0.5rem; font-size: 1.05rem;">
                ${profile.role} · Computer Science Engineering (AI)
              </p>
            </div>

            <p class="hero-headline">
              ${profile.shortBio}
            </p>

            <div class="hero-actions">
              <a href="#projects" class="btn btn-primary btn-lg">
                <span>View Featured Projects</span>
                <span aria-hidden="true">↓</span>
              </a>
              <a href="#resume" class="btn btn-secondary btn-lg">
                <span>Resume Viewer</span>
              </a>
              <a href="#about" class="btn btn-ghost btn-lg">
                <span>About Me</span>
              </a>
            </div>

            <!-- Key Academic & Technical Metrics -->
            <div class="hero-metrics">
              <div class="metric-item">
                <span class="metric-value text-gradient">8.56</span>
                <span class="metric-label">Academic CGPA</span>
              </div>
              <div class="metric-item">
                <span class="metric-value">4+</span>
                <span class="metric-label">Key Projects</span>
              </div>
              <div class="metric-item">
                <span class="metric-value">2</span>
                <span class="metric-label">Azure Credentials</span>
              </div>
              <div class="metric-item">
                <span class="metric-value">2025–29</span>
                <span class="metric-label">B.E. Cohort</span>
              </div>
            </div>
          </div>

          <!-- Right: Visual Avatar Card -->
          <div class="hero-visual">
            <div class="avatar-container">
              <div class="avatar-ambient-glow"></div>
              <div class="avatar-frame">
                <!-- User's verified photograph -->
                <img 
                  id="hero-profile-photo"
                  src="${photoSrc}" 
                  alt="${profile.displayName} — ${profile.role}" 
                  class="avatar-photo"
                  style="display: block; width: 100%; height: 100%; object-fit: cover; object-position: center top;"
                />
                <div class="avatar-meta">
                  <div class="avatar-meta-title">Mimansha Bhatnagar</div>
                  <div class="avatar-meta-loc">Chandigarh Univ</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;
}
