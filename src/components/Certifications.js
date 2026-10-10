/**
 * Certifications Component
 * Verified Microsoft credentials with click-to-enlarge lightbox viewing.
 * Supports cascading local asset paths: /certificates/*.png, /images/certificates/*.png, etc.
 */
import { certifications } from '../data/certifications.js';

export function renderCertifications() {
  const certCardsHtml = certifications
    .map(cert => {
      const topicsHtml = cert.topicsCovered
        .map(t => `<li>${t}</li>`)
        .join('');

      const altPath1 = `/images/certificates/${cert.code.toLowerCase()}.png`;
      const altPath2 = `/images/certificates/${cert.id}.png`;

      return `
        <div class="cert-card" id="cert-${cert.id}">
          <div>
            <div class="cert-header">
              <span class="cert-issuer-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 0h11.377v11.377H0zm12.623 0H24v11.377H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z"/>
                </svg>
                <span>${cert.issuer}</span>
              </span>
              <span class="cert-code">${cert.code}</span>
            </div>

            <h3 class="cert-title">${cert.name}</h3>
            <p class="cert-desc">${cert.description}</p>

            <div style="margin-bottom: var(--space-4);">
              <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); font-family: var(--font-mono); margin-bottom: 0.4rem;">
                Core Domains Validated:
              </h4>
              <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55;">
                ${topicsHtml}
              </ul>
            </div>
          </div>

          <div>
            <!-- Click-to-enlarge certificate trigger with thumbnail & cascading fallbacks -->
            <button class="cert-preview-trigger view-cert-btn" data-cert-id="${cert.id}" aria-label="View enlarged certificate for ${cert.name}">
              <img 
                src="${cert.imageSrc}" 
                alt="${cert.name} Certificate"
                onerror="
                  if (!this.dataset.triedAlt1) {
                    this.dataset.triedAlt1 = 'true';
                    this.src = '${altPath1}';
                  } else if (!this.dataset.triedAlt2) {
                    this.dataset.triedAlt2 = 'true';
                    this.src = '${altPath2}';
                  } else {
                    this.style.display = 'none';
                    if (this.nextElementSibling) this.nextElementSibling.style.display = 'flex';
                  }
                "
                style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-sm);"
              />
              <div style="display: none; flex-direction: column; align-items: center; justify-content: center; text-align: center; width: 100%; height: 100%;">
                <div class="cert-preview-icon">📜</div>
                <div class="cert-preview-label">${cert.name}</div>
                <div class="cert-preview-hint">Click to enlarge certificate & view credential details</div>
              </div>
            </button>

            ${cert.verificationUrl ? `
              <div style="margin-top: 0.75rem; text-align: right;">
                <a href="${cert.verificationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
                  <span>Verify Credential</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <section id="certifications" class="section" aria-label="Certifications & Credentials">
      <div class="container">
        
        <div class="section-header">
          <span class="section-eyebrow">05 · Verified Credentials</span>
          <h2 class="section-title">Microsoft Cloud & AI Certifications</h2>
          <p class="section-subtitle">
            Industry credentials validating fundamental competence across artificial intelligence workloads, machine learning principles, and enterprise Azure cloud architectures.
          </p>
        </div>

        <div class="cert-grid">
          ${certCardsHtml}
        </div>

      </div>
    </section>
  `;
}

export function initCertifications() {
  document.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const certId = btn.getAttribute('data-cert-id');
      const cert = certifications.find(c => c.id === certId);
      if (cert && window.openModal) {
        const altPath1 = `/images/certificates/${cert.code.toLowerCase()}.png`;
        const altPath2 = `/images/certificates/${cert.id}.png`;

        window.openModal({
          title: cert.name,
          bodyHtml: `
            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              <div class="modal-img-container" style="min-height: 260px; padding: 1.5rem; text-align: center; flex-direction: column;">
                <!-- Certificate image viewer with cascading fallback placeholder -->
                <img 
                  src="${cert.imageSrc}" 
                  alt="${cert.name} Certificate Image" 
                  onerror="
                    if (!this.dataset.triedAlt1) {
                      this.dataset.triedAlt1 = 'true';
                      this.src = '${altPath1}';
                    } else if (!this.dataset.triedAlt2) {
                      this.dataset.triedAlt2 = 'true';
                      this.src = '${altPath2}';
                    } else {
                      this.style.display = 'none';
                      const fallback = document.getElementById('cert-img-fallback-${cert.id}');
                      if (fallback) fallback.style.display = 'flex';
                    }
                  "
                  style="border-radius: var(--radius-md); box-shadow: var(--shadow-md); max-width: 100%;"
                />
                
                <div id="cert-img-fallback-${cert.id}" style="display: none; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; padding: 2rem;">
                  <div style="font-size: 3rem;">📜</div>
                  <h4 style="font-size: 1.2rem; color: var(--text-primary); font-weight: 700;">${cert.name}</h4>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); max-width: 480px;">
                    This certificate is configured to display your actual image from:
                    <br/><code style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.85rem;">public${cert.imageSrc}</code> or <code style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.85rem;">public/images/certificates/${cert.code.toLowerCase()}.png</code>
                  </p>
                  <div style="font-size: 0.8rem; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 0.5rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                    Drop your certificate image into <strong>public/certificates/</strong> or <strong>public/images/certificates/</strong> to view it here!
                  </div>
                </div>
              </div>

              <div>
                <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Credential Overview</h4>
                <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${cert.description}</p>
              </div>

              <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--text-muted); margin-bottom: 0.25rem;">ISSUING ORGANIZATION</div>
                <div style="font-weight: 700; color: var(--text-primary);">${cert.issuer}</div>
              </div>
            </div>
          `
        });
      }
    });
  });
}
