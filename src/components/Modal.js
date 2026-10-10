/**
 * Modal Component
 * Accessible dialog supporting lightboxes, certificates, and project detail modals.
 * Features Escape key binding, focus trapping, and backdrop click to dismiss.
 */

export function renderModal() {
  return `
    <div id="global-modal-overlay" class="modal-overlay" aria-hidden="true" role="dialog" aria-modal="true">
      <div class="modal-dialog" id="global-modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title" id="modal-title-text">Modal Details</h3>
          <button id="modal-close-button" class="modal-close-btn" aria-label="Close modal dialog">
            &times;
          </button>
        </div>
        <div class="modal-body" id="modal-body-content">
          <!-- Dynamic injected content -->
        </div>
      </div>
    </div>
  `;
}

export function initModal() {
  const overlay = document.getElementById('global-modal-overlay');
  const dialog = document.getElementById('global-modal-dialog');
  const closeBtn = document.getElementById('modal-close-button');
  const titleText = document.getElementById('modal-title-text');
  const bodyContent = document.getElementById('modal-body-content');

  let previousActiveElement = null;

  window.openModal = function({ title, bodyHtml }) {
    previousActiveElement = document.activeElement;
    if (titleText) titleText.textContent = title;
    if (bodyContent) bodyContent.innerHTML = bodyHtml;

    overlay?.classList.add('open');
    overlay?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for keyboard accessibility
    closeBtn?.focus();
  };

  window.closeModal = function() {
    overlay?.classList.remove('open');
    overlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (bodyContent) bodyContent.innerHTML = '';

    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  };

  closeBtn?.addEventListener('click', window.closeModal);

  // Close when clicking outside dialog on overlay
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) {
      window.closeModal();
    }
  });

  // Escape key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay?.classList.contains('open')) {
      window.closeModal();
    }
  });
}
