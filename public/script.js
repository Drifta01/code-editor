// --- Utility ---
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

const STORAGE_KEY = 'code-editor-content-v2';

// --- ACE Editor Initialization ---
let ed_html = null;
let ed_css = null;
let ed_js = null;

function makeEditor(id, mode) {
  const ed = ace.edit(id, {
    theme: 'ace/theme/dracula',
    mode,
    fontSize: '16px',
    tabSize: 2,
    useSoftTabs: true,
    wrap: true,
    showPrintMargin: false,
  });
  ed.session.setUseWrapMode(true);
  return ed;
}

window.addEventListener('DOMContentLoaded', () => {
  // Editors
  ed_html = makeEditor('ed_html', 'ace/mode/html');
  ed_css = makeEditor('ed_css', 'ace/mode/css');
  ed_js = makeEditor('ed_js', 'ace/mode/javascript');

  // Set up tab switching
  $$('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.pane);
    });
  });

  // Save/load buttons
  $('#saveBtn').addEventListener('click', saveProject);
  $('#loadBtn').addEventListener('click', () => $('#openFile').click());
  $('#openFile').addEventListener('change', loadFromFile);

  // Live preview and autosave
  [ed_html, ed_css, ed_js].forEach((ed) =>
    ed.session.on('change', updatePreview)
  );

  // Initial load
  loadProject();
  updatePreview();
});

function switchTab(tabName) {
  $$('.tab').forEach((tab) => {
    tab.setAttribute('aria-selected', String(tab.dataset.pane === tabName));
    tab.tabIndex = tab.dataset.pane === tabName ? 0 : -1;
  });
  $$('.editor-wrap').forEach((wrap) => {
    wrap.hidden = wrap.dataset.pane !== tabName;
  });
}

// --- Save/Load/Export ---
function saveProject() {
  const data = {
    html: ed_html.getValue(),
    css: ed_css.getValue(),
    js: ed_js.getValue(),
    assignment: $('#assignment').value
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  alert('Work saved locally!');
}

function loadProject() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const data = JSON.parse(raw);
      ed_html.setValue(data.html || '', -1);
      ed_css.setValue(data.css || '', -1);
      ed_js.setValue(data.js || '', -1);
      if (data.assignment) $('#assignment').value = data.assignment;
    } catch { /* ignore */ }
  }
}

function loadFromFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = evt => {
    try {
      const data = JSON.parse(evt.target.result);
      ed_html.setValue(data.html || '', -1);
      ed_css.setValue(data.css || '', -1);
      ed_js.setValue(data.js || '', -1);
      if (data.assignment) $('#assignment').value = data.assignment;
    } catch {
      alert('Invalid code file.');
    }
  };
  reader.readAsText(file);
}

// --- Live Preview ---
function updatePreview() {
  const html = ed_html.getValue();
  const css = ed_css.getValue();
  const js = ed_js.getValue();
  const preview = $('#preview');
  const doc = preview.contentDocument || preview.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`);
  doc.close();
}
