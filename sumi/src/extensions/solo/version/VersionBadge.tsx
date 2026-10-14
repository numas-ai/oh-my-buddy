/**
 * VersionBadge — 版本标识「公测版 vX.Y.Z」, hover 弹出 QQ 交流群二维码浮层.
 *
 * 放置: 模式切换按钮**左侧** (SideTopbar 的 SOLO/IDE 顶栏 + ActionBar 的 sidebar 折叠镜像 共用).
 * 版本号来源: APP_CHAT_CONFIG.version (config/brand.ts) → 构建期 __APP_VERSION__ (根 package.json).
 *
 * 浮层实现: portal 到 document.body + position:fixed.
 *   顶栏各级祖先 (`.app-solo` / `.app-solo__sidebar` / `.app-solo__main`) 都是 overflow:hidden,
 *   就地 absolute 定位的浮层会被裁掉, 必须出到 body. 与 ActionBar 历史会话弹层同款 (createPortal).
 *   标识与浮层是两段独立 DOM, 用 120ms 延迟关闭 + 双向 mouseenter 抵消"指针移动中闪断".
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { APP_CHAT_CONFIG } from '../../../config/brand';
import qqGroupUrl from '../../../assets/qq-group.jpg';
import { styles } from './styles';

/** 标识与浮层之间的视觉间距 */
const GAP = 8;
/** 指针离开后的延迟关闭 (ms): 留出跨到浮层的容错窗口 */
const CLOSE_DELAY = 120;

// 预热二维码: 静态资源服务不带缓存头 (每次整页 reload 后都会重新拉), 不预热则首次 hover
// 期间浮层里图还没到 (表现为空白细条). 模块加载即后台拉好, hover 时命中内存缓存.
// 与模式切换无关, 但模式切换 = 整页 reload, 是最容易复现的入口.
if (typeof window !== 'undefined') {
  const preload = new Image();
  preload.decoding = 'async';
  preload.src = qqGroupUrl;
}

export const VersionBadge: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const anchorRef = useRef<HTMLSpanElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const place = useCallback((): void => {
    const el = anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ left: rect.left, top: rect.bottom + GAP });
  }, []);

  const cancelClose = useCallback((): void => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openNow = useCallback((): void => {
    cancelClose();
    place();
    setOpen(true);
  }, [cancelClose, place]);

  const scheduleClose = useCallback((): void => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  }, [cancelClose]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  // 浮层打开期间跟随视口变化重算 (顶栏不滚动, 仅防御窗口 resize)
  useEffect(() => {
    if (!open) return;
    const onReflow = (): void => place();
    window.addEventListener('resize', onReflow);
    window.addEventListener('scroll', onReflow, true);
    return () => {
      window.removeEventListener('resize', onReflow);
      window.removeEventListener('scroll', onReflow, true);
    };
  }, [open, place]);

  return (
    <>
      <style>{styles}</style>
      <span
        ref={anchorRef}
        className="app-version-badge"
        tabIndex={0}
        onMouseEnter={openNow}
        onMouseLeave={scheduleClose}
        onFocus={openNow}
        onBlur={scheduleClose}
      >
        {APP_CHAT_CONFIG.version}
      </span>
      {open &&
        createPortal(
          <div
            className="app-version-badge__popover"
            role="tooltip"
            style={{ left: `${pos.left}px`, top: `${pos.top}px` }}
            onMouseEnter={openNow}
            onMouseLeave={scheduleClose}
          >
            <img className="app-version-badge__qr" src={qqGroupUrl} alt="NuMas 交流群二维码" draggable={false} />
          </div>,
          document.body,
        )}
    </>
  );
};
