/**
 * clipboard.ts — chat webview 复制的「带反馈」封装.
 *
 * 纯函数 copyTextToClipboard 在 infra/clipboard.ts (App 层也能用);
 * 这里只加 chat 侧需要的 toast 反馈 (IMessageService) + copied 状态 (按钮切「已复制」图标).
 */
import React from 'react';
import { useInjectable } from '@opensumi/ide-core-browser/lib/react-hooks/injectable-hooks';
import { IMessageService } from '@opensumi/ide-overlay';

import { copyTextToClipboard } from '@/infra/clipboard';

export { copyTextToClipboard } from '@/infra/clipboard';

/** 剪贴板写 + 2s 后复位 check 图标; 复制失败不谎报"已复制" */
export function useCopyNotifier() {
  const messageService = useInjectable<IMessageService>(IMessageService);
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const notify = React.useCallback((text: string) => {
    void copyTextToClipboard(text).then((ok) => {
      if (!ok) {
        try { messageService?.warning('复制失败: 剪贴板不可用'); } catch { /* 容器外无 DI */ }
        return;
      }
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
      try { messageService?.info('已复制'); } catch { /* 容器外无 DI */ }
    });
  }, [messageService]);
  return { copied, notify };
}
