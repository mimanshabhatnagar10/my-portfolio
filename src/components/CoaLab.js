/**
 * COA Lab Component (src/components/CoaLab.js)
 * Computer Organization and Architecture Lab Suite
 * 
 * Tool 1: Interactive Instruction Set Simulator
 *   - Four Addressing Modes: 3-Address, 2-Address, 1-Address (Accumulator), 0-Address (Stack)
 *   - Multiline instruction code editor with syntax guidance
 *   - Run to Completion & Step-by-Step Execution Mode
 *   - Live PC Counter, CPU Registers, Memory Segment, Accumulator (AC), and Stack Panels
 *   - Detailed cycle logs with line-numbered error diagnostics
 *   - Educational Architecture Comparison Table
 * 
 * Tool 2: Functional Number System Converter
 *   - Binary (2), Octal (8), Decimal (10), Hexadecimal (16)
 *   - Arbitrary precision using BigInt (no precision loss for large integers)
 *   - Auto-convert on input/change + explicit Convert button
 *   - Quick preset sample buttons for instant testing
 *   - Swap bases, Clear fields, and Copy Result to clipboard
 */

import { InstructionSimulator, SAMPLE_PROGRAMS } from '../utils/issEngine.js';

export function renderCoaLab() {
  return `
    <section id="coa-lab" class="section" aria-label="Computer Organization and Architecture Lab">
      <div class="container">
        
        <div class="section-header">
          <span class="section-eyebrow">03 · Systems & Hardware Architecture</span>
          <h2 class="section-title">COA Lab — Computer Organization & Architecture</h2>
          <p class="section-subtitle">
            An interactive laboratory suite built to explore computer organization concepts: simulate four CPU addressing formats step-by-step and perform exact digital number system conversions.
          </p>
        </div>

        <!-- COA Lab Tab Switcher -->
        <div class="coa-tab-bar" role="tablist" aria-label="COA Lab Tools">
          <button class="coa-tab-btn active" id="tab-btn-simulator" role="tab" aria-selected="true" aria-controls="panel-simulator">
            <span class="tab-icon">💻</span>
            <span>Instruction Set Simulator</span>
          </button>
          <button class="coa-tab-btn" id="tab-btn-converter" role="tab" aria-selected="false" aria-controls="panel-converter">
            <span class="tab-icon">🔢</span>
            <span>Number System Converter</span>
          </button>
        </div>

        <!-- ========================================================
             PANEL 1: INSTRUCTION SET SIMULATOR
             ======================================================== -->
        <div class="coa-tab-panel active" id="panel-simulator" role="tabpanel" aria-labelledby="tab-btn-simulator">
          <div class="simulator-card">
            
            <!-- Simulator Header & External Repository Link -->
            <div class="simulator-header-bar">
              <div>
                <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.25rem;">
                  <span class="tag tag-accent">Interactive CPU Engine</span>
                  <span class="project-num">4 ADDRESSING FORMATS SUPPORTED</span>
                </div>
                <h3 class="simulator-title">Instruction Set Simulator</h3>
                <p class="simulator-desc">
                  Simulate and step through assembly instructions across Three-Address, Two-Address, One-Address (Accumulator), and Zero-Address (Stack) CPU execution models.
                </p>
              </div>

              <div class="simulator-header-actions">
                <a 
                  href="https://github.com/mimanshabhatnagar10/instruction-set-simulator" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-secondary btn-sm"
                  title="View original repository on GitHub"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>View Source Code ↗</span>
                </a>
              </div>
            </div>

            <!-- Mode Selector Bar -->
            <div style="background: rgba(255,255,255,0.02); padding: 0.85rem 1rem; border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                <span class="converter-label" style="margin: 0; white-space: nowrap;">Instruction Format Mode:</span>
                <div class="sim-mode-pills" role="radiogroup" aria-label="Addressing Mode Selection">
                  <button class="filter-btn active sim-mode-btn" data-mode="threeAddress" type="button">3-Address Mode</button>
                  <button class="filter-btn sim-mode-btn" data-mode="twoAddress" type="button">2-Address Mode</button>
                  <button class="filter-btn sim-mode-btn" data-mode="oneAddress" type="button">1-Address (AC)</button>
                  <button class="filter-btn sim-mode-btn" data-mode="zeroAddress" type="button">0-Address (Stack)</button>
                </div>
              </div>

              <div id="sim-active-mode-badge" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan); font-weight: 600;">
                Active: OP DEST, SRC1, SRC2
              </div>
            </div>

            <!-- Toolbar Controls -->
            <div class="simulator-toolbar">
              <div class="sim-btn-group">
                <button id="sim-run-btn" class="btn btn-primary btn-sm" title="Execute instructions to completion">
                  <span>▶ Run Program</span>
                </button>
                <button id="sim-step-btn" class="btn btn-secondary btn-sm" title="Execute single instruction step-by-step">
                  <span>⏭ Step Instruction</span>
                </button>
                <button id="sim-reset-btn" class="btn btn-secondary btn-sm" title="Reset simulator registers and CPU state">
                  <span>↺ Reset State</span>
                </button>
                <button id="sim-clear-btn" class="btn btn-ghost btn-sm" title="Clear code editor">
                  <span>✕ Clear Editor</span>
                </button>
              </div>

              <!-- Preset Sample Picker -->
              <div class="sim-examples-picker">
                <label for="sim-example-select" class="converter-label" style="margin: 0;">Sample Program:</label>
                <select id="sim-example-select" class="converter-select sim-select-compact">
                  <option value="threeAddress">1. Three-Address Mode (ADD T1, A, B)</option>
                  <option value="twoAddress">2. Two-Address Mode (ADD A, B)</option>
                  <option value="oneAddress">3. One-Address Mode (LOAD A, ADD B)</option>
                  <option value="zeroAddress">4. Zero-Address Mode (PUSH/POP/ADD)</option>
                  <option value="expression">5. Expression Evaluation (A + B) * (C - D)</option>
                </select>
                <button id="sim-load-example-btn" class="btn btn-ghost btn-sm">Load</button>
              </div>
            </div>

            <!-- Simulator Workspace Grid -->
            <div class="simulator-workspace">
              
              <!-- Left Column: Code Editor -->
              <div class="simulator-editor-col">
                <div class="editor-header">
                  <span class="editor-label">Instruction Code Editor</span>
                  <span class="editor-syntax-hint" id="sim-syntax-hint">Syntax: OP DEST, SRC1, SRC2</span>
                </div>
                
                <textarea 
                  id="iss-code-editor" 
                  class="iss-editor" 
                  rows="15" 
                  spellcheck="false" 
                  autocomplete="off"
                  placeholder="// Enter assembly instructions here..."
                >${SAMPLE_PROGRAMS.threeAddress}</textarea>

                <div class="editor-footer-hints">
                  <span>Supported Opcodes: <code>ADD</code>, <code>SUB</code>, <code>MUL</code>, <code>DIV</code>, <code>MOV</code>, <code>LOAD</code>, <code>STORE</code>, <code>PUSH</code>, <code>POP</code></span>
                </div>
              </div>

              <!-- Right Column: CPU State Panels & Execution Console -->
              <div class="simulator-state-col">
                
                <!-- CPU Registers Panel -->
                <div class="state-panel">
                  <div class="state-panel-header">
                    <span class="state-panel-title">CPU Registers</span>
                    <span class="state-panel-tag font-mono" id="sim-pc-badge">PC: 0</span>
                  </div>
                  <div class="registers-grid" id="sim-registers-grid">
                    <!-- Injected by JS -->
                  </div>
                </div>

                <!-- Accumulator & Stack Dynamic Panels -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
                  <!-- Accumulator Panel -->
                  <div class="state-panel" id="panel-ac-box" style="padding: 0.75rem;">
                    <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-light); font-weight: 700; text-transform: uppercase;">
                      Accumulator (AC)
                    </div>
                    <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-top: 0.25rem;" id="sim-ac-val" class="font-mono">
                      0
                    </div>
                    <div style="font-size: 0.675rem; color: var(--text-muted); margin-top: 2px;">Used implicitly in 1-address</div>
                  </div>

                  <!-- Stack Panel -->
                  <div class="state-panel" id="panel-stack-box" style="padding: 0.75rem;">
                    <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">
                      Stack (TOS)
                    </div>
                    <div style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-top: 0.25rem; word-break: break-all;" id="sim-stack-val" class="font-mono">
                      [ ]
                    </div>
                    <div style="font-size: 0.675rem; color: var(--text-muted); margin-top: 2px;">Used implicitly in 0-address</div>
                  </div>
                </div>

                <!-- Memory Segment Panel -->
                <div class="state-panel">
                  <div class="state-panel-header">
                    <span class="state-panel-title">Memory Variables</span>
                    <span class="state-panel-tag font-mono">Data Segment</span>
                  </div>
                  <div class="memory-grid" id="sim-memory-grid">
                    <!-- Injected by JS -->
                  </div>
                </div>

                <!-- Execution Output Console -->
                <div class="state-panel console-panel">
                  <div class="state-panel-header">
                    <span class="state-panel-title">Execution Trace & Console</span>
                    <button id="sim-copy-console-btn" class="converter-text-btn">Copy Log</button>
                  </div>
                  <div class="sim-console-output" id="sim-console-output" role="log" aria-live="polite">
                    <span class="console-placeholder">Click '▶ Run Program' or '⏭ Step Instruction' to execute assembly code.</span>
                  </div>
                </div>

              </div>

            </div>

            <!-- Educational Comparison Table -->
            <div style="margin-top: var(--space-6); padding-top: var(--space-6); border-top: 1px solid var(--border-subtle);">
              <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <span>📚</span>
                <span>Addressing Modes & Instruction Formats Comparison</span>
              </h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.5;">
                Computer architectures utilize different instruction formats based on the number of explicit operand addresses included in each instruction word.
              </p>

              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left; background: var(--bg-secondary); border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-subtle);">
                  <thead>
                    <tr style="background: rgba(255,255,255,0.04); border-bottom: 1px solid var(--border-medium); color: var(--accent-light); font-family: var(--font-mono); font-size: 0.775rem; text-transform: uppercase;">
                      <th style="padding: 0.75rem 1rem;">Instruction Format</th>
                      <th style="padding: 0.75rem 1rem;">Explicit Addresses</th>
                      <th style="padding: 0.75rem 1rem;">Example Syntax</th>
                      <th style="padding: 0.75rem 1rem;">Operand Acquisition</th>
                      <th style="padding: 0.75rem 1rem;">Result Destination</th>
                      <th style="padding: 0.75rem 1rem;">Main Characteristic</th>
                    </tr>
                  </thead>
                  <tbody style="color: var(--text-secondary); font-size: 0.85rem;">
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--text-primary);">Three-Address</td>
                      <td style="padding: 0.75rem 1rem; font-family: var(--font-mono);">3</td>
                      <td style="padding: 0.75rem 1rem; font-family: var(--font-mono); color: var(--accent-cyan);">ADD T1, A, B</td>
                      <td style="padding: 0.75rem 1rem;">2 Explicit Source Operands</td>
                      <td style="padding: 0.75rem 1rem;">Explicit Destination Register</td>
                      <td style="padding: 0.75rem 1rem;">Shortest program length, longer instruction word length.</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--text-primary);">Two-Address</td>
                      <td style="padding: 0.75rem 1rem; font-family: var(--font-mono);">2</td>
                      <td style="padding: 0.75rem 1rem; font-family: var(--font-mono); color: var(--accent-cyan);">ADD A, B</td>
                      <td style="padding: 0.75rem 1rem;">1 Source + 1 Dest/Source</td>
                      <td style="padding: 0.75rem 1rem;">Destination Operand (Overwrites)</td>
                      <td style="padding: 0.75rem 1rem;">Common in CISC architectures; destroys one original operand.</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--text-primary);">One-Address</td>
                      <td style="padding: 0.75rem 1rem; font-family: var(--font-mono);">1</td>
                      <td style="padding: 0.75rem 1rem; font-family: var(--font-mono); color: var(--accent-cyan);">ADD B</td>
                      <td style="padding: 0.75rem 1rem;">Implicit Accumulator (AC) + 1 Explicit</td>
                      <td style="padding: 0.75rem 1rem;">Accumulator Register (AC)</td>
                      <td style="padding: 0.75rem 1rem;">Requires explicit LOAD / STORE instructions for memory sync.</td>
                    </tr>
                    <tr>
                      <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--text-primary);">Zero-Address</td>
                      <td style="padding: 0.75rem 1rem; font-family: var(--font-mono);">0</td>
                      <td style="padding: 0.75rem 1rem; font-family: var(--font-mono); color: var(--accent-cyan);">ADD</td>
                      <td style="padding: 0.75rem 1rem;">Popped from Top of Stack (TOS)</td>
                      <td style="padding: 0.75rem 1rem;">Pushed back onto Stack</td>
                      <td style="padding: 0.75rem 1rem;">Uses PUSH/POP stack operations; basis for JVM/stack machines.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        <!-- ========================================================
             PANEL 2: NUMBER SYSTEM CONVERTER
             ======================================================== -->
        <div class="coa-tab-panel" id="panel-converter" role="tabpanel" aria-labelledby="tab-btn-converter">
          <div class="coa-card" id="coa-converter-card" style="max-width: 900px; margin: 0 auto;">
            
            <div class="coa-card-header">
              <div class="coa-card-badge-row">
                <span class="tag tag-accent">Arbitrary-Precision Arithmetic</span>
                <span class="project-num">CONVERTER // LAB 02</span>
              </div>
              <h3 class="coa-card-title">Number System Converter</h3>
              <p class="coa-card-desc">
                Convert values between Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hexadecimal (Base 16) with exact <code>BigInt</code> arithmetic and real-time input validation.
              </p>
            </div>

            <!-- Quick Preset Sample Chips -->
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
              <span class="converter-label" style="margin: 0;">Sample Numbers:</span>
              <button class="btn btn-ghost btn-sm conv-sample-btn" data-val="42" data-base="10">42 (Dec)</button>
              <button class="btn btn-ghost btn-sm conv-sample-btn" data-val="101010" data-base="2">101010 (Bin)</button>
              <button class="btn btn-ghost btn-sm conv-sample-btn" data-val="2A" data-base="16">2A (Hex)</button>
              <button class="btn btn-ghost btn-sm conv-sample-btn" data-val="52" data-base="8">52 (Oct)</button>
              <button class="btn btn-ghost btn-sm conv-sample-btn" data-val="9007199254740991" data-base="10">Max Safe Int</button>
            </div>

            <!-- Converter Interface -->
            <div class="converter-box" role="region" aria-label="Number System Conversion Tool">
              
              <!-- System Selectors & Swap -->
              <div class="converter-controls-row">
                <div class="converter-select-wrap">
                  <label for="converter-from-base" class="converter-label">From (Input Base):</label>
                  <select id="converter-from-base" class="converter-select" aria-label="Input number system">
                    <option value="10">Decimal (Base 10)</option>
                    <option value="2">Binary (Base 2)</option>
                    <option value="16">Hexadecimal (Base 16)</option>
                    <option value="8">Octal (Base 8)</option>
                  </select>
                </div>

                <button id="converter-swap-btn" class="converter-swap-btn" title="Swap input and output number systems" aria-label="Swap input and output systems">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="17 1 21 5 17 9"></polyline>
                    <path d="M3 5h18"></path>
                    <polyline points="7 23 3 19 7 15"></polyline>
                    <path d="M21 19H3"></path>
                  </svg>
                </button>

                <div class="converter-select-wrap">
                  <label for="converter-to-base" class="converter-label">To (Output Base):</label>
                  <select id="converter-to-base" class="converter-select" aria-label="Output number system">
                    <option value="2">Binary (Base 2)</option>
                    <option value="10">Decimal (Base 10)</option>
                    <option value="16">Hexadecimal (Base 16)</option>
                    <option value="8">Octal (Base 8)</option>
                  </select>
                </div>
              </div>

              <!-- Input Field & Convert/Clear Row -->
              <div class="converter-field-wrap">
                <div class="converter-field-header">
                  <label for="converter-input-val" class="converter-label" id="converter-input-label">
                    Enter Decimal Number:
                  </label>
                  <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <button id="converter-manual-btn" class="btn btn-primary btn-sm" type="button" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">
                      Convert Now
                    </button>
                    <button id="converter-clear-btn" class="converter-text-btn" type="button">
                      Clear ✕
                    </button>
                  </div>
                </div>
                <input 
                  type="text" 
                  id="converter-input-val" 
                  class="converter-input" 
                  placeholder="e.g. 42" 
                  autocomplete="off" 
                  spellcheck="false"
                  aria-describedby="converter-error-msg"
                />
                <div id="converter-error-msg" class="converter-error" role="alert" style="display: none;"></div>
              </div>

              <!-- Output Display Box -->
              <div class="converter-output-box">
                <div class="converter-output-header">
                  <span class="converter-output-label" id="converter-output-label">Converted Result (Binary):</span>
                  <button id="converter-copy-btn" class="btn btn-ghost btn-sm" type="button" title="Copy converted result to clipboard">
                    <span id="converter-copy-text">Copy Result</span>
                  </button>
                </div>
                <div class="converter-result-display" id="converter-result-val">
                  <span class="converter-placeholder-text">Enter a number above to convert</span>
                </div>
              </div>

              <!-- Quick Cross-Representation Grid -->
              <div class="converter-quick-grid" id="converter-cross-grid">
                <div class="quick-cell">
                  <span class="quick-cell-label">BIN (Base 2)</span>
                  <span class="quick-cell-val font-mono" id="quick-val-bin">—</span>
                </div>
                <div class="quick-cell">
                  <span class="quick-cell-label">OCT (Base 8)</span>
                  <span class="quick-cell-val font-mono" id="quick-val-oct">—</span>
                </div>
                <div class="quick-cell">
                  <span class="quick-cell-label">DEC (Base 10)</span>
                  <span class="quick-cell-val font-mono" id="quick-val-dec">—</span>
                </div>
                <div class="quick-cell">
                  <span class="quick-cell-label">HEX (Base 16)</span>
                  <span class="quick-cell-val font-mono" id="quick-val-hex">—</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

export function initCoaLab() {
  // ==========================================
  // 1. Tab Switching Logic
  // ==========================================
  const tabBtnSim = document.getElementById('tab-btn-simulator');
  const tabBtnConv = document.getElementById('tab-btn-converter');
  const panelSim = document.getElementById('panel-simulator');
  const panelConv = document.getElementById('panel-converter');

  tabBtnSim?.addEventListener('click', () => {
    tabBtnSim.classList.add('active');
    tabBtnSim.setAttribute('aria-selected', 'true');
    tabBtnConv?.classList.remove('active');
    tabBtnConv?.setAttribute('aria-selected', 'false');

    panelSim?.classList.add('active');
    panelConv?.classList.remove('active');
  });

  tabBtnConv?.addEventListener('click', () => {
    tabBtnConv.classList.add('active');
    tabBtnConv.setAttribute('aria-selected', 'true');
    tabBtnSim?.classList.remove('active');
    tabBtnSim?.setAttribute('aria-selected', 'false');

    panelConv?.classList.add('active');
    panelSim?.classList.remove('active');
  });

  // ==========================================
  // 2. Instruction Set Simulator Logic
  // ==========================================
  const sim = new InstructionSimulator();

  const editor = document.getElementById('iss-code-editor');
  const runBtn = document.getElementById('sim-run-btn');
  const stepBtn = document.getElementById('sim-step-btn');
  const resetBtn = document.getElementById('sim-reset-btn');
  const clearBtn = document.getElementById('sim-clear-btn');
  const loadExampleBtn = document.getElementById('sim-load-example-btn');
  const exampleSelect = document.getElementById('sim-example-select');
  const consoleOutput = document.getElementById('sim-console-output');
  const copyConsoleBtn = document.getElementById('sim-copy-console-btn');
  const registersGrid = document.getElementById('sim-registers-grid');
  const memoryGrid = document.getElementById('sim-memory-grid');
  const pcBadge = document.getElementById('sim-pc-badge');
  const acValDisplay = document.getElementById('sim-ac-val');
  const stackValDisplay = document.getElementById('sim-stack-val');
  const activeModeBadge = document.getElementById('sim-active-mode-badge');
  const syntaxHint = document.getElementById('sim-syntax-hint');

  let currentMode = 'threeAddress';
  let isSteppingActive = false;

  const modeHints = {
    threeAddress: {
      badge: "Active: Three-Address Mode (OP DEST, SRC1, SRC2)",
      syntax: "Syntax: OP DEST, SRC1, SRC2",
      exampleKey: "threeAddress"
    },
    twoAddress: {
      badge: "Active: Two-Address Mode (OP DEST, SRC)",
      syntax: "Syntax: OP DEST, SRC (DEST = DEST op SRC)",
      exampleKey: "twoAddress"
    },
    oneAddress: {
      badge: "Active: One-Address Mode (LOAD A, ADD B, STORE C)",
      syntax: "Syntax: OP OPERAND (Accumulator AC)",
      exampleKey: "oneAddress"
    },
    zeroAddress: {
      badge: "Active: Zero-Address Mode (PUSH/POP/ADD/SUB)",
      syntax: "Syntax: PUSH src / POP dest / OP",
      exampleKey: "zeroAddress"
    }
  };

  // Mode Selection Pills
  document.querySelectorAll('.sim-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sim-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedMode = btn.getAttribute('data-mode');
      currentMode = selectedMode;

      const config = modeHints[selectedMode] || modeHints.threeAddress;
      if (activeModeBadge) activeModeBadge.textContent = config.badge;
      if (syntaxHint) syntaxHint.textContent = config.syntax;
      if (exampleSelect) exampleSelect.value = config.exampleKey;

      if (editor && SAMPLE_PROGRAMS[config.exampleKey]) {
        editor.value = SAMPLE_PROGRAMS[config.exampleKey];
      }

      isSteppingActive = false;
      sim.reset();
      updateSimulatorUI(null);
    });
  });

  function renderRegisters(regs) {
    if (!registersGrid) return;
    const entries = Object.entries(regs);
    registersGrid.innerHTML = entries.map(([name, val]) => `
      <div class="sim-state-item ${name === 'AC' ? 'highlight-ac' : ''}">
        <span class="sim-state-name">${name}</span>
        <span class="sim-state-val font-mono">${val}</span>
      </div>
    `).join('');
  }

  function renderMemory(mem) {
    if (!memoryGrid) return;
    const entries = Object.entries(mem);
    if (entries.length === 0) {
      memoryGrid.innerHTML = `<span class="sim-state-empty">No variables in memory</span>`;
      return;
    }
    memoryGrid.innerHTML = entries.map(([name, val]) => `
      <div class="sim-state-item">
        <span class="sim-state-name">${name}</span>
        <span class="sim-state-val font-mono">${val}</span>
      </div>
    `).join('');
  }

  function updateSpecialPanels() {
    if (acValDisplay) {
      acValDisplay.textContent = sim.registers.AC !== undefined ? sim.registers.AC : 0;
    }
    if (stackValDisplay) {
      stackValDisplay.textContent = sim.stack && sim.stack.length > 0 ? `[ ${sim.stack.join(', ')} ]` : '[ ]';
    }
  }

  function updateSimulatorUI(result) {
    if (pcBadge) pcBadge.textContent = `PC: ${sim.pc}`;
    renderRegisters(sim.registers);
    renderMemory(sim.memory);
    updateSpecialPanels();

    if (!consoleOutput) return;

    if (!result) {
      consoleOutput.innerHTML = `<span class="console-placeholder">Simulator reset. Ready for instructions.</span>`;
      return;
    }

    if (result.success !== false && !result.error) {
      const logsHtml = (result.logs || []).map(log => {
        if (log.startsWith('\n')) {
          return `<div class="console-line console-success">${log.trim()}</div>`;
        }
        return `<div class="console-line">${escapeHtml(log)}</div>`;
      }).join('');

      const finishedBanner = result.finished
        ? `<div class="console-banner-success">✔ Execution Finished (${result.cycles} Cycles)</div>`
        : `<div class="console-banner-success">▶ Execution Trace (${result.cycles || 0} Cycles)</div>`;

      consoleOutput.innerHTML = `
        ${finishedBanner}
        <div class="console-logs-flow">${logsHtml}</div>
      `;

      // Auto scroll console to bottom
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
    } else {
      consoleOutput.innerHTML = `
        <div class="console-banner-error">✕ ${escapeHtml(result.error || 'Execution Error')}</div>
        ${result.logs && result.logs.length > 0 ? `
          <div class="console-logs-flow" style="margin-top: 0.5rem; opacity: 0.85;">
            ${result.logs.map(l => `<div class="console-line">${escapeHtml(l)}</div>`).join('')}
          </div>
        ` : ''}
      `;
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, match => {
      const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
      return map[match];
    });
  }

  runBtn?.addEventListener('click', () => {
    isSteppingActive = false;
    const code = editor?.value || '';
    const res = sim.run(code, currentMode);
    updateSimulatorUI(res);
  });

  stepBtn?.addEventListener('click', () => {
    const code = editor?.value || '';

    if (!isSteppingActive) {
      try {
        sim.prepare(code, currentMode);
        isSteppingActive = true;
      } catch (err) {
        updateSimulatorUI({ success: false, error: err.message, logs: [] });
        return;
      }
    }

    const stepRes = sim.stepNext();
    updateSimulatorUI(stepRes);

    if (stepRes.finished || stepRes.error) {
      isSteppingActive = false;
    }
  });

  resetBtn?.addEventListener('click', () => {
    isSteppingActive = false;
    sim.reset();
    updateSimulatorUI(null);
  });

  clearBtn?.addEventListener('click', () => {
    isSteppingActive = false;
    if (editor) editor.value = '';
    sim.reset();
    updateSimulatorUI(null);
    editor?.focus();
  });

  loadExampleBtn?.addEventListener('click', () => {
    isSteppingActive = false;
    const key = exampleSelect?.value || 'threeAddress';
    if (editor && SAMPLE_PROGRAMS[key]) {
      editor.value = SAMPLE_PROGRAMS[key];
      sim.reset();
      updateSimulatorUI(null);
    }
  });

  copyConsoleBtn?.addEventListener('click', () => {
    const text = consoleOutput?.innerText || '';
    if (!text || text.includes('Ready for instructions')) return;
    navigator.clipboard.writeText(text).then(() => {
      copyConsoleBtn.textContent = 'Copied! ✔';
      setTimeout(() => { copyConsoleBtn.textContent = 'Copy Log'; }, 2000);
    });
  });

  // Initial State Rendering
  renderRegisters(sim.registers);
  renderMemory(sim.memory);
  updateSpecialPanels();

  // ==========================================
  // 3. Number System Converter Logic
  // ==========================================
  const fromSelect = document.getElementById('converter-from-base');
  const toSelect = document.getElementById('converter-to-base');
  const swapBtn = document.getElementById('converter-swap-btn');
  const clearConvBtn = document.getElementById('converter-clear-btn');
  const manualConvBtn = document.getElementById('converter-manual-btn');
  const inputField = document.getElementById('converter-input-val');
  const errorBox = document.getElementById('converter-error-msg');
  const resultDisplay = document.getElementById('converter-result-val');
  const copyBtn = document.getElementById('converter-copy-btn');
  const copyText = document.getElementById('converter-copy-text');
  const inputLabel = document.getElementById('converter-input-label');
  const outputLabel = document.getElementById('converter-output-label');

  const quickBin = document.getElementById('quick-val-bin');
  const quickOct = document.getElementById('quick-val-oct');
  const quickDec = document.getElementById('quick-val-dec');
  const quickHex = document.getElementById('quick-val-hex');

  const systemNames = {
    "2": "Binary",
    "8": "Octal",
    "10": "Decimal",
    "16": "Hexadecimal"
  };

  const systemPlaceholders = {
    "2": "e.g. 101010",
    "8": "e.g. 52",
    "10": "e.g. 42",
    "16": "e.g. 2A or 2a"
  };

  function updateLabels() {
    const fromBase = fromSelect?.value || "10";
    const toBase = toSelect?.value || "2";
    if (inputLabel) inputLabel.textContent = `Enter ${systemNames[fromBase]} Number:`;
    if (outputLabel) outputLabel.textContent = `Converted Result (${systemNames[toBase]}):`;
    if (inputField) inputField.placeholder = systemPlaceholders[fromBase] || "Enter number";
  }

  function parseInputToBigInt(rawStr, baseStr) {
    const clean = rawStr.trim();
    if (!clean) return null;

    const base = parseInt(baseStr, 10);

    if (base === 2) {
      if (!/^[01]+$/.test(clean)) {
        throw new Error("Invalid Binary number: only digits '0' and '1' are allowed.");
      }
      return BigInt("0b" + clean);
    } else if (base === 8) {
      if (!/^[0-7]+$/.test(clean)) {
        throw new Error("Invalid Octal number: only digits '0' through '7' are allowed.");
      }
      return BigInt("0o" + clean);
    } else if (base === 10) {
      if (!/^[0-9]+$/.test(clean)) {
        throw new Error("Invalid Decimal number: only digits '0' through '9' are allowed.");
      }
      return BigInt(clean);
    } else if (base === 16) {
      if (!/^[0-9a-fA-F]+$/.test(clean)) {
        throw new Error("Invalid Hexadecimal: only digits 0-9 and letters A-F (or a-f) are allowed.");
      }
      return BigInt("0x" + clean);
    }

    throw new Error("Unsupported number system.");
  }

  function formatBigIntToBase(bigIntVal, targetBaseStr) {
    const base = parseInt(targetBaseStr, 10);
    if (base === 16) {
      return bigIntVal.toString(16).toUpperCase();
    }
    return bigIntVal.toString(base);
  }

  function performConversion() {
    const rawInput = inputField?.value || "";
    const fromBase = fromSelect?.value || "10";
    const toBase = toSelect?.value || "2";

    if (errorBox) {
      errorBox.textContent = "";
      errorBox.style.display = "none";
    }

    if (!rawInput.trim()) {
      if (resultDisplay) {
        resultDisplay.innerHTML = '<span class="converter-placeholder-text">Enter a number above to convert</span>';
      }
      updateQuickGrid(null);
      return;
    }

    try {
      const val = parseInputToBigInt(rawInput, fromBase);
      if (val === null) {
        if (resultDisplay) {
          resultDisplay.innerHTML = '<span class="converter-placeholder-text">Enter a number above to convert</span>';
        }
        updateQuickGrid(null);
        return;
      }

      const converted = formatBigIntToBase(val, toBase);

      if (resultDisplay) {
        resultDisplay.textContent = converted;
      }

      updateQuickGrid(val);
    } catch (err) {
      if (errorBox) {
        errorBox.textContent = err.message || "Invalid input for the selected number system.";
        errorBox.style.display = "block";
      }
      if (resultDisplay) {
        resultDisplay.innerHTML = '<span class="converter-placeholder-text" style="color: var(--accent-rose);">Awaiting valid input...</span>';
      }
      updateQuickGrid(null);
    }
  }

  function updateQuickGrid(bigIntVal) {
    if (bigIntVal === null || bigIntVal === undefined) {
      if (quickBin) quickBin.textContent = "—";
      if (quickOct) quickOct.textContent = "—";
      if (quickDec) quickDec.textContent = "—";
      if (quickHex) quickHex.textContent = "—";
      return;
    }

    if (quickBin) quickBin.textContent = bigIntVal.toString(2);
    if (quickOct) quickOct.textContent = bigIntVal.toString(8);
    if (quickDec) quickDec.textContent = bigIntVal.toString(10);
    if (quickHex) quickHex.textContent = bigIntVal.toString(16).toUpperCase();
  }

  // Preset Sample Chips Event Listeners
  document.querySelectorAll('.conv-sample-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-val');
      const base = btn.getAttribute('data-base');

      if (fromSelect) fromSelect.value = base;
      if (inputField) inputField.value = val;

      updateLabels();
      performConversion();
    });
  });

  inputField?.addEventListener('input', performConversion);
  manualConvBtn?.addEventListener('click', performConversion);

  fromSelect?.addEventListener('change', () => {
    updateLabels();
    performConversion();
  });

  toSelect?.addEventListener('change', () => {
    updateLabels();
    performConversion();
  });

  swapBtn?.addEventListener('click', () => {
    const currentFrom = fromSelect?.value;
    const currentTo = toSelect?.value;
    const currentResult = resultDisplay?.textContent;

    if (fromSelect && toSelect) {
      fromSelect.value = currentTo;
      toSelect.value = currentFrom;
    }

    if (currentResult && !currentResult.includes("Enter a number") && !currentResult.includes("Awaiting")) {
      if (inputField) inputField.value = currentResult;
    }

    updateLabels();
    performConversion();
  });

  clearConvBtn?.addEventListener('click', () => {
    if (inputField) inputField.value = "";
    if (errorBox) {
      errorBox.textContent = "";
      errorBox.style.display = "none";
    }
    if (resultDisplay) {
      resultDisplay.innerHTML = '<span class="converter-placeholder-text">Enter a number above to convert</span>';
    }
    updateQuickGrid(null);
    inputField?.focus();
  });

  copyBtn?.addEventListener('click', () => {
    const currentResult = resultDisplay?.textContent?.trim();
    if (!currentResult || currentResult.includes("Enter a number") || currentResult.includes("Awaiting")) {
      return;
    }

    navigator.clipboard.writeText(currentResult).then(() => {
      if (copyText) {
        copyText.textContent = "Copied! ✔";
        copyBtn.style.color = "var(--accent-emerald)";
        setTimeout(() => {
          copyText.textContent = "Copy Result";
          copyBtn.style.color = "";
        }, 2200);
      }
    }).catch(() => {
      prompt("Copy converted value:", currentResult);
    });
  });

  updateLabels();
}
