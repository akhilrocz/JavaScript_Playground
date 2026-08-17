# ⚡ JS Playground PRO

An advanced, feature-rich in-browser JavaScript IDE, Sandbox, and Performance Benchmarking environment built for modern web developers.

Run modern JavaScript (ES2024+) with top-level await, inspect complex objects with interactive tree inspectors, test HTML/CSS in live sandboxed DOM preview, benchmark code performance side-by-side, import ESM modules directly from NPM, and share runnable snippets with compressed URLs.

---

## ✨ Features Overview

### 🖥️ Monaco Editor Engine (VS Code in Browser)
- Real VS Code editor core with full JavaScript/TypeScript IntelliSense and autocompletion.
- Parameter hints, error squiggles, syntax diagnostics, code folding, and bracket pair colorization.
- Multi-file tabs: `script.js`, `index.html`, and `styles.css`.
- Prettier code formatter integration (`Shift + Alt + F`).

### ⚡ True Async Execution & Top-Level Await
- Sandboxed async executor with seamless support for `async`/`await`, Promises, and top-level `await`.
- Non-blocking execution of `fetch()`, timers, and Web APIs.
- Real-time high-resolution execution timing (`performance.now()`) with millisecond precision.

### 🛠️ Chrome DevTools-Grade Console
- **Interactive Object Inspector**: Click to expand/collapse nested objects, arrays, maps, sets, functions, and prototypes.
- **Rich Console API**: Intercepts `console.log`, `info`, `warn`, `error`, `table`, `time`/`timeEnd`, `count`, `assert`, `dir`, and `group`.
- **Interactive Sortable Tables**: Beautiful HTML tables generated from `console.table(data)`.
- **Interactive REPL Prompt**: Execute ad-hoc expressions on-the-fly with command history (`Up`/`Down` arrow navigation).
- **Log Filtering & Search**: Instant filter by log level (`All`, `Logs`, `Info`, `Warnings`, `Errors`, `Tables`) and search query.

### 🌐 Live Sandboxed Web / DOM Preview Mode
- Full HTML5 + CSS3 + JS interactive canvas and UI component testing in a sandboxed `<iframe>`.
- Live console bridge piping errors and logs inside the iframe back to the unified playground console.

### 🧪 Performance Benchmarking Comparison Suite
- Compare two candidate implementations side-by-side (e.g. `Array.map` vs `for` loop vs `reduce`).
- Configurable iterations (500 to 10,000 runs) with automatic warmup cycles.
- Operations/second (Hz) calculation, speedup percentage verdict (e.g. "Candidate B is 142% faster"), and comparative bar chart.

### 📦 Dynamic NPM Module ESM Imports
- Import any NPM package on the fly using standard dynamic ESM imports (e.g. `import _ from 'https://esm.sh/lodash-es'`).

### 💾 Snippet Manager & Curated Templates Library
- **Curated Templates**:
  - 🌀 *Async & Fetch API (GitHub API fetch, Promise.allSettled)*
  - ⚡ *Modern ES2024 Features (Object.groupBy, Promise.withResolvers, structuredClone)*
  - 🎨 *Canvas Particle System (Interactive physics particles in DOM preview)*
  - 📦 *NPM ESM Modules (Lodash & Canvas-Confetti via esm.sh)*
  - 🌳 *Data Structures & Algorithms (Binary Search Tree with traversal)*
  - 💡 *Reactive Signals & State (Fine-grained reactivity from scratch)*
  - 🧪 *Loop Benchmark Suite*
- **Saved Snippets**: Save snippets to `localStorage`, search, preview, load, delete, or export/import JSON backup files.

### 🔗 Compressed Shareable URLs & Exports
- URL hash compression using `LZ-String` (`#code=...`) to share exact runnable snippets via URL link.
- Export snippet as `.js` file or copy as formatted Markdown.

### 🎨 Pro Themes & Glassmorphism Design System
- 5 curated developer themes:
  - 🌙 **VS Code Dark**
  - ☀️ **GitHub Light**
  - 🟣 **Dracula**
  - 🌌 **Cyberpunk Neon**
  - ❄️ **Nord Frost**
- Draggable resizable split panes with persistent split layout.
- Command Palette (`Ctrl + K` / `Cmd + K`) for rapid access to all tools and templates.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| **`Ctrl + Enter`** / **`Cmd + Enter`** | Run Code / Execute Mode |
| **`Shift + Alt + F`** | Format Code with Prettier |
| **`Ctrl + L`** | Clear Console Output |
| **`Ctrl + K`** / **`Cmd + K`** | Open Command Palette |
| **`Ctrl + S`** / **`Cmd + S`** | Open Snippet Library / Save Snippet |
| **`Esc`** | Close Open Modals / Dropdowns |
| **`Up / Down Arrow`** (in REPL) | Navigate REPL Command History |

---

## 📂 Project Structure

```plaintext
├── index.html   # Main layout, Monaco container, DevTools console, DOM preview, modals
├── styles.css   # Modern design system, 5 themes, split resizer, object inspector styles
├── script.js    # Core engine: Monaco loader, async sandbox, REPL, benchmarking, templates
└── README.md    # Documentation and usage guide
```

---

## 🚀 Quick Start

1. Open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari).
2. Or serve locally with any static file server:
   ```bash
   npx serve .
   ```
3. No build step or bundler needed.

---

## 📄 License

MIT License. Free to use, modify, and distribute for personal or commercial projects.
