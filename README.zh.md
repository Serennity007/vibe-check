[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md)

# 🎯 Vibe Check — 中文版

<div align="center">

### `npx vibe-check` — 你的项目对 AI 友好吗？

**一键检测你的项目是否为 AI 编程助手做好了配置。**
一条命令。零配置。立即出结果。

[![npm](https://img.shields.io/npm/v/vibe-check.svg)](https://www.npmjs.com/package/vibe-check)
[![Downloads](https://img.shields.io/npm/dm/vibe-check.svg)](https://www.npmjs.com/package/vibe-check)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

```bash
$ npx vibe-check

╔══════════════════════════════════════════════════════════════╗
║                    VIBE CHECK 检测结果                       ║
╚══════════════════════════════════════════════════════════════╝

╭────────────────────────────────────────────────────────────╮
│   ✨ 得分: 83/100 | 等级: A                                 │
│   太棒了！你的项目非常 AI 友好。                               │
╰────────────────────────────────────────────────────────────╯

📊 详细结果:
  AI 规则文件   [4/6]  20/26 分
  项目文档      [4/4]  15/15 分
  类型安全      [2/3]   8/10 分
  测试覆盖      [2/5]   6/6  分
  代码质量      [3/4]   8/10 分
  Git 和 CI/CD  [3/4]   9/9  分
  依赖管理      [2/3]   4/8  分

💡 优化建议:
  1. 为更多 AI 工具添加规则文件，提升兼容性
  2. 添加 TypeScript 类型定义（.d.ts 文件）
```

---

## 为什么需要 Vibe Check？

AI 编程助手（Cursor、Claude Code、Copilot、Kimi Code）在你的项目有完善的配置时——规则文件、TypeScript、测试、Lint——能够生成**质量高得多的代码**。但大多数项目缺少其中一半的配置。

**Vibe Check** 几秒内扫描你的项目，给出 0–100 的评分和具体优化建议。

| 等级 | 分数 | 含义 |
|:---:|:---:|------|
| 🏆 S | 90–100 | 完美 — 你的项目是标杆级配置 |
| ✨ A | 75–89 | 优秀 — 只有小改进空间 |
| 👍 B | 60–74 | 良好 — 有几个缺口需要填补 |
| 🔧 C | 40–59 | 一般 — 有较大提升空间 |
| ⚠️ D | 20–39 | 需要加强 — AI 助手无法充分发挥 |
| ❌ F | 0–19 | 较差 — 严重缺乏配置 |

---

## 快速开始

```bash
# 无需安装
npx vibe-check

# 检测指定项目
npx vibe-check /path/to/project

# CI 模式 — 得分低于 70 则构建失败
npx vibe-check --min-score 70

# JSON 格式输出，方便脚本处理
npx vibe-check --json
```

---

## 检测内容

7 大分类。**互斥检查项**（如不同格式的 ESLint 配置）会被归为一组——只取最优匹配计分。

| 分类 | 满分 | 检测项 |
|------|:---:|--------|
| 🤖 AI 规则 | 26 | `.cursorrules`、`CLAUDE.md`、`AGENTS.md`、Copilot、Windsurf、Cline |
| 📚 项目文档 | 15 | `README`、`CONTRIBUTING`、`CHANGELOG`、`docs/` |
| 🔒 类型安全 | 10 | `tsconfig.json`、`types/`、`.d.ts` 文件 |
| 🧪 测试 | 6 | Jest/Vitest/Mocha/Cypress/Playwright + 测试目录 |
| ✨ 代码质量 | 10 | ESLint + Prettier（任意格式）+ EditorConfig + Stylelint |
| 🔄 Git 和 CI/CD | 9 | GitHub Actions/GitLab CI + Husky + `.gitignore` |
| 📦 依赖管理 | 8 | 各语言的锁文件（JS、Python、Rust、Go） |

**总分：84 分** → 换算为 0–100 分。

---

## 命令选项

```
vibe-check [options] [directory]

Options:
  -j, --json             以 JSON 格式输出
  -v, --verbose          显示每项检查的详细结果
  -m, --min-score <N>    得分低于 N 时返回退出码 1（CI 模式）
  --no-color             禁用颜色输出
  -h, --help             显示帮助信息
  -V, --version          显示版本号
```

### CI 集成

```yaml
# GitHub Actions
- name: Check AI-friendliness
  run: npx vibe-check --min-score 60 --json
```

```yaml
# GitLab CI
vibe-check:
  script:
    - npx vibe-check --min-score 60
```

---

## 如何提升评分

```bash
# 1. 添加 AI 规则文件（影响最大 — 最多 26 分）
echo "# My Rules" > .cursorrules
echo "# My Rules" > CLAUDE.md

# 2. 添加 TypeScript（10 分）
npx tsc --init

# 3. 添加 ESLint + Prettier（10 分）
npm init @eslint/config
npm i -D prettier && echo {} > .prettierrc

# 4. 添加测试框架（6 分）
npm i -D vitest

# 5. 添加 GitHub Actions CI（4 分）
mkdir -p .github/workflows
# 创建 ci.yml 文件

# 6. 添加 .gitignore（2 分）
npx gitignore node
```

---

## 常见问题

**这个工具会修改我的项目吗？**
不会。Vibe Check 是 100% 只读的。

**支持哪些编程语言？**
所有语言。它检测的是通用工具链（TypeScript、ESLint、测试、CI），这些对任何语言都适用。

**可以在 CI 中使用吗？**
可以！`npx vibe-check --min-score 70` 在得分低于阈值时会返回退出码 1，非常适合用于 PR 检查。

**为什么我的分数比预期低？**
互斥项会被归组。有 4 个 ESLint 配置文件并不比有 1 个得更多分——只有你实际使用的格式才会被计分。

---

## 相关项目

| 项目 | 说明 |
|------|------|
| [**awesome-ai-rules**](https://github.com/liangzhengtao/awesome-ai-rules) | 20 个开箱即用的 AI 编程规则 |
| [**ai-commit**](https://github.com/liangzhengtao/ai-commit) | `npx ai-commit` — AI 帮你写 commit 信息 |
| [**awesome-mcp-servers**](https://github.com/liangzhengtao/awesome-mcp-servers) | 适用于 Cursor、Claude Code 和 Kimi Code 的 MCP 服务器 |

## 参与贡献

详见 [CONTRIBUTING.md](CONTRIBUTING.md)。欢迎提交 PR！

## 许可证

[MIT](LICENSE)

---

<div align="center">

**觉得有帮助？给个 ⭐ 吧**
