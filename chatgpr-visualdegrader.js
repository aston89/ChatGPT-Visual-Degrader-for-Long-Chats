// ==UserScript==
// @name         ChatGPT Visual Degrader for Long Chats
// @namespace    chatgpt-visual-degrader
// @version      1.0.0
// @description  Reduce rendering cost of long ChatGPT chats using CSS-only visual degradation with runtime toggle.
// @match        https://chat.openai.com/*
// @match        https://chatgpt.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const MODES = ['safe', 'aggressive', 'extreme'];
  let currentMode = localStorage.getItem('chatgpt-visual-mode') || 'aggressive';

  const STYLE_ID = 'chatgpt-visual-degrader-style';
  const BTN_ID   = 'chatgpt-visual-degrader-btn';

  function cssFor(mode) {
    if (mode === 'safe') {
      return `
/* SAFE MODE */
article, [data-testid^="conversation-turn"] {
  content-visibility: auto;
  contain: paint;
}
`;
    }

    if (mode === 'aggressive') {
      return `
/* AGGRESSIVE MODE */
article, [data-testid^="conversation-turn"] {
  content-visibility: auto;
  contain: paint;
}

article *, [data-testid^="conversation-turn"] * {
  animation: none !important;
  transition: none !important;
  box-shadow: none !important;
  filter: none !important;
  backdrop-filter: none !important;
}

article svg, [data-testid^="conversation-turn"] svg {
  display: none !important;
}
`;
    }

    // EXTREME
    return `
/* EXTREME MODE */
article, [data-testid^="conversation-turn"] {
  content-visibility: auto;
  contain: paint;
  background: transparent !important;
}

article *, [data-testid^="conversation-turn"] * {
  animation: none !important;
  transition: none !important;
  box-shadow: none !important;
  filter: none !important;
  backdrop-filter: none !important;
  background: transparent !important;
  border: none !important;
}

article img,
article video,
article svg,
[data-testid^="conversation-turn"] img,
[data-testid^="conversation-turn"] video,
[data-testid^="conversation-turn"] svg {
  display: none !important;
}

article pre,
article code {
  background: transparent !important;
  font-family: monospace !important;
}

article h1, article h2, article h3,
[data-testid^="conversation-turn"] h1,
[data-testid^="conversation-turn"] h2,
[data-testid^="conversation-turn"] h3 {
  font-size: 1em !important;
  font-weight: normal !important;
}
`;
  }

  function applyCSS() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }
    style.textContent = cssFor(currentMode);
  }

  function cycleMode() {
    const idx = MODES.indexOf(currentMode);
    currentMode = MODES[(idx + 1) % MODES.length];
    localStorage.setItem('chatgpt-visual-mode', currentMode);
    applyCSS();
    updateButton();
  }

  function updateButton() {
    const btn = document.getElementById(BTN_ID);
    if (btn) {
      btn.textContent = `Visual: ${currentMode.toUpperCase()}`;
    }
  }

  function createButton() {
    if (document.getElementById(BTN_ID)) return;

    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.textContent = `Visual: ${currentMode.toUpperCase()}`;
    Object.assign(btn.style, {
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      zIndex: 2147483647,
      padding: '6px 10px',
      borderRadius: '8px',
      border: 'none',
      background: '#111',
      color: '#fff',
      fontSize: '12px',
      cursor: 'pointer',
      opacity: '0.85'
    });

    btn.addEventListener('click', cycleMode);
    document.body.appendChild(btn);
  }

  function boot() {
    applyCSS();
    createButton();
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
