/**
 * Welcome 拓展 — Numas 欢迎页 (替换 codeblitz 默认 EditorWelcomeComponent)
 *
 * 接入:
 *   - config/runtime.ts: runtimeConfig.WelcomePage = WelcomePage (替换默认组件)
 *   - config/runtime.ts: runtimeConfig.startupEditor = 'welcomePage' (无打开文件时自动打开)
 * 手动入口: 命令 WELCOME_COMMANDS.open (id: numas.welcome.open) — 命令面板可搜「打开欢迎页」.
 *
 * 说明: welcome scheme 的资源/组件由 codeblitz WelcomeContribution 注册 (welcome://),
 *   本拓展只做「替换组件 + 提供手动打开命令」, 不重复注册 scheme (避免与 codeblitz 冲突).
 */
import { Autowired, Injectable } from '@opensumi/di';
import { BrowserModule } from '@opensumi/ide-core-browser';
import { Domain, URI, CommandRegistry, CommandContribution } from '@opensumi/ide-core-common';
import { WorkbenchEditorService } from '@opensumi/ide-editor';

export const WELCOME_COMMANDS = {
  open: { id: 'numas.welcome.open', label: '打开欢迎页' },
} as const;

@Injectable()
@Domain(CommandContribution)
export class WelcomeContribution implements CommandContribution {
  @Autowired(WorkbenchEditorService)
  private readonly editorService!: WorkbenchEditorService;

  registerCommands(commands: CommandRegistry): void {
    commands.registerCommand(WELCOME_COMMANDS.open, {
      execute: () => void this.editorService.open(new URI('welcome://'), { preview: false } as never),
    });
  }
}

@Injectable()
export class WelcomeModule extends BrowserModule {
  providers = [WelcomeContribution];
  contributionProvider = [CommandContribution];
}
