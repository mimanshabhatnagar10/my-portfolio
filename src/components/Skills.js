/**
 * Skills Component
 * Structured domain competencies without fabricated percentage ratings.
 */
import { skillGroups, coreCompetencies } from '../data/skills.js';

export function renderSkills() {
  const cardsHtml = skillGroups
    .map(group => {
      const pillsHtml = group.skills
        .map(s => `
          <div class="skill-pill">
            <span>${s.name}</span>
            <span class="skill-pill-type">${s.type}</span>
          </div>
        `)
        .join('');

      return `
        <div class="skill-category-card">
          <div class="skill-cat-header">
            <h3 class="skill-cat-title">${group.category}</h3>
          </div>
          <p class="skill-cat-desc">${group.description}</p>
          <div class="skill-pills">
            ${pillsHtml}
          </div>
        </div>
      `;
    })
    .join('');

  const competenciesHtml = coreCompetencies
    .map(c => `
      <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1rem; background: var(--surface-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
        <span style="color: var(--accent-emerald);">✦</span>
        <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">${c}</span>
      </div>
    `)
    .join('');

  return `
    <section id="skills" class="section" aria-label="Skills & Expertise">
      <div class="container">
        
        <div class="section-header">
          <span class="section-eyebrow">03 · Technical Matrix</span>
          <h2 class="section-title">Skills, Tools & Strategic Competencies</h2>
          <p class="section-subtitle">
            A balanced foundation uniting computer science fundamentals, data analytics, multi-cloud platforms, and strategic organizational application.
          </p>
        </div>

        <!-- Grouped Skills Grid -->
        <div class="skills-grid">
          ${cardsHtml}
        </div>

        <!-- Core Focus Pillars -->
        <div style="margin-top: var(--space-8); padding-top: var(--space-6); border-top: 1px solid var(--border-subtle);">
          <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); font-family: var(--font-mono); margin-bottom: var(--space-4);">
            Key Competency Focus
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--space-3);">
            ${competenciesHtml}
          </div>
        </div>

      </div>
    </section>
  `;
}
