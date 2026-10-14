/**
 * 项目级 Chat 配置 — core/config/brand.ts
 *
 * 单一来源. 全应用 (chat/welcome/error 等所有 UI 文案) 都从这里取.
 * 换产品改这一个文件, 所有引用方无需动.
 *
 * 结构: { brand: 品牌文案, version: 版本标识, suggestions: 欢迎页建议卡片 }
 */

// 构建期注入 (sumi/webpack.config.js DefinePlugin) = 仓库根 package.json version
declare const __APP_VERSION__: string;

export const APP_CHAT_CONFIG = {
  brand: {
    name: 'Numas',
    title: 'Numas',
    subtitle: '牛马有伙伴，凡事皆可办',
    greeting: 'Numas',
    logo: '🐮',
  },
  // 版本标识: 文案前缀固定, 版本号随根 package.json 自动生成 (升版无需改前端)
  version: `公测版 v${__APP_VERSION__}`,
  suggestions: [
    // { icon: '🚀', title: '帮我完成一个任务', desc: '告诉我目标，拆解并执行', prompt: '帮我完成一个任务' },
    // { icon: '🔍', title: '调研一个话题', desc: '检索资料并总结结论', prompt: '帮我调研一个话题，检索相关资料并给出结论' },
    // { icon: '✍️', title: '撰写一份文档', desc: '方案 / 报告 / 邮件 / 文案', prompt: '帮我撰写一份文档' },
    // { icon: '💡', title: '出个主意', desc: '头脑风暴与创意发散', prompt: '帮我出个主意，做一些头脑风暴与创意发散' },
  ],
} as const;

export type AppChatConfig = typeof APP_CHAT_CONFIG;
