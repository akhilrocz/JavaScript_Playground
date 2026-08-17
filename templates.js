window.TEMPLATES = {
  'async-fetch': {
    title: '🌀 Async & Fetch API',
    mode: 'js',
    code: `console.log("🚀 Starting data fetch...");
console.time("⏱️ Fetch Duration");

const users = ["octocat", "torvalds", "gaearon"];
const promises = users.map(async (u) => {
  const res = await fetch(\`https://api.github.com/users/\${u}\`);
  const data = await res.json();
  return { username: data.login, publicRepos: data.public_repos, followers: data.followers };
});

const profiles = await Promise.all(promises);
console.timeEnd("⏱️ Fetch Duration");
console.info("✅ Profiles loaded:");
console.table(profiles);`
  },

  'modern-es': {
    title: '⚡ Modern ES2024 Features',
    mode: 'js',
    code: `const inventory = [
  { name: "Asparagus", type: "vegetables", qty: 5 },
  { name: "Bananas", type: "fruit", qty: 12 },
  { name: "Fish", type: "meat", qty: 8 },
  { name: "Cherries", type: "fruit", qty: 20 }
];

console.log("📦 Grouped by Type:", Object.groupBy ? Object.groupBy(inventory, i => i.type) : "Object.groupBy unsupported");

const numbers = [42, 10, 88, 3, 27];
console.log("Original:", numbers);
console.log("Sorted (toSorted):", numbers.toSorted ? numbers.toSorted((a, b) => a - b) : [...numbers].sort((a, b) => a - b));

const user = { name: "Antigravity", tags: ["AI", "Web"] };
const cloned = structuredClone(user);
cloned.tags.push("Coding");
console.table([
  { Version: "Original", Tags: user.tags.join(", ") },
  { Version: "Cloned", Tags: cloned.tags.join(", ") }
]);`
  },

  'canvas-particles': {
    title: '🎨 Canvas Particles',
    mode: 'dom',
    html: `<style>body{margin:0;overflow:hidden;background:#0d1117;}canvas{width:100vw;height:100vh;display:block;}</style><canvas id="c"></canvas>`,
    css: '',
    code: `const canvas = document.getElementById("c"), ctx = canvas.getContext("2d");
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * canvas.width, y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.fillStyle = "#00ffcc"; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill();
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j], d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 100) {
        ctx.strokeStyle = \`rgba(0,255,204,\${1 - d / 100})\`;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }
    }
  });
  requestAnimationFrame(animate);
}
animate();`
  },

  'npm-esm': {
    title: '📦 NPM ESM (Lodash)',
    mode: 'js',
    code: `console.log("⏳ Importing Lodash from esm.sh...");
const { default: _ } = await import("https://esm.sh/lodash-es@4.17.21");
console.info("✅ Lodash loaded successfully!");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log("Chunked Array:", _.chunk(numbers, 3));
console.log("Shuffled Array:", _.shuffle(numbers));

const users = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Charlie", score: 78 }
];
console.table(_.orderBy(users, ["score"], ["desc"]));`
  },

  'algorithms': {
    title: '🌳 Binary Search Tree',
    mode: 'js',
    code: `class TreeNode {
  constructor(v) { this.val = v; this.left = this.right = null; }
}

class BST {
  constructor() { this.root = null; }
  insert(v, n = this.root) {
    if (!this.root) return (this.root = new TreeNode(v));
    if (v < n.val) n.left ? this.insert(v, n.left) : (n.left = new TreeNode(v));
    else if (v > n.val) n.right ? this.insert(v, n.right) : (n.right = new TreeNode(v));
  }
  inOrder(n = this.root, res = []) {
    if (n) { this.inOrder(n.left, res); res.push(n.val); this.inOrder(n.right, res); }
    return res;
  }
}

const tree = new BST();
[50, 30, 70, 20, 40, 60, 80].forEach(n => tree.insert(n));
console.log("BST Root:", tree.root);
console.info("In-Order:", tree.inOrder());`
  },

  'reactive-signals': {
    title: '💡 Reactive Signals',
    mode: 'js',
    code: `let activeEffect = null;
function createSignal(val) {
  const subs = new Set();
  return [
    () => { if (activeEffect) subs.add(activeEffect); return val; },
    (next) => { if (val !== next) { val = next; subs.forEach(e => e()); } }
  ];
}
function createEffect(fn) { activeEffect = fn; fn(); activeEffect = null; }

const [count, setCount] = createSignal(5);
const [price, setPrice] = createSignal(20);
createEffect(() => console.log(\`🔔 \${count()} items × $\${price()} = $\${count() * price()}\`));

setCount(10);
setPrice(25);`
  }
};
