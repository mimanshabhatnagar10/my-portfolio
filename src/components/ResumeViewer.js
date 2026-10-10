/**
 * Resume Viewer Component
 * Embedded in-page PDF viewer with 'Download', 'Open in New Tab', and crisp preview rendering.
 */

export function renderResumeViewer() {
  return `
    <section id="resume" class="section" aria-label="Resume & Curriculum Vitae">
      <div class="container">
        
        <div class="section-header">
          <span class="section-eyebrow">06 · Professional Document</span>
          <h2 class="section-title">Resume & Curriculum Vitae</h2>
          <p class="section-subtitle">
            Read my verified resume directly inside the browser or download an official PDF copy.
          </p>
        </div>

        <div class="resume-container">
          
          <!-- Toolbar -->
          <div class="resume-toolbar">
            <div class="resume-toolbar-info">
              <span class="resume-toolbar-title">Mimansha Bhatnagar · Curriculum Vitae</span>
              <span class="resume-toolbar-subtitle">B.E. CSE (Artificial Intelligence) · Chandigarh University</span>
            </div>

            <div class="resume-toolbar-actions">
              <a href="/public/resume.pdf" download="Mimansha_Bhatnagar_Resume.pdf" class="btn btn-primary btn-sm" id="download-resume-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download Resume</span>
              </a>

              <a href="/public/resume.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" id="open-resume-newtab">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>Open in New Tab ↗</span>
              </a>
            </div>
          </div>

          <!-- Embedded PDF Viewer Frame -->
          <div class="resume-embed-frame" id="resume-embed-container" style="height: 820px; background: #0B1120; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-medium);">
            <iframe 
              id="resume-iframe-embed"
              src="/public/resume.pdf" 
              title="Mimansha Bhatnagar Curriculum Vitae"
              width="100%" 
              height="100%" 
              style="border: none; width: 100%; height: 100%; background: #FFFFFF; display: block;"
            >
              <div style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                <p>Your browser does not support inline PDFs.</p>
                <a href="/public/resume.pdf" class="btn btn-primary btn-sm">Download PDF</a>
              </div>
            </iframe>
          </div>

        </div>

      </div>
    </section>
  `;
}

export function initResumeViewer() {
  // Viewer initialized with live /public/resume.pdf
}
