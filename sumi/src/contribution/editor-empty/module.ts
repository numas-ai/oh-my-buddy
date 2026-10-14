/**
 * EditorEmptyContribution — 把自定义空态卡片注册到 opensumi 组件注册表 `editor-empty`.
 *
 * 时机: ClientAppContribution.onStart (app 起来时注册一次).
 * 说明: 注册表 `register(key, views)` 是 Map.set 语义 → 直接覆盖官方默认 `editor-empty`
 *   (官方默认组件无背景图时不渲染任何东西, 等于纯空白).
 */
import { Autowired, Injectable } from '@opensumi/di';
import { BrowserModule, ClientAppContribution, ComponentRegistry, Domain } from '@opensumi/ide-core-browser';

import { EditorEmpty } from './EditorEmpty';

export const EDITOR_EMPTY_KEY = 'editor-empty';

@Injectable()
@Domain(ClientAppContribution)
export class EditorEmptyContribution implements ClientAppContribution {
  @Autowired(ComponentRegistry)
  private readonly componentRegistry!: ComponentRegistry;

  onStart(): void {
    try {
      this.componentRegistry.register(EDITOR_EMPTY_KEY, {
        id: 'numas-editor-empty',
        weight: 999,
        component: EditorEmpty,
      });
      console.log('[editor-empty] 自定义空态已注册 (关闭所有 tab 后兜底显示)');
    } catch (e) {
      console.warn('[editor-empty] 注册失败:', e);
    }
  }
}

@Injectable()
export class EditorEmptyModule extends BrowserModule {
  providers = [EditorEmptyContribution];
  contributionProvider = [ClientAppContribution];
}
