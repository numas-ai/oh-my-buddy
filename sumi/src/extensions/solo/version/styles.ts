/**
 * VersionBadge 样式 — 版本标识 (橙底白字) + hover 二维码浮层
 * 橙色取项目既有 accent: --ai-orange 兜底 #ff9b40 (与 ContextUsageModal 一致);
 * 浮层底色/边框走 codeblitz/opensumi token (带中性兜底).
 */
export const styles = `
.app-version-badge {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.02em;
  white-space: nowrap;
  color: #ffffff;
  background: var(--ai-orange, #ff9b40);
  border-radius: 6px;
  cursor: default;
  outline: none;
  transition: filter 0.12s ease;
}
.app-version-badge:hover,
.app-version-badge:focus-visible {
  filter: brightness(0.94);
}

/* 浮层 portal 到 body + fixed 定位: 顶栏祖先容器 overflow:hidden, 就地 absolute 会被裁切 */
.app-version-badge__popover {
  position: fixed;
  z-index: 6000;
  padding: 8px;
  background: var(--editorWidget-background, #fff);
  border: 1px solid var(--editorWidget-border, rgba(0, 0, 0, 0.12));
  border-radius: 10px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
}
.app-version-badge__qr {
  display: block;
  width: 220px;
  /* 预留比例: 图未加载完时不塌成细条 (加载后 height:auto 用真实尺寸, 比例仅作占位) */
  aspect-ratio: 1156 / 2055;
  height: auto;
  border-radius: 6px;
  user-select: none;
  -webkit-user-drag: none;
}
`;
