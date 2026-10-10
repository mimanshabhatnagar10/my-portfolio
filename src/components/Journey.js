/**
 * Journey & Education Component
 * Transparent timeline covering B.E. CSE (AI) at Chandigarh University (CGPA 8.56),
 * 12th Board Examination (90%), and 10th Matriculation Board Examination (94%).
 */
import { education } from '../data/education.js';
import { experience } from '../data/experience.js';

export function renderJourney() {
  const primaryEdu = education[0]; // B.E. CSE (AI)
  const secondaryEduList = education.slice(1); // 12th Board (90%) & 10th Board (94%)

  const eduCoursework = primaryEdu.courseworkAreas
    .map(c => `<span class="tag">${c}</span>`)
    .join('');

  const eduHighlights = primaryEdu.highlights
    .map(h => `<li>${h}</li>`)
    .join('');

  const boardEducationCards = secondaryEduList
    .map(item => `
      <div class="timeline-card" style="margin-top: var(--space-4); border-color: rgba(99, 102, 241, 0.2);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h4 class="timeline-role" style="font-size: 1.1rem; color: var(--text-primary);">${item.degree}</h4>
            <div class="timeline-org" style="font-size: 0.885rem;">${item.institution} · ${item.major}</div>
          </div>
          <span class="edu-gpa-badge" style="font-size: 0.95rem; padding: 0.25rem 0.75rem;">
            ${item.gradeLabel}
          </span>
        </div>
        <p class="timeline-desc" style="font-size: 0.9rem; margin-bottom: 0.5rem;">${item.description}</p>
        <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55;">
          ${item.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `)
    .join('');

  const internshipCards = experience.internships
    .map(item => `
      <div class="timeline-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h4 class="timeline-role">${item.role}</h4>
            <div class="timeline-org">${item.organization} · ${item.location}</div>
          </div>
          <span class="tag tag-accent">${item.type}</span>
        </div>
        <p class="timeline-desc">${item.description}</p>
        <ul style="padding-left: 1.25rem; font-size: 0.885rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.75rem;">
          ${item.responsibilities.map(r => `<li>${r}</li>`).join('')}
        </ul>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
          ${item.skillsGained.map(s => `<span class="tag">${s}</span>`).join('')}
        </div>
      </div>
    `)
    .join('');

  return `
    <section id="journey" class="section" aria-label="Education and Experience Journey">
      <div class="container">
        
        <div class="section-header">
          <span class="section-eyebrow">04 · Academic & Community Path</span>
          <h2 class="section-title">Education & The Journey So Far</h2>
          <p class="section-subtitle">
            A comprehensive view of academic milestones — B.E. CSE (AI) at Chandigarh University, Class XII Board (90%), Class X Matriculation (94%) — alongside community service initiatives.
          </p>
        </div>

        <div class="journey-grid">
          
          <!-- Left: Formal Education & Board Records -->
          <div>
            <h3 class="journey-column-title">
              <span>🎓</span>
              <span>Academic Education</span>
            </h3>

            <!-- Primary University Degree Card -->
            <div class="education-highlight-card">
              <div class="edu-badge-top">
                <span class="tag tag-accent">B.E. Specialization</span>
                <span class="edu-gpa-badge">CGPA ${primaryEdu.cgpa}</span>
              </div>

              <div>
                <h4 class="edu-school">${primaryEdu.institution}</h4>
                <div class="edu-degree">${primaryEdu.degree} in ${primaryEdu.major}</div>
                <div style="font-size: 0.9rem; color: var(--accent-cyan); font-weight: 600; margin-top: 0.25rem;">
                  Specialization: ${primaryEdu.specialization}
                </div>
              </div>

              <div class="edu-meta">
                <span>📍 ${primaryEdu.location}</span>
                <span>📅 ${primaryEdu.startYear} – ${primaryEdu.endYear}</span>
              </div>

              <p style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6;">
                ${primaryEdu.description}
              </p>

              <div>
                <h5 style="font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem; font-family: var(--font-mono);">
                  Academic Highlights
                </h5>
                <ul class="edu-list">
                  ${eduHighlights}
                </ul>
              </div>

              <div style="margin-top: 0.5rem;">
                <h5 style="font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem; font-family: var(--font-mono);">
                  Relevant Core Coursework
                </h5>
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                  ${eduCoursework}
                </div>
              </div>
            </div>

            <!-- 12th Board & 10th Matriculation Cards -->
            <div style="margin-top: var(--space-6);">
              <h4 style="font-size: 0.9rem; font-family: var(--font-mono); color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
                Schooling & Board Examination Records
              </h4>
              ${boardEducationCards}
            </div>

          </div>

          <!-- Right: Experience & Community -->
          <div>
            <h3 class="journey-column-title">
              <span>🌱</span>
              <span>Experience & Community</span>
            </h3>

            <!-- Transparent Experience Note -->
            <div style="background: rgba(99, 102, 241, 0.06); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: var(--radius-md); padding: 1rem; margin-bottom: var(--space-6);">
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                <strong style="color: var(--text-primary);">Career Status:</strong> ${experience.summary}
              </p>
            </div>

            <!-- Internship -->
            <div>
              <h5 style="font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: var(--space-3); font-family: var(--font-mono);">
                Community & Social Impact Internship
              </h5>
              ${internshipCards}
            </div>
          </div>

        </div>

      </div>
    </section>
  `;
}
