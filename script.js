(function () {
  'use strict';

  let currentMode = 'js';
  let currentFile = 'js';
  const timers = new Map();
  const counts = new Map();

  const defaultCode = window.TEMPLATES?.['async-fetch']?.code || 'console.log("⚡ JS Playground Ready!");';
  const files = {
    js: localStorage.getItem('js_pg_code_js') || defaultCode,
    html:
      localStorage.getItem('js_pg_code_html') ||
      '<h1>Hello World</h1>',
    css:
      localStorage.getItem('js_pg_code_css') ||
      'body { font-family: sans-serif; }'
  };

  const editorEl = document.getElementById('monaco-editor');
  const fallback = document.getElementById('fallback-editor');
  if (fallback) fallback.value = files.js;

  function getActiveCode() {
    if (window.monacoEditor) return window.monacoEditor.getValue();
    if (fallback && fallback.value) return fallback.value;
    return files[currentFile] || '';
  }

  function setActiveCode(code) {
    files[currentFile] = code;
    if (fallback) fallback.value = code;
    if (window.monacoEditor) window.monacoEditor.setValue(code);
  }

  function switchFile(file) {
    files[currentFile] = getActiveCode();

    currentFile = file;

    document.querySelectorAll('.editor-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.file === file);
    });

    const code = files[file] || '';

    if (window.monacoEditor) {
      window.monacoEditor.setValue(code);

      monaco.editor.setModelLanguage(
        window.monacoEditor.getModel(),
        file === 'html'
          ? 'html'
          : file === 'css'
            ? 'css'
            : 'javascript'
      );
    }

    if (fallback) {
      fallback.value = code;
    }
  }

  function toast(message, type = 'info') {
    const box = document.getElementById('toastContainer');
    if (!box) return;
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = message;
    box.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 250);
    }, 2500);
  }

  function setTheme(name) {
    document.documentElement.setAttribute('data-theme', name);
    localStorage.setItem('js_pg_theme', name);
    document.querySelectorAll('.theme-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.theme === name);
    });
    if (window.monacoEditor) {
      const map = { dracula: 'dracula', cyberpunk: 'cyberpunk', nord: 'nord', 'github-light': 'vs' };
      monaco.editor.setTheme(map[name] || 'vs-dark');
    }
  }

  function openModal(id) {
    closeModals();
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('hidden');
  }

  function closeModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.add('hidden'));
    document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('show'));
  }

  console.table = (...args) =>
    appendLog('info', [JSON.stringify(args[0], null, 2)]);

  function appendLog(level, args) {
    const logs = document.getElementById('consoleLogs');
  
    const row = document.createElement('div');
    row.className = `log-entry level-${level}`;
  
    row.textContent = args
      .map(arg =>
        typeof arg === 'object'
          ? JSON.stringify(arg, null, 2)
          : String(arg)
      )
      .join(' ');
  
    logs.appendChild(row);
  }

  
  function clearLogs() {
    const logs = document.getElementById('consoleLogs');
    if (logs) logs.innerHTML = '';
    logHistory = [];
    const badge = document.getElementById('logCountBadge');
    if (badge) badge.textContent = '0';
    timers.clear();
    counts.clear();
  }

  async function executeJs(code) {
    if (!code?.trim()) return appendLog('warn', ['(Empty code)']);
    const customConsole = {
      log: (...args) => appendLog('log', args),
      info: (...args) => appendLog('info', args),
      warn: (...args) => appendLog('warn', args),
      error: (...args) => appendLog('error', args),
      table: (d) => appendLog('table', [d]),
      time: (l = 'default') => timers.set(l, performance.now()),
      timeEnd: (l = 'default') => {
        const s = timers.get(l);
        appendLog('info', [`⏱️ ${l}: ${(performance.now() - (s || performance.now())).toFixed(2)}ms`]);
        timers.delete(l);
      },
      count: (l = 'default') => {
        counts.set(l, (counts.get(l) || 0) + 1);
        appendLog('log', [`${l}: ${counts.get(l)}`]);
      },
      clear: clearLogs
    };

    const start = performance.now();
    try {
      const fn = new Function('customConsole', '"use strict"; return (async function(console){\n' + code + '\n})(customConsole);');
      await fn(customConsole);
      const timeEl = document.getElementById('execTimeValue');
      if (timeEl) timeEl.textContent = `${(performance.now() - start).toFixed(2)} ms`;
      const status = document.getElementById('statusText');
      if (status) status.textContent = 'Success';
    } catch (err) {
      const timeEl = document.getElementById('execTimeValue');
      if (timeEl) timeEl.textContent = `${(performance.now() - start).toFixed(2)} ms`;
      const status = document.getElementById('statusText');
      if (status) status.textContent = 'Error';
      appendLog('error', [`Runtime Error: ${err.message}`]);
    }
  }

  function renderDomPreview() {
    const iframe = document.getElementById('previewIframe');
    if (iframe) {
      iframe.srcdoc = `
<!DOCTYPE html>
<html>
<head>
<style>
${files.css}
</style>
</head>
<body>

${files.html}

<script>
try {
${files.js}
} catch(e){
  console.error(e);
}
<\/script>

</body>
</html>
`;
    }
    const status = document.getElementById('statusText');
    if (status) status.textContent = 'DOM Rendered';
  }
 
  function clearLogs() {
    const logs = document.getElementById('consoleLogs');
    if (logs) logs.innerHTML = '';
  
    const badge = document.getElementById('logCountBadge');
    if (badge) badge.textContent = '0';
  
    timers.clear();
    counts.clear();
  }

  async function formatCode() {
    try {
      if (window.prettier && window.prettierPlugins?.babel && window.prettierPlugins?.estree) {
        const formatted = await prettier.format(getActiveCode(), {
          parser: 'babel',
          plugins: [prettierPlugins.babel, prettierPlugins.estree],
          singleQuote: true,
          semi: true
        });
        setActiveCode(formatted);
        toast('✨ Formatted Code', 'success');
        return;
      }
      if (window.monacoEditor) {
        const action = window.monacoEditor.getAction('editor.action.formatDocument');
        if (action) {
          await action.run();
          toast('✨ Formatted with Monaco', 'success');
          return;
        }
      }
      toast('Formatting is ready', 'info');
    } catch (err) {
      toast(`Format error: ${err.message}`, 'error');
    }
  }

  function switchMode(newMode) {
    currentMode = newMode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === newMode);
    });
    document.querySelectorAll('.output-tab').forEach(tab => {
      const tabTarget = tab.dataset.tab === 'preview' ? 'dom' : tab.dataset.tab === 'benchmark' ? 'benchmark' : 'js';
      tab.classList.toggle('active', tabTarget === newMode);
    });

    ['console', 'preview', 'benchmark'].forEach(k => {
      const active = k === (newMode === 'dom' ? 'preview' : newMode === 'benchmark' ? 'benchmark' : 'console');
      document.getElementById(`${k}View`)?.classList.toggle('active', active);
    });

    document.getElementById('consoleTools')?.classList.toggle('hidden', newMode !== 'js');
    document.getElementById('previewTools')?.classList.toggle('hidden', newMode !== 'dom');
    document.querySelectorAll('.dom-tab')
      .forEach(tab =>
        tab.classList.toggle('hidden', newMode !== 'dom')
      );

    if (newMode !== 'dom' && currentFile !== 'js') {
      switchFile('js');
    }

    if (newMode === 'dom') {
      renderDomPreview();
    } else if (newMode === 'benchmark') {
      runBenchmark();
    }
  }

  function loadTemplate(key) {
    const t = window.TEMPLATES?.[key];
    if (!t) return;
    files.js = t.code || '';
    files.html = t.html || '';
    files.css = t.css || '';
    switchMode(t.mode || 'js');
    setActiveCode(files.js);
    runCode();
    toast(`Loaded "${t.title}"`, 'success');
  }

  function openShareModal() {
    const payload = {
      js: files.js,
      html: files.html,
      css: files.css,
      mode: currentMode
    };

    const compressed =
      LZString.compressToEncodedURIComponent(
        JSON.stringify(payload)
      );

    const shareUrl =
      `${location.origin}${location.pathname}#share=${compressed}`;

    document.getElementById('shareUrlInput').value = shareUrl;

    openModal('shareModal');
  }

  function initMonaco() {
    if (window.require && typeof window.require === 'function') {
      window.require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' } });
      window.require(['vs/editor/editor.main'], () => {
        if (!editorEl) return;
        window.monacoEditor = monaco.editor.create(editorEl, {
          value: files.js,
          language: 'javascript',
          theme: localStorage.getItem('js_pg_theme') || 'vs-dark',
          fontSize: 14,
          automaticLayout: true,
          fontFamily: "'Fira Code', monospace"
        });
        window.monacoEditor.onDidChangeModelContent(() => {
          files[currentFile] = window.monacoEditor.getValue();

          localStorage.setItem(
            `js_pg_code_${currentFile}`,
            files[currentFile]
          );
        });

        window.monacoEditor.onDidChangeCursorPosition(e => {
          const c = document.getElementById('statusCursor');
          if (c) c.textContent = `Ln ${e.position.lineNumber}, Col ${e.position.column}`;
        });
        if (fallback) fallback.classList.add('hidden');
      }, () => {
        if (fallback) fallback.classList.remove('hidden');
      });
    } else {
      if (fallback) fallback.classList.remove('hidden');
    }
  }

  function initResizer() {
    const gutter = document.getElementById('resizerGutter');
    const pane = document.getElementById('editorPane');
    let drag = false;
    gutter?.addEventListener('mousedown', () => {
      drag = true;
      document.body.style.cursor = 'col-resize';
    });
    window.addEventListener('mousemove', (e) => {
      if (!drag) return;
      if (e.clientX > 200 && e.clientX < window.innerWidth - 200) {
        pane.style.flex = 'none';
        pane.style.width = `${e.clientX}px`;
        window.monacoEditor?.layout();
      }
    });
    window.addEventListener('mouseup', () => {
      drag = false;
      document.body.style.cursor = '';
      window.monacoEditor?.layout();
    });
  }

  function runCode() {
    console.log("RUN CLICKED");
    clearLogs();
  
    if (currentMode === 'dom') {
      renderDomPreview();
      return;
    }
  
    executeJs(getActiveCode());
  }

  function initEvents() {
    document.getElementById('runBtn')?.addEventListener('click', runCode);
    document.getElementById('formatBtn')?.addEventListener('click', formatCode);
    document.getElementById('clearOutputBtn')?.addEventListener('click', clearLogs);
    document.getElementById('clearConsoleBtn')?.addEventListener('click', clearLogs);
    document.getElementById('refreshPreviewBtn')?.addEventListener('click', renderDomPreview);
    document.getElementById('shareBtn')?.addEventListener('click', openShareModal);

    document.querySelectorAll('.editor-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        switchFile(tab.dataset.file);
      });
    });

    document.getElementById('copyCodeBtn')?.addEventListener('click', () => {
      navigator.clipboard.writeText(getActiveCode());
      toast('📋 Code copied', 'success');
    });

    document.getElementById('copyShareUrlBtn')?.addEventListener('click', () => {
      const inp = document.getElementById('shareUrlInput');
      if (inp) {
        navigator.clipboard
          .writeText(inp.value)
          .then(() => toast('🔗 Link copied', 'success'))
          .catch(() => {
            inp.select();
            document.execCommand('copy');
            toast('🔗 Link copied', 'success');
          });
        toast('🔗 Link copied', 'success');
      }
    });

    document.getElementById('exportJsFileBtn')?.addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([getActiveCode()], { type: 'text/javascript' }));
      a.download = 'code.js';
      a.click();
      toast('📄 Exported .js file', 'success');
    });

    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.onclick = () => switchMode(btn.dataset.mode);
    });

    document.querySelectorAll('.output-tab').forEach(tab => {
      tab.onclick = () => {
        const targetMode = tab.dataset.tab === 'preview' ? 'dom' : tab.dataset.tab === 'benchmark' ? 'benchmark' : 'js';
        switchMode(targetMode);
      };
    });

    document.getElementById('templatesBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('templatesMenu')?.classList.toggle('show');
    });

    document.getElementById('themeBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('themeMenu')?.classList.toggle('show');
    });

    window.addEventListener('click', (e) => {

      if (
        e.target.closest('.modal-card') ||
        e.target.closest('.cmd-palette-card')
      ) {
        return;
      }

      if (!e.target.closest('.dropdown-wrapper')) {
        document
          .querySelectorAll('.dropdown-menu')
          .forEach(d => d.classList.remove('show'));
      }
    });

    document.querySelectorAll('[data-template]').forEach(b => {
      b.onclick = () => {
        loadTemplate(b.dataset.template);
        closeModals();
      };
    });

    document.querySelectorAll('.theme-option').forEach(b => {
      b.onclick = () => {
        setTheme(b.dataset.theme);
        closeModals();
      };
    });

    document.querySelectorAll('.modal-close-btn').forEach(b => b.onclick = closeModals);
    document.querySelectorAll('.modal-backdrop').forEach(m => m.onclick = (e) => {
      if (e.target === m) closeModals();
    });

    document.getElementById('shortcutsTriggerBtn')?.addEventListener('click', () => openModal('shortcutsModal'));

    document.getElementById('replForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const inp = document.getElementById('replInput');
      const val = inp?.value?.trim();
      if (!val) return;
      appendLog('log', [`> ${val}`]);
      try {
        appendLog('info', [eval(val)]);
      } catch (err) {
        appendLog('error', [err.message]);
      }
      if (inp) inp.value = '';
    });

    // const cmdInput = document.getElementById('cmdPaletteInput');
    // if (cmdInput) {
    //   cmdInput.oninput = () => renderPalette(cmdInput.value);
    // }

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
      // if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      //   e.preventDefault();
      //   openCommandPalette();
      // }
      if (e.key === 'Escape') closeModals();
    });

    if (location.hash?.startsWith('#share=')) {
      try {
        const data = JSON.parse(
          LZString.decompressFromEncodedURIComponent(
            location.hash.replace('#share=', '')
          )
        );

        files.js = data.js || '';
        files.html = data.html || '';
        files.css = data.css || '';

        switchMode(data.mode || 'js');

        switchFile('js');

        if (window.monacoEditor) {
          window.monacoEditor.setValue(files.js);
        } else {
          fallback.value = files.js;
        }

        renderDomPreview();

      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(runCode, 300);
  }

  function start() {
    initMonaco();
    initResizer();
    initEvents();
    setTheme(localStorage.getItem('js_pg_theme') || 'vs-dark');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
