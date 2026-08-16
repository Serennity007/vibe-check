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

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). PRs welcome!

## License

[MIT](LICENSE)

---

<div align="center">

**Found this useful? Give it a ⭐**

</div>
