/**
 * 运行时配置 — core/config/runtime.ts
 *
 * 自定义 FileSystemProvider 接管 'file' scheme 后, 不再需要 BrowserFS mount.
 * 故此处不配置 workspace.filesystem — codeblitz fs-launch.contribution 在配置缺失时跳过 mount
 * (fs-launch.contribution.js:36-37 `if (!fsConfig) return;`).
 *
 * 文件系统实现见 ./fs.ts (CustomFileSystemProvider + DI 注入 CustomFsProviderContribution).
 * 不依赖任何 codeblitz ide-browserfs 模块, 不维护 InMemory 缓存 / 墓碑 / overlay.
 *
 * 欢迎页 (2026-10 重新启用): 用自研 WelcomePage 替换 codeblitz 默认欢迎页
 * (codeblitz WelcomeContribution: `WelcomePage ? WelcomePage : EditorWelcomeComponent`),
 * 并以 MDX 引擎运行时渲染远程 README (见 extensions/welcome, 四级兜底).
 * startupEditor:'welcomePage' → 无打开文件时自动打开 welcome:// .
 */

import type { IAppRendererProps } from '@codeblitzjs/ide-core';

import { WelcomePage } from '../extensions/welcome';

export const runtimeConfig: IAppRendererProps['runtimeConfig'] = {
  // 启用欢迎页: 无打开文件时打开 welcome://
  startupEditor: 'welcomePage',
  // 替换 codeblitz 默认欢迎页组件 (自研 MDX 版)
  WelcomePage: WelcomePage as never,
} as any;
