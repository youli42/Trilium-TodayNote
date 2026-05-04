# 📅 动态笔记 — Trilium Render Note

Trilium 渲染笔记脚本，用于按日期范围查询和展示当日创建的笔记。

## 结构

```
today-node/
├── rendering-template.html   # Render Note 的 HTML 模板（text/html）
└── frontend-script.js        # Render Note 的前端脚本（application/javascript;env=frontend）
```

## Trilium 中的组织方式

```
搜索脚本 (2GBKQLZRxO3j)
└── 📓 今日动态 (jm63FcGHa5bK)        — book
    └── 今日动态 (JbQWNvvyFntO)      — render
        └── 渲染模板 (4S0E7Tr5yyAQ)  — code (text/html)
            └── 渲染脚本 (7RqzWJHqTbls) — code (application/javascript;env=frontend)
```

## 功能

- 按日期范围搜索创建的笔记（起始日 ~ 结束日）
- 快捷按钮：今天 / 昨天 / 近 3 天 / 近 7 天 / 本周 / 本月
- 结果按创建时间升序排列
- 点击笔记标题跳转至对应笔记
- 适配浅色/深色主题（颜色全部继承 Trilium 主题变量）

## 技术栈

- Trilium 后端 API: `api.searchForNotes()`, `api.runAsyncOnBackendWithManualTransactionHandling()`
- Trilium 前端 API: `api.activateNote()`
- 纯 CSS + Vanilla JS，无外部依赖
