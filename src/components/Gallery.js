/**
 * Academic Gallery & Certificates Component
 * Unified gallery displaying verified Microsoft Azure AI-900, AZ-900, HERizon 2026, and campus moments.
 */
import { galleryItems, galleryCategories, galleryInstructions } from '../data/gallery.js';

export function renderGallery() {
  const categoryButtonsHtml = galleryCategories
    .map((cat, idx) => `
      <button class="filter-btn ${idx === 0 ? 'active' : ''} gallery-filter-btn" data-category="${cat}">
        ${cat}
      </button>
    `)
    .join('');

  const itemsHtml = galleryItems.map(item => {
    return `
      <div class="gallery-card view-gallery-item" data-id="${item.id}" data-category="${item.category}" style="cursor: pointer;">
        <div class="gallery-image-frame" style="position: relative; height: 230px; background: #0B1120; display: flex; align-items: center; justify-content: center; overflow: hidden;">
          <img 
            src="${item.imageSrc}" 
            alt="${item.title}" 
            loading="lazy" 
            style="width: 100%; height: 100%; object-fit: cover; object-position: center; transition: transform var(--transition-normal);"
          />
        </div>
        <div class="gallery-info" style="padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2);">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="tag tag-accent" style="font-size: 0.7rem;">${item.category}</span>
            <span style="font-size: 0.7rem; font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 600;">${item.badgeLabel || ''}</span>
          </div>
          <h4 style="font-size: 1.05rem; color: var(--text-primary); font-weight: 700; margin: 0; line-height: 1.35;">${item.title}</h4>
          ${item.caption ? `<p class="gallery-caption" style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${item.caption}</p>` : ''}
          ${item.verificationCode ? `
            <div style="font-family: var(--font-mono); font-size: 0.725rem; color: var(--text-muted); margin-top: 2px;">
              Verification ID: <span style="color: var(--accent-light); font-weight: 600;">${item.verificationCode}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  const stepsHtml = galleryInstructions.steps
    .map(step => `<li>${step}</li>`)
    .join('');

  return `
    <section id="gallery" class="section" aria-label="Certificates, Achievements & Campus Moments Gallery">
      <div class="container">
        
        <div class="section-header">
          <span class="section-eyebrow">05 · Verified Credentials & Showcase</span>
          <h2 class="section-title">Certificates & Achievements</h2>
          <p class="section-subtitle">
            Verified Microsoft cloud credentials, university technical appreciation awards, and academic moments.
          </p>
        </div>

        <!-- Category Filters -->
        <div class="project-filters" id="gallery-filter-group" role="tablist" aria-label="Gallery Categories">
          ${categoryButtonsHtml}
        </div>

        <!-- Gallery Grid -->
        <div class="gallery-grid" id="academic-gallery-grid">
          ${itemsHtml}
        </div>

        <!-- Drop-in instructions banner -->
        <div style="margin-top: var(--space-8); background: var(--surface-card); border: 1px dashed var(--border-medium); border-radius: var(--radius-xl); padding: var(--space-6);">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <span style="font-size: 1.4rem;">📜</span>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">
              Verified Credential Repository
            </h4>
          </div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem; line-height: 1.5;">
            All credentials above are verified through official issuing authorities (Microsoft Certiport & Chandigarh University IEEE Council). Click on any card to view the enlarged certificate.
          </p>
        </div>

      </div>
    </section>
  `;
}

export function initGallery() {
  const filterGroup = document.getElementById('gallery-filter-group');
  const items = document.querySelectorAll('.view-gallery-item');

  filterGroup?.addEventListener('click', (e) => {
    const btn = e.target.closest('.gallery-filter-btn');
    if (!btn) return;

    filterGroup.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selectedCat = btn.getAttribute('data-category');

    items.forEach(item => {
      const itemCat = item.getAttribute('data-category');
      if (selectedCat === 'All' || itemCat === selectedCat) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      const photo = galleryItems.find(g => g.id === id);
      if (photo && window.openModal) {
        window.openModal({
          title: photo.title,
          bodyHtml: `
            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              <div class="modal-img-container" style="max-height: 600px; padding: 0.5rem; text-align: center; background: #040813; border-radius: var(--radius-lg); overflow: hidden; display: flex; align-items: center; justify-content: center;">
                <img 
                  src="${photo.imageSrc}" 
                  alt="${photo.title}" 
                  style="max-width: 100%; max-height: 560px; object-fit: contain; border-radius: var(--radius-sm); box-shadow: var(--shadow-lg);"
                />
              </div>

              <div>
                <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap;">
                  <span class="tag tag-accent">${photo.category}</span>
                  <span class="tag">${photo.badgeLabel || ''}</span>
                </div>
                <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${photo.caption || ''}</p>
              </div>

              ${photo.verificationCode ? `
                <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                  <div>
                    <div style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--text-muted); text-transform: uppercase;">Verification Credential ID</div>
                    <div style="font-weight: 700; color: var(--accent-light); font-family: var(--font-mono); font-size: 1rem;">${photo.verificationCode}</div>
                  </div>
                  ${photo.verificationUrl ? `
                    <a href="${photo.verificationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                      <span>Verify on Certiport ↗</span>
                    </a>
                  ` : ''}
                </div>
              ` : ''}

              ${photo.pdfUrl ? `
                <div style="text-align: right;">
                  <a href="${photo.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                    <span>Open Official PDF ↗</span>
                  </a>
                </div>
              ` : ''}
            </div>
          `
        });
      }
    });
  });
}
