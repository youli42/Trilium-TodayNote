# AGENTS.md — 项目规范

## 环境

- OS: Windows
- Shell: PowerShell
- Trilium MCP 已配置可用

## 笔记结构

```
搜索脚本 (2GBKQLZRxO3j)
├── s 今日笔记                    — 后端搜索脚本
├── 📓 今日动态                   — book
│   └── 今日动态                  — render note
│       └── 渲染模板 (text/html)  — HTML 骨架 + CSS
│           └── 渲染脚本 (frontend) — JS 查询逻辑
```

## 关键 API

- `api.runAsyncOnBackendWithManualTransactionHandling(func, [args])` — 前端→后端传参调用
- `api.searchForNotes()` — 搜索全部笔记
- `api.activateNote(noteId)` — 前端导航到笔记
- `api.runOnBackend(func)` — 前端→后端调用（无参数时）

## 设计约定

- 颜色全部从 `var(--main-text-color)` 继承，视觉层级用 `opacity` / `rgba(128,128,128, X)` 实现
- 不硬编码色值
