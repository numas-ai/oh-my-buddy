/**
 * WelcomePage — Numas 欢迎页 (替换 codeblitz 默认欢迎页 EditorWelcomeComponent).
 *
 * 接入点 (codeblitz WelcomeContribution.registerEditorComponent):
 *   `runtimeConfig.WelcomePage ? WelcomePage : EditorWelcomeComponent` — 见 config/runtime.ts.
 * 打开时机:
 *   - 自动: runtimeConfig.startupEditor = 'welcomePage' → 无打开文件时开 welcome://
 *   - 手动: 命令 numas.welcome.open (module.ts, 命令面板可搜「打开欢迎页」)
 *
 * 内容源: 远程 raw README, 用 **MDX 引擎**(运行时编译) 渲染 (见 mdx.ts).
 * 四级兜底链 (用户拍板设计):
 *   ① 远程 fetch 成功 → 渲染 + 写 localStorage 缓存 (last-good)
 *   ② 失败 → localStorage 缓存
 *   ③ 再无 → 构建期内置快照 fallback.md (webpack raw-loader 打进产物)
 *   ④ 仍无/均编译失败 → 内置提示 + 重试按钮
 * 任何非"远程"来源都会在右下角显示来源角标 + 刷新按钮.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { compileMdx } from './mdx';
import fallbackMd from './fallback.md';
import { styles } from './styles';

/** 远程内容源 (用户拍板: 写死 raw URL; 由 github blob 页转 raw) */
const SOURCE_URL = 'https://raw.githubusercontent.com/numas-ai/.github/main/profile/README.md';
/** localStorage 缓存 key (last-good 内容) */
const CACHE_KEY = 'NUMAS_WELCOME_CACHE';
const FETCH_TIMEOUT_MS = 8000;

type SourceKind = 'remote' | 'cache' | 'snapshot' | 'none';

function readCache(): string {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return '';
    const obj = JSON.parse(raw) as { md?: unknown };
    return typeof obj?.md === 'string' ? obj.md : '';
  } catch {
    return '';
  }
}

function writeCache(md: string): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ md, at: Date.now() }));
  } catch {
    /* 存储不可用忽略 */
  }
}

async function fetchRemote(): Promise<string> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(SOURCE_URL, { signal: ctrl.signal, headers: { Accept: 'text/plain' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = (await res.text()).trim();
    if (!text) throw new Error('empty body');
    return text;
  } finally {
    window.clearTimeout(timer);
  }
}

/** 外链一律新窗口打开: MDX 渲染的是裸 <a href>, 同标签点击会把整个工作台导航走 (丢工作区).
 *  用 DOM 后处理 (渲染后给所有 a 补 target/rel) — 比 MDXProvider 组件映射更可靠. */
function decorateLinks(root: HTMLElement | null): void {
  if (!root) return;
  root.querySelectorAll('a[href]').forEach((a) => {
    if (!a.getAttribute('target')) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noreferrer');
    }
  });
}

const SOURCE_LABEL: Record<Exclude<SourceKind, 'remote'>, string> = {
  cache: '离线缓存',
  snapshot: '内置快照',
  none: '加载失败',
};

export const WelcomePage: React.FC = () => {
  const [Body, setBody] = useState<React.FC | null>(null);
  const [source, setSource] = useState<SourceKind>('none');
  const [loading, setLoading] = useState(true);
  const aliveRef = useRef(true);
  const docRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);

    // ① 远程
    try {
      const text = await fetchRemote();
      const C = await compileMdx(text);
      if (!aliveRef.current) return;
      writeCache(text);
      setBody(() => C);
      setSource('remote');
      setLoading(false);
      return;
    } catch {
      /* 落到兜底 */
    }

    // ② localStorage 缓存
    const cached = readCache();
    if (cached) {
      try {
        const C = await compileMdx(cached);
        if (!aliveRef.current) return;
        setBody(() => C);
        setSource('cache');
        setLoading(false);
        return;
      } catch {
        /* 继续兜底 */
      }
    }

    // ③ 构建期内置快照
    if (fallbackMd) {
      try {
        const C = await compileMdx(fallbackMd);
        if (!aliveRef.current) return;
        setBody(() => C);
        setSource('snapshot');
        setLoading(false);
        return;
      } catch {
        /* 继续兜底 */
      }
    }

    // ④ 提示 + 重试
    if (!aliveRef.current) return;
    setBody(null);
    setSource('none');
    setLoading(false);
  }, []);

  useEffect(() => {
    aliveRef.current = true;
    void load();
    return () => {
      aliveRef.current = false;
    };
  }, [load]);

  // 渲染完成后给文档内所有外链补 target=_blank/rel (避免同标签导航离开工作台)
  useEffect(() => {
    decorateLinks(docRef.current);
  }, [Body, loading]);

  return (
    <div className="app-welcome">
      <style>{styles}</style>
      <div className="app-welcome__scroll">
        <div className="app-welcome__doc" ref={docRef}>
          {loading && <div className="app-welcome__state">正在加载欢迎内容…</div>}
          {!loading && Body && <Body />}
          {!loading && !Body && (
            <div className="app-welcome__state app-welcome__state--error">
              <p>欢迎内容暂不可用 (远程与内置兜底均失败)。</p>
              <button type="button" onClick={() => void load()}>重试</button>
            </div>
          )}
        </div>
      </div>
      {!loading && source !== 'remote' && (
        <div className="app-welcome__badge">
          <span>{SOURCE_LABEL[source]}</span>
          <button type="button" onClick={() => void load()}>刷新</button>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
