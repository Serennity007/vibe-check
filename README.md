[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md) | [العربية](README.ar.md) | [한국어](README.ko.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,100:6e40c9&height=200&text=Vibe%20Check%20%7C%20%E6%B0%9B%E5%9B%B4%E6%A3%80%E6%9F%A5%20%7C%20%E3%83%90%E3%82%A4%E3%83%96%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF%20%7C%20V%C3%A9rification%20Vibes%20%7C%20Verificaci%C3%B3n%20de%20Ambiente%20%7C%20%D9%81%D8%AD%D8%B5%20%D8%A7%D9%84%D8%A3%D8%AC%D9%88%D8%A7%D8%A1&fontColor=00d4ff&fontSize=28&fontAlignY=35&desc=AI-Readiness%20Scanner%20for%20Your%20Project&descSize=15&descAlignY=55&descAlign=50&animation=fadeIn" width="100%" />

</div>

<div align="center">

# 🎯 Vibe Check | 氛围检查 | バイブチェック | Vérification Vibes | Verificación de Ambiente | فحص الأجواء

### `npx vibe-check` — Is your project AI-ready?

**Instantly score how well your project is configured for AI coding assistants.**
One command. Zero config. Actionable results.

[![npm version](https://img.shields.io/npm/v/vibe-check.svg?style=for-the-badge&logo=npm&color=00d4ff)](https://www.npmjs.com/package/vibe-check)
[![Downloads](https://img.shields.io/npm/dm/vibe-check.svg?style=for-the-badge&logo=npm&color=00d4ff)](https://www.npmjs.com/package/vibe-check)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&color=6e40c9)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Serennity007/vibe-check?style=for-the-badge&logo=github&color=00d4ff)](https://github.com/Serennity007/vibe-check)

</div>

<div align="center">
<img src="https://raw.githubusercontent.com/Serennity007/vibe-check/main/.github/demo.svg" width="100%" alt="vibe-check animated terminal demo: npx vibe-check scores project AI-readiness 83/100" />
</div>

---

## 📑 Table of Contents

- [🎯 Why Vibe Check?](#-why-vibe-check)
- [🚀 Quick Start](#-quick-start)
- [🔍 What It Checks](#-what-it-checks)
- [⚙️ Options](#️-options)
- [📈 How to Improve Your Score](#-how-to-improve-your-score)
- [❓ FAQ](#-faq)
- [🔗 See Also](#-see-also)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Why Vibe Check?

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

## 🚀 Quick Start

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

## 🔍 What It Checks

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

## ⚙️ Options

```
vibe-check [options] [directory]

Options:
  -j, --json        Output as JSON
  -v, --verbose     Show detailed per-check results
  -m, --min-score   Exit code 1 if score < N (CI mode)
  --no-color        Disable colors
  -h, --help        Display help
  -V, --version     Display version
```

### 🔧 CI Integration

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

## 📈 How to Improve Your Score

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

## ❓ FAQ

**Does this modify my project?**
No. Vibe-check is 100% read-only.

**What languages does it support?**
All of them. It checks for universal tooling (TypeScript, ESLint, testing, CI) that works with any language.

**Can I use this in CI?**
Yes! `npx vibe-check --min-score 70` exits with code 1 if the score is below the threshold. Perfect for PR checks.

**Why is my score lower than expected?**
Mutually exclusive items are grouped. Having 4 ESLint config files doesn't give more points than having 1 — only the format you actually use counts.

---

## 🔗 See Also

| Project | Description |
|---------|-------------|
| [**agent-trace**](https://github.com/Serennity007/agent-trace) | Visualize and debug AI agent execution traces |
| [**ai-commit**](https://github.com/Serennity007/ai-commit) | `npx ai-commit` — AI writes your commit messages |
| [**git-format**](https://github.com/Serennity007/git-format) | `npx git-format` — Conventional commits, auto-formatted |
| [**awesome-ai-rules**](https://github.com/Serennity007/awesome-ai-rules) | 20 production AI coding rules |

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). PRs welcome!

## 📄 License

[MIT](LICENSE)

---

<div align="center">

**Found this useful? Give it a ⭐**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,100:6e40c9&height=120&section=footer" width="100%" />

</div>
