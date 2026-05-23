# 🚀 JS Playground

A fast, lightweight, and browser-based JavaScript playground built for experimenting with code in real time.  
Run JavaScript snippets instantly, capture console output, inspect objects cleanly, and measure execution performance — all inside a minimal developer-friendly interface.

---

## ✨ Features

### ⚡ Real-Time JavaScript Execution
Execute JavaScript directly in the browser with zero setup or dependencies.

### 🔒 Sandboxed Code Execution
Uses the `Function` constructor to isolate user code execution from the main application environment.

### 🖥️ Custom Console Interception
Intercepts and displays:

- `console.log()`
- `console.warn()`
- `console.error()`

Outputs are redirected into a custom terminal-style UI for a smoother debugging experience.

### 📊 Performance Monitoring
Tracks execution speed using the **High Resolution Time API** (`performance.now()`), providing precise runtime measurements in milliseconds.

### 🎨 Theme Switching
Supports both:

- 🌙 Dark Mode (`vs-dark`)
- ☀️ Light Mode

Theme preference is automatically saved using `localStorage`.

### 🧩 Smart Object Formatting
Objects and arrays are automatically formatted using JSON serialization for cleaner and more readable output.

### 🚀 Zero Dependencies
No frameworks. No build tools. No installation headaches.  
Just open and run.

---

# 🛠️ How It Works

The playground is powered by a custom `JSPlayground` class that creates a controlled execution environment for running JavaScript safely.

Instead of using the browser’s native console directly, the application injects a custom console proxy into the execution scope.

## Execution Flow

### 1️⃣ User Input
Users write JavaScript code inside the editor textarea.

### 2️⃣ Context Injection

```js
new Function("console", code)
```

A custom console object is passed into the function scope.

### 3️⃣ Secure Execution
The code executes in isolation while console methods are intercepted internally.

### 4️⃣ Log Capture
All console calls are pushed into a structured logs array.

### 5️⃣ Output Rendering
Logs are formatted and displayed inside the custom output terminal.

---

# 🚀 Quick Start

## Clone the Repository

```bash
git clone https://github.com/your-username/js-playground.git
```

## Open the Project

Simply open `index.html` in any modern browser.

No installation, dependencies, or build process required.

---

# 📂 Project Structure

```plaintext
├── index.html   # Main UI layout
├── style.css    # Styling, themes, and responsive design
└── script.js    # JSPlayground core logic and DOM handling
```

---

# 🖥️ Example Usage

```js
const user = {
  id: 1,
  name: "Gemini",
  roles: ["Admin", "Developer"]
};

console.log("User Data:", user);

const start = performance.now();

// Simulated logic
for (let i = 0; i < 1000000; i++) {}

console.warn("System check complete.");

const end = performance.now();

console.log(`Execution Time: ${(end - start).toFixed(2)}ms`);
```

---

# 🌟 Why This Project?

JS Playground was built to provide a simple and focused environment for:

- Practicing JavaScript
- Testing snippets quickly
- Learning console behavior
- Understanding execution timing
- Experimenting without setup friction

It’s ideal for beginners, frontend developers, and anyone who wants a lightweight in-browser coding sandbox.

---

# 📸 Preview

_Add screenshots or GIF demos here to make the repository more engaging._

Example:

```md
![Preview](./preview.png)
```

---

# 🔮 Future Improvements

- Code editor syntax highlighting
- Multi-tab support
- Local snippet storage
- Shareable playground links
- Async/await execution handling
- Console history
- Error stack tracing
- Mobile responsive improvements

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and distribute it for personal or commercial projects.

---

# ⭐ Support

If you found this project useful, consider giving it a **star** on GitHub — it helps increase visibility and supports the project.
