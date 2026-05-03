🚀 JSPlayground
A lightweight, browser-based JavaScript code runner and playground. This project allows you to execute JavaScript snippets in a controlled environment, capture console output, and measure execution performance in real-time.

✨ Features
Sandboxed Execution: Uses a custom Function constructor to isolate code execution.

Intercepted Console: Captures console.log, warn, and error calls and redirects them to a custom UI output.

Performance Tracking: Measures script execution time down to the millisecond using the High Resolution Time API (performance.now()).

Theme Switching: Support for Dark Mode (vs-dark) and Light Mode with persistence using localStorage.

Object Formatting: Automatically "prettifies" objects and arrays using JSON serialization for better readability.

🛠️ How It Works
The core of the playground is the JSPlayground class. It overrides the default browser console by injecting a customConsole proxy into the executed function's scope.

The Execution Flow:
Input: User writes code in the textarea.

Context Injection: The script creates a new Function("console", code).

Execution: The code runs, and all console calls are pushed to an internal logs array.

Rendering: The array is formatted into strings and displayed in the output terminal.

🚀 Quick Start
Clone the repository

Bash
git clone https://github.com/your-username/js-playground.git
Open index.html
Simply open the file in any modern web browser—no build steps or dependencies required!

📂 Project Structure
Plaintext
├── index.html      # The UI structure and layout
├── style.css       # Custom styling and theme variables
└── script.js      # JSPlayground class and DOM logic

🖥️ Usage Example
You can try complex logic, and the playground will handle the formatting:

JavaScript
const user = { id: 1, name: "Gemini", roles: ["Admin", "Dev"] };
console.log("User Data:", user);

const start = Date.now();
// Simulated logic
console.warn("System check complete.");
📝 License
This project is open-source and available under the MIT License.
