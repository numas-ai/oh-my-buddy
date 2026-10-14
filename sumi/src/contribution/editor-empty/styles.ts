/**
 * EditorEmpty 样式 — 编辑区空态卡片 (关闭所有 tab 后兜底)
 * 主题色走 codeblitz/opensumi token (带中性兜底).
 */
export const styles = `
.app-editor-empty {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 24px;
  background: var(--editor-background, #ffffff);
  color: var(--editor-foreground, #1f2328);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  user-select: none;
}
.app-editor-empty__card {
  display: flex; flex-direction: column; align-items: center;
  gap: 10px;
  max-width: 380px;
  text-align: center;
}
.app-editor-empty__icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 56px; height: 56px; margin-bottom: 2px;
  border-radius: 14px;
  color: var(--descriptionForeground, #8f8f8f);
  background: var(--list-hoverBackground, rgba(0, 0, 0, 0.04));
}
.app-editor-empty__title {
  font-size: 15px; font-weight: 600;
  color: var(--editor-foreground, #1f2328);
}
.app-editor-empty__desc {
  font-size: 12.5px; line-height: 1.7;
  color: var(--descriptionForeground, #8f8f8f);
}
`;
