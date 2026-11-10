/**
 * COA Case Study Component
 * In-depth academic report and embedded PDF viewer with download and new-tab view options.
 * Follows the existing website design system, dark/light theme tokens, and typography.
 */

export function renderCoaCaseStudy() {
  const pdfPath = '/public/documents/coa-case-study.pdf';
  const downloadFileName = 'Cache_Memory_Performance_Analysis_Mimansha_Bhatnagar.pdf';

  return `
    <section id="coa-case-study" class="section" aria-label="COA Case Study">
      <div class="container">
        
        <div class="section-header">
          <span class="section-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block;">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span>Academic Case Study · Computer Systems</span>
          </span>
          <h2 class="section-title">COA CASE STUDY</h2>
          <p class="section-subtitle">
            Cache Memory Performance Analysis — An empirical evaluation of memory hierarchy, hit ratios, miss penalties, and Average Memory Access Time (AMAT) under faculty guidance at Chandigarh University.
          </p>
        </div>

        <!-- Case Study Key Highlights Strip -->
        <div class="case-study-highlights-grid">
          <div class="case-study-pill-card">
            <div class="pill-card-icon">⚡</div>
            <div class="pill-card-content">
              <span class="pill-card-label">Hit Ratio</span>
              <span class="pill-card-val">85% (850 / 1,000 accesses)</span>
            </div>
          </div>
          <div class="case-study-pill-card">
            <div class="pill-card-icon">⏱️</div>
            <div class="pill-card-content">
              <span class="pill-card-label">Avg Access Time</span>
              <span class="pill-card-val">AMAT = 9.5 ns (vs 50 ns RAM)</span>
            </div>
          </div>
          <div class="case-study-pill-card">
            <div class="pill-card-icon">🚀</div>
            <div class="pill-card-content">
              <span class="pill-card-label">Memory Speedup</span>
              <span class="pill-card-val">5.26× Faster (81% Latency Cut)</span>
            </div>
          </div>
          <div class="case-study-pill-card">
            <div class="pill-card-icon">🎓</div>
            <div class="pill-card-content">
              <span class="pill-card-label">Academic Details</span>
              <span class="pill-card-val">Dr. Ruchika Gupta · UID: 25BAI10036</span>
            </div>
          </div>
        </div>

        <!-- Document Viewer Container -->
        <div class="case-study-container">
          
          <!-- Document Toolbar -->
          <div class="case-study-toolbar">
            <div class="case-study-toolbar-info">
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span class="case-study-toolbar-title">Case Study: Cache Memory Performance Analysis</span>
                <span class="tag tag-accent">16 Pages</span>
                <span class="tag" style="background: rgba(16, 185, 129, 0.12); color: var(--accent-emerald); border-color: rgba(16, 185, 129, 0.25);">Verified Academic Report</span>
              </div>
              <span class="case-study-toolbar-subtitle">Mimansha Bhatnagar (UID: 25BAI10036) · Department of CSE · Chandigarh University</span>
            </div>

            <div class="case-study-toolbar-actions">
              <a 
                href="${pdfPath}" 
                download="${downloadFileName}" 
                class="btn btn-primary btn-sm" 
                id="download-coa-pdf-btn"
                title="Download the complete COA Case Study PDF"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download PDF</span>
              </a>

              <a 
                href="${pdfPath}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn btn-secondary btn-sm" 
                id="open-coa-pdf-newtab"
                title="Open PDF in a new browser tab"
              >
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
          <div class="case-study-embed-frame" id="case-study-embed-container">
            <iframe 
              id="coa-case-study-iframe"
              src="${pdfPath}#toolbar=1&navpanes=0&view=FitH" 
              title="Cache Memory Performance Analysis — Mimansha Bhatnagar"
              width="100%" 
              height="100%" 
              style="border: none; width: 100%; height: 100%; background: #FFFFFF; display: block;"
              loading="lazy"
            >
              <!-- Graceful Fallback if browser blocks inline iframe -->
              <div class="case-study-fallback">
                <div class="case-study-fallback-icon">📄</div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
                  Cache Memory Performance Analysis PDF
                </h3>
                <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.5rem auto; font-size: 0.95rem; line-height: 1.6;">
                  Inline PDF preview is not supported directly by your mobile browser. You can open the document in a new tab or download an offline copy.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                  <a href="${pdfPath}" download="${downloadFileName}" class="btn btn-primary btn-sm">
                    Download Case Study PDF
                  </a>
                  <a href="${pdfPath}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                    Open in New Tab ↗
                  </a>
                </div>
              </div>
            </iframe>
          </div>

        </div>

      </div>
    </section>
  `;
}

export function initCoaCaseStudy() {
  // Interactive handlers can be attached here if needed
}
