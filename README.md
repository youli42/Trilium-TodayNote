# 📅 Today — 今日笔记

查看指定时间范围内的笔记动态

![alt text](file/Show.webp)

## 使用方法

### 1、手动导入

在 Trilium 中创建如下笔记结构：

1. 创建 `book` 类型笔记作为容器
2. 在其下创建 `render` 类型笔记
3. 添加 `~renderNote` 关系指向一个 `text/html` 模板笔记
4. 在模板笔记下创建 `application/javascript;env=frontend` 子笔记

打开 render 笔记即可看到带日期选择控件的动态页面。

### 2、使用预发布包

下载 Releases 中提供的压缩包，在想要放置页面的为止右键导入，**关闭安全导入**，导入成功后可以看到编辑的笔记

## 技术特点

- **Render Note 架构**：不写插件，不改核心，纯 Trilium 内置机制实现
- **零硬编码颜色**：全部继承 Trilium 主题变量，自动适配浅色/深色主题
- **纯原生**：Vanilla JS + CSS，无外部依赖
- **快速跳转**：点击笔记标题直接导航

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

## 技术栈

- Trilium 后端 API: `api.searchForNotes()`, `api.runAsyncOnBackendWithManualTransactionHandling()`
- Trilium 前端 API: `api.activateNote()`
- 纯 CSS + Vanilla JS，无外部依赖
