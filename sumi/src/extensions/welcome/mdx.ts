/**
 * welcome/mdx.ts — MDX 运行时编译 (CSP 允许 unsafe-eval, 见 opencode server/shared/ui.ts csp()).
 *
 * @mdx-js/mdx `evaluate` 把 MDX 文本编译成 React 组件.
 *   - remark-gfm: README 含 GFM 表格 (MDX 核心默认不含 tables/strikethrough/tasklist).
 *   - runtime (jsx/jsxs/Fragment) 显式传入, 不依赖默认解析.
 *   (不启用 providerImportSource/MDXProvider: 组件映射改在 WelcomePage 用 DOM 层处理, 更稳.)
 */
import { evaluate } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import * as runtime from 'react/jsx-runtime';
import type React from 'react';

/** 编译 MDX → React 组件. 语法错误/非法内容会抛异常 (调用方按兜底链处理). */
export async function compileMdx(source: string): Promise<React.FC> {
  const mod = await evaluate(source, {
    ...(runtime as unknown as Record<string, unknown>),
    remarkPlugins: [remarkGfm as never],
  } as never);
  return (mod as { default: React.FC }).default;
}
