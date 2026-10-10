/**
 * Achievements Component
 * Spotlights college achievements such as HERizon 2.0 with interactive certificate preview.
 * Supports cascading local asset paths: /achievements/herizon-2.png, /images/achievements/herizon-certificate.png, etc.
 */
import { achievements } from '../data/achievements.js';

export function renderAchievements() {
  const ach = achievements[0];

  const detailsHtml = ach.details
    .map(d => `<li>${d}</li>`)
    .join('');

  return `
    <section id="achievements" class="section" style="padding-top: 0;" aria-label="College Achievements">
      <div class="container">
        
        <div class="section-header" style="margin-bottom: var(--space-8);">
          <span class="section-eyebrow">06 · Key Milestones</span>
          <h2 class="section-title">College Achievements</h2>
          <p class="section-subtitle">
            Notable co-curricular milestones and college technical initiatives.
          </p>
        </div>

        <div class="achievement-card">
          <div>
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.75rem;">
              <span class="tag tag-accent">${ach.category}</span>
              <span class="tag">${ach.institution}</span>
            </div>

            <h3 style="font-size: 1.85rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem;">
              ${ach.title}
            </h3>

            <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 1.25rem;">
              ${ach.description}
            </p>

            <ul style="padding-left: 1.25rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
              ${detailsHtml}
            </ul>

            <button class="btn btn-secondary btn-sm view-achievement-btn" data-ach-id="${ach.id}">
              <span>View Achievement Certificate</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <!-- Certificate trigger visual with image thumbnail fallback -->
          <div>
            <button class="cert-preview-trigger view-achievement-btn" data-ach-id="${ach.id}" style="height: 220px;" aria-label="View HERizon 2.0 certificate">
              <img 
                src="${ach.imageSrc}" 
                alt="${ach.title} Certificate" 
                onerror="
                  if (!this.dataset.triedAlt1) {
                    this.dataset.triedAlt1 = 'true';
                    this.src = '/images/achievements/herizon-certificate.png';
                  } else if (!this.dataset.triedAlt2) {
                    this.dataset.triedAlt2 = 'true';
                    this.src = '/images/achievements/herizon-2.png';
                  } else {
                    this.style.display = 'none';
                    if (this.nextElementSibling) this.nextElementSibling.style.display = 'flex';
                  }
                "
                style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-sm);"
              />
              <div style="display: none; flex-direction: column; align-items: center; justify-content: center; text-align: center; width: 100%; height: 100%;">
                <div class="cert-preview-icon">🏆</div>
                <div class="cert-preview-label">${ach.title} Certificate</div>
                <div class="cert-preview-hint">Click to enlarge certificate & view event details</div>
              </div>
            </button>
          </div>
        </div>

      </div>
    </section>
  `;
}

export function initAchievements() {
  document.querySelectorAll('.view-achievement-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ach = achievements[0];
      if (ach && window.openModal) {
        window.openModal({
          title: `${ach.title} · Certificate of Achievement`,
          bodyHtml: `
            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              <div class="modal-img-container" style="min-height: 260px; padding: 1.5rem; text-align: center; flex-direction: column;">
                <img 
                  src="${ach.imageSrc}" 
                  alt="${ach.title} Certificate" 
                  onerror="
                    if (!this.dataset.triedAlt1) {
                      this.dataset.triedAlt1 = 'true';
                      this.src = '/images/achievements/herizon-certificate.png';
                    } else if (!this.dataset.triedAlt2) {
                      this.dataset.triedAlt2 = 'true';
                      this.src = '/images/achievements/herizon-2.png';
                    } else {
                      this.style.display = 'none';
                      const fallback = document.getElementById('ach-img-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }
                  "
                  style="border-radius: var(--radius-md); box-shadow: var(--shadow-md); max-width: 100%;"
                />
                
                <div id="ach-img-fallback" style="display: none; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; padding: 2rem;">
                  <div style="font-size: 3rem;">🏆</div>
                  <h4 style="font-size: 1.2rem; color: var(--text-primary); font-weight: 700;">${ach.title}</h4>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); max-width: 480px;">
                    Configured to display your certificate image from:
                    <br/><code style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.85rem;">public${ach.imageSrc}</code> or <code style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.85rem;">public/images/achievements/herizon-certificate.png</code>
                  </p>
                  <div style="font-size: 0.8rem; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 0.5rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                    Place your certificate image into <strong>public/achievements/</strong> or <strong>public/images/achievements/</strong> to view it directly!
                  </div>
                </div>
              </div>

              <div>
                <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Event Context</h4>
                <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${ach.description}</p>
              </div>

              <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--text-muted); margin-bottom: 0.25rem;">INSTITUTION</div>
                <div style="font-weight: 700; color: var(--text-primary);">${ach.institution}</div>
              </div>
            </div>
          `
        });
      }
    });
  });
}
