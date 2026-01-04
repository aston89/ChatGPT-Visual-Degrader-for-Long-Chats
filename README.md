
# ChatGPT Visual Degrader for Long Chats

A lightweight Tampermonkey script to reduce rendering overhead in long ChatGPT conversations using CSS-only visual degradation. The script provides **runtime toggle** between multiple modes to balance usability and performance.

---

## Features

- **SAFE, AGGRESSIVE, EXTREME** modes for progressive visual simplification.
- CSS-only: no manipulation of DOM structure or JavaScript logic.
- Toggle at runtime via a fixed button.
- Reduces CPU/GPU usage by minimizing unnecessary repaints and compositing.
- Compatible with existing collapse/DOM-detach scripts for extreme long chats.

---

## Installation

1. Install **Tampermonkey** or a compatible userscript manager.
2. Copy the script into a new Tampermonkey userscript.
3. Save and refresh ChatGPT web page.

---

## Modes

| Mode        | Description |
|------------|-------------|
| **SAFE**      | Minimal changes. Only `content-visibility` and `contain: paint` applied. Safe for all users, stable performance boost. |
| **AGGRESSIVE** | Removes animations, transitions, shadows, and SVG graphics. Visual fidelity mostly preserved. Suitable for medium-to-long chats. |
| **EXTREME**    | Maximal performance: hides images, videos, SVGs, and other heavy visual elements. Text-only display. Best for very long conversations (200+ messages). |

---

## Usage

- Click the **Visual** button in the lower-left corner to cycle between modes.
- Mode changes are applied instantly and persist in `localStorage` for future sessions.
- Recommended workflow:
  - Start with **SAFE** or **AGGRESSIVE** for standard usage.
  - Use **EXTREME** only for extremely long chats where CPU/memory usage is critical.

---

## Comparison with previous methods

- Older DOM-detach methods attempted to remove old turns from the DOM and restore them when scrolling. This approach often caused unexpected page behavior and full-core CPU usage spikes.
- **This script is purely visual**. It does not remove nodes or modify React state, avoiding side effects.
- Works in tandem with collapse/DOM-detach scripts: visual degradation reduces painting costs while collapse scripts reduce DOM size.

---

## Notes

- CPU and memory usage are still influenced by the underlying ChatGPT page and JavaScript. This script minimizes repaint and visual processing but does not alter internal JS logic.
- Works on ChatGPT web pages: `https://chat.openai.com/*` and `https://chatgpt.com/*`.
- Tested with long conversations and software rendering (Mercury browser), significantly reducing memory footprint while preserving usability.

---

## Development

- Open for contributions, suggestions, and mode tuning.
- Ensure compatibility with future updates by relying solely on CSS and avoiding DOM/JS overrides.
