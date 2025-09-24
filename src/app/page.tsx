import "../app/styles.css";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <header>
        <h1>Code Editor</h1>
        <div className="container-row">
          <div className="brand">
            <div className="logo"></div>
            <div className="title">Code Editor</div>
          </div>
          <div className="row">
            <button className="btn-secondary" id="saveBtn" title="Save work locally">
              Save
            </button>
            <button className="btn-secondary" id="loadBtn" title="Load work file">
              Load
            </button>
            <input id="openFile" type="file" accept="application/json" />
          </div>
        </div>
      </header>
      <main>
        <aside className="card-panel-stack">
          <h2>Task / Assignment</h2>
          <textarea
            id="assignment"
            className="text"
            placeholder="Enter your task or assignment details here..."
          ></textarea>
          <div className="stack">
            <label htmlFor="testArea">Validation Tests (JavaScript only - optional) </label>
            <section>
              <button className="tab" role="tab" aria-selected="false" data-panel="cssPanel" id="cssTab" tabIndex={-1}>
                CSS
              </button>
              <button className="tab" role="tab" aria-selected="false" data-panel="js" id="jsTab" tabIndex={-1}>
                JS
              </button>
              <button className="tab" role="tab" aria-selected="false" data-panel="html" id="htmlTab" tabIndex={0}>
                HTML
              </button>
            </section>
          </div>
          <div className="code-editors-row">
            <div className="editor-wrap" data-panel="html">
              <div id="ed_html" className="editor" style={{ display: "any" }}></div>
            </div>
            <div className="editor-wrap" data-panel="css" style={{ display: "none" }}>
              <div id="ed_css" className="editor"></div>
            </div>
            <div className="editor-wrap" data-panel="js" style={{ display: "none" }}>
              <div id="ed_js" className="editor"></div>
            </div>
          </div>
          <div className="stack">
            <h3>Preview</h3>
            <iframe id="preview" className="preview" sandbox="allow-scripts allow-same-origin allow-modals"></iframe>
          </div>
        </aside>
      </main>

      <Script src="/script.js" strategy="lazyOnload" />
    </>
  );
}
