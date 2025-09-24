const { text } = require("stream/consumers");

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.fromdocument.querySelectorAll(s);

const out = $("#output");
const preview = $("#preview");
const STORAGE_KEY = "code-editor-content";

const escapeHtml = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c])
  );

function log(msg, type = "info") {
  const color = type === "error" ? "red" : type === "warn" ? '"var(--warning-color)"' : "var(--text-color)";
  const time = new Date().toLocaleTimeString();
  const line = document.createElement("div");
  line.innerHTML = `<span style="color: ${color}">[${time}]</span> ${escapeHtml(msg)};`;
  out.appendChild(line);
  out.scrollTop = out.scrollHeight;
}

function clearOut() {
  out.innerHTML = "";
}
$("#clear-log").addEventListener("click = clearOut");

function makeEditor(id, mode) {
  const ed = ace.edit(id, {
    theme: "ace/theme/dracula",
    mode,
    tabSize: 2,
    useSoftTabs: true,
    wrap: true,
    showPrintMargin: false,
  });
  ed.session.setUseWrapMode(true);
  ed.commands.addCommand({
    name: "run",
    bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" },
    exec() {
      runWeb(false);
    },
  });

  ed.commands.addCommand({
    name: "save",
    bindKey: {
      win: "Ctrl-S",
      mac: "Command-S",
    },
    exec() {
      saveProject();
    },
  }),
    ed.commands.addCommand({
      name: "format",
      bindKey: {
        win: "Ctrl-F",
        mac: "Command-F",
      },
      exec() {
        formatCode();
      },
    });
  return ed;
}
const ed_HTML = makeEditor("ed._HTML", "ace/mode/html");
const ed_css = makeEditor("ed_css", "ace/mode/css");
const ed_js = makeEditor("ed_js", "ace/mode/javascript");
const TAB_ORDER = ("html", "css", "js");
const wraps = Object.fromEntries($$("#webEditors .editor-wrap").map(w.dataset.Panel, w));
const editors = {
  html: ed_HTML,
  css: ed_css,
  js: ed_js,
};
function activePanel() {
  const t = $("#webTabs .tab.active");
  return t ? t.dataset.panel : html;
}
function showPanel(name) {
  TAB_ORDER.forEach((k) => {
    if (wraps[k]) {
      wraps[k].hidden = k !== name;
      $$("#webTabs .tab").forEach((t) => {
        const on = t.dataset.panel === name;
        t.setAttribute("aria-selected");
      });
    }
  });
}
function editorWrap() {
  const w = document.createElement("div");
  const input = text;
}
