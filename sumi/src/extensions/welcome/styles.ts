/**
 * WelcomePage 样式 — Numas 欢迎页 (替换 codeblitz 默认欢迎页)
 * 主题色走 codeblitz/opensumi token (带中性兜底).
 */
export const styles = `
.app-welcome {
  position: relative;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
  background: var(--editor-background, #ffffff);
  color: var(--editor-foreground, #1f2328);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
}
.app-welcome__scroll {
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 44px 24px 72px;
}
.app-welcome__doc {
  width: 100%;
  max-width: 760px;
  font-size: 14px;
  line-height: 1.75;
}
.app-welcome__doc h1 {
  font-size: 26px; font-weight: 700; line-height: 1.35;
  margin: 0 0 18px; padding-bottom: 12px;
  border-bottom: 1px solid var(--panel-border, rgba(0,0,0,0.08));
}
.app-welcome__doc h2 {
  font-size: 19px; font-weight: 650; margin: 30px 0 12px; padding-bottom: 6px;
  border-bottom: 1px solid var(--panel-border, rgba(0,0,0,0.06));
}
.app-welcome__doc h3 { font-size: 16px; font-weight: 650; margin: 22px 0 10px; }
.app-welcome__doc p { margin: 10px 0; }
.app-welcome__doc ul, .app-welcome__doc ol { margin: 10px 0; padding-left: 24px; }
.app-welcome__doc li { margin: 4px 0; }
.app-welcome__doc a { color: var(--ai-orange, #ff9b40); text-decoration: none; }
.app-welcome__doc a:hover { text-decoration: underline; }
.app-welcome__doc strong { font-weight: 650; }
.app-welcome__doc blockquote {
  margin: 14px 0; padding: 6px 14px;
  border-left: 3px solid var(--ai-orange, #ff9b40);
  color: var(--descriptionForeground, #57606a);
  background: var(--list-hoverBackground, rgba(0,0,0,0.03));
  border-radius: 0 6px 6px 0;
}
.app-welcome__doc code {
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 12.5px; padding: 1px 5px; border-radius: 4px;
  background: var(--list-hoverBackground, rgba(0,0,0,0.05));
}
.app-welcome__doc pre {
  margin: 12px 0; padding: 12px 14px; overflow: auto;
  background: var(--list-hoverBackground, rgba(0,0,0,0.04));
  border-radius: 8px;
}
.app-welcome__doc pre code { background: transparent; padding: 0; }
.app-welcome__doc table {
  width: 100%; margin: 14px 0; border-collapse: collapse; font-size: 13.5px;
}
.app-welcome__doc th, .app-welcome__doc td {
  border: 1px solid var(--panel-border, rgba(0,0,0,0.1));
  padding: 7px 12px; text-align: left; vertical-align: top;
}
.app-welcome__doc th { background: var(--list-hoverBackground, rgba(0,0,0,0.03)); font-weight: 650; }
.app-welcome__doc hr { border: 0; border-top: 1px solid var(--panel-border, rgba(0,0,0,0.08)); margin: 24px 0; }
.app-welcome__doc img {
  max-width: 100%; max-height: 520px; width: auto; height: auto;
  border-radius: 8px;
}

.app-welcome__state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; min-height: 260px;
  color: var(--descriptionForeground, #8a8a8a); font-size: 13px;
}
.app-welcome__state--error { color: var(--editor-foreground, #1f2328); }
.app-welcome__state button, .app-welcome__badge button {
  font-size: 12px; padding: 3px 10px; border-radius: 6px; cursor: pointer;
  color: #ffffff; background: var(--ai-orange, #ff9b40); border: 0;
}
.app-welcome__badge {
  position: fixed; right: 16px; bottom: 16px; z-index: 20;
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 11px; padding: 4px 10px; border-radius: 999px;
  color: var(--descriptionForeground, #8a8a8a);
  background: var(--editorWidget-background, #fff);
  border: 1px solid var(--editorWidget-border, rgba(0,0,0,0.1));
  box-shadow: 0 4px 14px rgba(0,0,0,0.12);
}
`;
