/**
 * Contact Component
 * Real contact methods, instant copy email tool, and verified client-side validated form with mailto builder.
 */
import { profile } from '../data/profile.js';

export function renderContact() {
  return `
    <section id="contact" class="section" aria-label="Contact and Social Connections">
      <div class="container">
        
        <div class="section-header">
          <span class="section-eyebrow">09 · Direct Connection</span>
          <h2 class="section-title">Let's Connect & Collaborate</h2>
          <p class="section-subtitle">
            Open to discussing academic projects, internships, AI-driven business strategy opportunities, and collaborative initiatives.
          </p>
        </div>

        <div class="contact-grid">
          
          <!-- Left: Contact Details & Channels -->
          <div class="contact-info-card">
            <div>
              <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
                Get in Touch Directly
              </h3>
              <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">
                Feel free to reach out via email, phone, or connect on LinkedIn and GitHub.
              </p>
            </div>

            <div class="contact-channels">
              
              <!-- Email Item with Copy Button -->
              <div class="contact-channel-item" style="justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: var(--space-3);">
                  <div class="channel-icon">✉️</div>
                  <div class="channel-text">
                    <span class="channel-label">Email Address</span>
                    <a href="mailto:${profile.email}" class="channel-value" style="text-decoration: none; color: inherit;">
                      ${profile.email}
                    </a>
                  </div>
                </div>
                <button id="copy-email-btn" class="btn btn-ghost btn-sm" title="Copy email address to clipboard">
                  <span id="copy-btn-text">Copy</span>
                </button>
              </div>

              <!-- Phone Item -->
              <a href="tel:${profile.phone}" class="contact-channel-item">
                <div class="channel-icon">📞</div>
                <div class="channel-text">
                  <span class="channel-label">Telephone</span>
                  <span class="channel-value">${profile.phone}</span>
                </div>
              </a>

              <!-- Location Item -->
              <div class="contact-channel-item">
                <div class="channel-icon">📍</div>
                <div class="channel-text">
                  <span class="channel-label">Base Location</span>
                  <span class="channel-value">${profile.location}</span>
                </div>
              </div>

              <!-- LinkedIn Item -->
              <a href="${profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-channel-item">
                <div class="channel-icon">💼</div>
                <div class="channel-text">
                  <span class="channel-label">Professional Network</span>
                  <span class="channel-value">LinkedIn Profile ↗</span>
                </div>
              </a>

              <!-- GitHub Item -->
              <a href="${profile.socials.github}" target="_blank" rel="noopener noreferrer" class="contact-channel-item">
                <div class="channel-icon">💻</div>
                <div class="channel-text">
                  <span class="channel-label">Code Repositories</span>
                  <span class="channel-value">GitHub / mimanshabhatnagar10 ↗</span>
                </div>
              </a>

            </div>
          </div>

          <!-- Right: Validated Message Composer -->
          <div class="contact-form-container">
            <form id="contact-form" class="contact-form" novalidate>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">
                Send a Message
              </h3>
              
              <div id="form-feedback-banner" style="display: none;"></div>

              <div class="form-group">
                <label for="contact-name" class="form-label">Full Name *</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  name="name" 
                  class="form-input" 
                  placeholder="e.g. Alex Morgan" 
                  required
                />
                <span class="form-error-msg" id="name-error"></span>
              </div>

              <div class="form-group">
                <label for="contact-email" class="form-label">Email Address *</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  name="email" 
                  class="form-input" 
                  placeholder="e.g. alex@example.com" 
                  required
                />
                <span class="form-error-msg" id="email-error"></span>
              </div>

              <div class="form-group">
                <label for="contact-subject" class="form-label">Subject</label>
                <input 
                  type="text" 
                  id="contact-subject" 
                  name="subject" 
                  class="form-input" 
                  placeholder="e.g. Collaboration on AI Strategy / Project Inquiry"
                />
              </div>

              <div class="form-group">
                <label for="contact-message" class="form-label">Message *</label>
                <textarea 
                  id="contact-message" 
                  name="message" 
                  class="form-textarea" 
                  placeholder="Describe your inquiry, project idea, or opportunity..." 
                  required
                ></textarea>
                <span class="form-error-msg" id="message-error"></span>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" id="submit-contact-btn">
                <span>Send Message via Email</span>
                <span aria-hidden="true">✉</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  `;
}

export function initContact() {
  // 1. Copy Email Button
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-btn-text');

  copyBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(profile.email).then(() => {
      if (copyText) {
        copyText.textContent = "Copied! ✔";
        copyBtn.style.color = "var(--accent-emerald)";
        setTimeout(() => {
          copyText.textContent = "Copy";
          copyBtn.style.color = "";
        }, 2500);
      }
    }).catch(() => {
      // Fallback prompt
      prompt("Copy email address:", profile.email);
    });
  });

  // 2. Form Validation & Submission
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const msgInput = document.getElementById('contact-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const msgError = document.getElementById('message-error');
  const banner = document.getElementById('form-feedback-banner');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    nameError.textContent = '';
    emailError.textContent = '';
    msgError.textContent = '';

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim() || `Inquiry for Mimansha Bhatnagar from ${name}`;
    const message = msgInput.value.trim();

    // Validate Name
    if (!name) {
      nameError.textContent = 'Please provide your full name.';
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      emailError.textContent = 'Please enter your email address.';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate Message
    if (!message) {
      msgError.textContent = 'Please write your message.';
      isValid = false;
    } else if (message.length < 10) {
      msgError.textContent = 'Message should be at least 10 characters.';
      isValid = false;
    }

    if (!isValid) return;

    // Build functional mailto URL
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n--\nSent from Portfolio Website (mimanshabhatnagar.dev)`
    );
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

    if (banner) {
      banner.style.display = 'block';
      banner.className = 'form-success-banner';
      banner.textContent = 'Opening your email client with your pre-composed message...';
    }

    // Trigger user's mail client
    window.location.href = mailtoUrl;

    // Reset form after short delay
    setTimeout(() => {
      form.reset();
      if (banner) {
        banner.textContent = 'Message drafted successfully! Feel free to also reach out directly at mimanshabhatnagar10@gmail.com.';
      }
    }, 1500);
  });
}
