<div align="center">

[English](#english) | [中文](#中文)

</div>

---

<a name="english"></a>
# 🎯 Vibe Check

<div align="center">

### `npx vibe-check` — Is your project AI-ready?

**Instantly score how well your project is configured for AI coding assistants.**
One command. Zero config. Actionable results.

[![npm](https://img.shields.io/npm/v/vibe-check.svg)](https://www.npmjs.com/package/vibe-check)
[![Downloads](https://img.shields.io/npm/dm/vibe-check.svg)](https://www.npmjs.com/package/vibe-check)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

```bash
$ npx vibe-check

╔══════════════════════════════════════════════════════════════╗
║                    VIBE CHECK RESULTS                       ║
╚══════════════════════════════════════════════════════════════╝

╭────────────────────────────────────────────────────────────╮
│   ✨ Score: 83/100 | Grade: A                              │
│   Great! Your project is very AI-friendly.                 │
╰────────────────────────────────────────────────────────────╯

📊 Detailed Results:
  AI Rules Files [4/6]  20/26 points
  Documentation   [4/4]  15/15 points
  Type Safety     [2/3]   8/10 points
  Testing         [2/5]   6/6  points
  Code Quality    [3/4]   8/10 points
  Git & CI/CD     [3/4]   9/9  points
  Dependencies    [2/3]   4/8  points

💡 Recommendations:
  1. Add rules for more AI tools to maximize compatibility
  2. Add TypeScript type definitions (.d.ts files)
```

---

## Why Vibe Check?

AI coding assistants (Cursor, Claude Code, Copilot, Kimi Code) generate **significantly better code** when your project has proper configuration — rules files, TypeScript, testing, linting. But most projects are missing half of these.

**Vibe Check** scans your project in seconds and gives you a 0–100 score with specific recommendations.

| Grade | Score | Meaning |
|:-----:|:-----:|---------|
| 🏆 S | 90–100 | Perfect — your project is a gold standard |
| ✨ A | 75–89 | Great — minor improvements possible |
| 👍 B | 60–74 | Good — a few gaps to fill |
| 🔧 C | 40–59 | Fair — significant room for improvement |
| ⚠️ D | 20–39 | Needs work — AI assistants are underperforming |
| ❌ F | 0–19 | Poor — major configuration missing |

---

## Quick Start

```bash
# No install required
npx vibe-check

# Check a specific project
npx vibe-check /path/to/project

# CI mode — fail the build if score < 70
npx vibe-check --min-score 70

# JSON output for scripts
npx vibe-check --json
```

---

## What It Checks

7 categories. **Mutually exclusive checks** (e.g., ESLint config formats) are grouped — only the best match counts.

| Category | Max | What's Checked |
|----------|:---:|----------------|
| 🤖 AI Rules | 26 | `.cursorrules`, `CLAUDE.md`, `AGENTS.md`, Copilot, Windsurf, Cline |
| 📚 Documentation | 15 | `README`, `CONTRIBUTING`, `CHANGELOG`, `docs/` |
| 🔒 Type Safety | 10 | `tsconfig.json`, `types/`, `.d.ts` files |
| 🧪 Testing | 6 | Jest/Vitest/Mocha/Cypress/Playwright + test directories |
| ✨ Code Quality | 10 | ESLint + Prettier (any format) + EditorConfig + Stylelint |
| 🔄 Git & CI/CD | 9 | GitHub Actions/GitLab CI + Husky + `.gitignore` |
| 📦 Dependencies | 8 | Lockfiles per language (JS, Python, Rust, Go) |

**Total: 84 points** → normalized to 0–100.

---

## Options

```
vibe-check [options] [directory]

Options:
  -j, --json             Output as JSON
  -v, --verbose          Show detailed per-check results
  -m, --min-score <N>    Exit code 1 if score < N (CI mode)
  --no-color             Disable colors
  -h, --help             Display help
  -V, --version          Display version
```

### CI Integration

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

## How to Improve Your Score

```bash
# 1. Add AI rules (biggest impact — up to 26 points)
echo "# My Rules" > .cursorrules
echo "# My Rules" > CLAUDE.md

# 2. Add TypeScript (10 points)
npx tsc --init

# 3. Add ESLint + Prettier (10 points)
npm init @eslint/config
npm i -D prettier && echo {} > .prettierrc

# 4. Add a test framework (6 points)
npm i -D vitest

# 5. Add GitHub Actions CI (4 points)
mkdir -p .github/workflows
# create ci.yml

# 6. Add .gitignore (2 points)
npx gitignore node
```

---

## FAQ

**Does this modify my project?**
No. Vibe-check is 100% read-only.

**What languages does it support?**
All of them. It checks for universal tooling (TypeScript, ESLint, testing, CI) that works with any language.

**Can I use this in CI?**
Yes! `npx vibe-check --min-score 70` exits with code 1 if the score is below the threshold. Perfect for PR checks.

**Why is my score lower than expected?**
Mutually exclusive items are grouped. Having 4 ESLint config files doesn't give more points than having 1 — only the format you actually use counts.

---

## See Also

| Project | Description |
|---------|-------------|
| [**awesome-ai-rules**](https://github.com/liangzhengtao/awesome-ai-rules) | 20 production-ready AI coding rules |
| [**ai-commit**](https://github.com/liangzhengtao/ai-commit) | `npx ai-commit` — AI writes your commit messages |
| [**awesome-mcp-servers**](https://github.com/liangzhengtao/awesome-mcp-servers) | MCP servers for Cursor, Claude Code, and Kimi Code |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). PRs welcome!

## License

[MIT](LICENSE)

---

<div align="center">

**Found this useful? Give it a ⭐**

</div>

---

<a name="中文"></a>
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

</div>
