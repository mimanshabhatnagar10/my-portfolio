/**
 * About Component
 * In-depth biography, strategic principles, current learning focus, and future roadmap.
 */
import { profile } from '../data/profile.js';

export function renderAbout() {
  const bioHtml = profile.biography
    .map(p => `<p class="bio-paragraph">${p}</p>`)
    .join('');

  const focusListHtml = profile.currentFocus
    .map(item => `<li>${item}</li>`)
    .join('');

  return `
    <section id="about" class="section" aria-label="About Mimansha Bhatnagar">
      <div class="container">
        
        <div class="section-header">
          <span class="section-eyebrow">01 · About Me</span>
          <h2 class="section-title">Hii, I am Mimansha.</h2>
          <p class="section-subtitle">
            Computer Science Engineering student specializing in Artificial Intelligence, passionate about exploring technology, business strategy, and data-driven decision-making.
          </p>
        </div>

        <div class="about-grid">
          
          <!-- Left Column: Biography & Pull Quote -->
          <div class="about-bio-card">
            ${bioHtml}

            <div class="about-quote-box">
              <p>"Combining rigorous technical knowledge with deep business understanding transforms theoretical models into meaningful, practical solutions."</p>
            </div>

            <!-- Future Direction Card -->
            <div class="card" style="margin-top: 1rem; border-color: rgba(99, 102, 241, 0.25);">
              <h3 style="font-size: 1.15rem; color: var(--accent-light); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                <span>🎯</span>
                <span>Future Career Vision</span>
              </h3>
              <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-secondary);">
                ${profile.futureDirection}
              </p>
            </div>
          </div>

          <!-- Right Column: Strategic Pillars & Current Focus -->
          <div class="about-pillars">
            
            <div class="pillar-card">
              <div class="pillar-header">
                <div class="pillar-icon-box">💡</div>
                <h3 class="pillar-title">Strategic Pillars</h3>
              </div>
              <ul class="pillar-list">
                <li><strong>AI-Driven Strategy:</strong> Identifying adoption opportunities to enhance productivity and organizational decision-making.</li>
                <li><strong>Quantitative Analytics:</strong> Leveraging data preprocessing and predictive ML models for informed choices.</li>
                <li><strong>Cross-Disciplinary Bridge:</strong> Translating algorithmic concepts into clear executive value.</li>
              </ul>
            </div>

            <div class="pillar-card">
              <div class="pillar-header">
                <div class="pillar-icon-box">⚡</div>
                <h3 class="pillar-title">Current Focus</h3>
              </div>
              <ul class="pillar-list">
                ${focusListHtml}
              </ul>
            </div>

            <!-- Education Snapshot Card -->
            <div class="pillar-card" style="background: rgba(16, 23, 38, 0.6);">
              <div class="pillar-header">
                <div class="pillar-icon-box">🎓</div>
                <h3 class="pillar-title">Chandigarh University</h3>
              </div>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                Bachelor of Engineering in Computer Science Engineering (Artificial Intelligence), 2025–2029 with a <strong>CGPA of 8.56</strong>.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  `;
}
