/**
 * infra/clipboard.ts — 纯剪贴板工具 (无 DI 依赖, App/service/extensions 各层都能用).
 *
 * clipboard API 在 iframe / 非 secure context / 无权限时会失败 → 回退 execCommand.
 * 带 UI 反馈 (toast) 的封装见 extensions/chat/webview/clipboard.ts 的 useCopyNotifier.
 */

/** 复制文本到剪贴板; 返回是否成功 (失败不谎报) */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* fallthrough 到 execCommand */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}
