/**
 * Projects Component
 * Category filtering, varied project layout, GitHub repository links, and modal detail views.
 */
import { projects, projectCategories } from '../data/projects.js';

export function renderProjects() {
  const categoryButtonsHtml = projectCategories
    .map((cat, idx) => `
      <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-category="${cat}">
        ${cat}
      </button>
    `)
    .join('');

  const projectsHtml = projects.map(p => renderProjectCard(p)).join('');

  return `
    <section id="projects" class="section" aria-label="Featured Technical Projects">
      <div class="container">
        
        <div class="section-header">
          <span class="section-eyebrow">02 · Applied Engineering</span>
          <h2 class="section-title">Featured Projects & Systems</h2>
          <p class="section-subtitle">
            A portfolio of practical engineering projects spanning machine learning forecasting, object-oriented software systems, cybersecurity defense, and hardware architecture simulation.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="project-filters" id="project-filter-group" role="tablist" aria-label="Project Categories">
          ${categoryButtonsHtml}
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid" id="projects-grid">
          ${projectsHtml}
        </div>

      </div>
    </section>
  `;
}

function renderProjectCard(p) {
  const isWide = p.id === 'stock-market-analysis';
  const techTags = p.technologies
    .map(t => `<span class="tag">${t}</span>`)
    .join('');

  const highlights = p.highlights
    .map(h => `<li>${h}</li>`)
    .join('');

  const githubBtn = p.githubUrl
    ? `
      <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="View Source on GitHub">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
        <span>GitHub</span>
      </a>
    `
    : `
      <span class="tag tag-accent" style="font-size: 0.75rem;">Academic Project</span>
    `;

  return `
    <article class="project-card ${isWide ? 'featured-card' : ''}" data-category="${p.category}" id="project-${p.id}">
      <div>
        <div class="project-top">
          <span class="project-num">PROJECT // ${p.number}</span>
          <span class="project-category-badge">${p.category}</span>
        </div>

        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>

        <ul class="project-highlights-list">
          ${highlights}
        </ul>

        <div class="project-tech-tags">
          ${techTags}
        </div>
      </div>

      <div class="project-footer">
        <span class="project-status">${p.status}</span>
        <div class="project-actions">
          ${p.id === 'instruction-set-simulator' ? `
            <a href="#coa-lab" class="btn btn-primary btn-sm" title="Launch simulator in COA Lab">
              <span>Launch Live Tool ⚡</span>
            </a>
          ` : ''}
          <button class="btn btn-ghost btn-sm view-project-btn" data-project-id="${p.id}">
            <span>Case Study</span>
            <span aria-hidden="true">→</span>
          </button>
          ${githubBtn}
        </div>
      </div>
    </article>
  `;
}

export function initProjects() {
  const filterGroup = document.getElementById('project-filter-group');
  const cards = document.querySelectorAll('.project-card');

  filterGroup?.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterGroup.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selectedCategory = btn.getAttribute('data-category');

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (selectedCategory === 'All' || cardCategory === selectedCategory) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // Project modal trigger
  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project-id');
      const project = projects.find(p => p.id === projId);
      if (project && window.openModal) {
        window.openModal({
          title: `${project.title} · Project Overview`,
          bodyHtml: `
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span class="tag tag-accent">${project.category}</span>
                <span class="tag">${project.status}</span>
              </div>
              <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-primary);">
                ${project.longDescription}
              </p>
              
              <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--accent-light);">Key Highlights</h4>
                <ul style="padding-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
                  ${project.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
              </div>

              <div>
                <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--text-primary);">Technologies Applied</h4>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                  ${project.technologies.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
              </div>

              ${project.githubUrl ? `
                <div style="margin-top: 0.5rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end;">
                  <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                    <span>View Repository on GitHub</span>
                    <span aria-hidden="true">↗</span>
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
