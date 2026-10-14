/**
 * EditorEmpty — 编辑区空态 (当编辑器组内**没有任何 tab** 时显示, 替代纯空白).
 *
 * 接入: 注册到 opensumi 组件注册表 key `editor-empty`
 *   (editor.view.js: `group.resources.length === 0` 时取 `getComponentRegistryInfo('editor-empty').views[0]`
 *    渲染; 官方默认组件无背景图时**不渲染任何东西** → 所以原本是纯空白). 见 module.ts.
 *
 * 纯静态 (用户拍板): 只展示图标 + 文案, 不挂任何操作/命令, 避免与编辑器/命令生命周期耦合.
 */
import React from 'react';

import { styles } from './styles';

export const EditorEmpty: React.FC = () => (
  <div className="app-editor-empty">
    <style>{styles}</style>
    <div className="app-editor-empty__card">
      <div className="app-editor-empty__icon" aria-hidden>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="7" y1="13" x2="14" y2="13" />
          <line x1="7" y1="16" x2="11" y2="16" />
        </svg>
      </div>
      <div className="app-editor-empty__title">暂无打开的编辑器</div>
      <div className="app-editor-empty__desc">从左侧资源管理器打开文件</div>
    </div>
  </div>
);
