[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md) | [العربية](README.ar.md) | [한국어](README.ko.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

<div align="center">

<img src=".banner.svg" width="100%" alt="banner">

</div>


# 🎯 Vibe Check

<div align="center">

### `npx vibe-check` — Ist Ihr Projekt KI-ready?

**Bewerten Sie sofort, wie gut Ihr Projekt für KI-Coding-Assistenten konfiguriert ist.**
Ein Befehl. Keine Konfiguration. Umsetzbare Ergebnisse.

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

## Warum Vibe Check?

KI-Coding-Assistenten (Cursor, Claude Code, Copilot, Kimi Code) erzeugen **deutlich besseren Code**, wenn Ihr Projekt richtig konfiguriert ist — Regel-Dateien, TypeScript, Tests, Linting. Aber den meisten Projekten fehlt die Hälfte davon.

**Vibe Check** scannt Ihr Projekt in Sekunden und gibt eine Bewertung von 0–100 mit konkreten Empfehlungen.

| Note | Punkte | Bedeutung |
|:----:|:------:|-----------|
| 🏆 S | 90–100 | Perfekt — Ihr Projekt ist Goldstandard |
| ✨ A | 75–89 | Großartig — geringfügige Verbesserungen möglich |
| 👍 B | 60–74 | Gut — einige Lücken zu füllen |
| 🔧 C | 40–59 | Befriedigend — erheblicher Verbesserungsbedarf |
| ⚠️ D | 20–39 | Verbesserung nötig — KI-Assistenten unterperformen |
| ❌ F | 0–19 | Schwach — grundlegende Konfiguration fehlt |

---

## Schnellstart

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

## Was wird geprüft

7 Kategorien. **Sich gegenseitig ausschließende Prüfungen** (z.B. ESLint-Konfigurationsformate) sind gruppiert — nur die beste Übereinstimmung zählt.

| Kategorie | Max | Was wird geprüft |
|-----------|:---:|-----------------|
| 🤖 KI-Regeln | 26 | `.cursorrules`, `CLAUDE.md`, `AGENTS.md`, Copilot, Windsurf, Cline |
| 📚 Dokumentation | 15 | `README`, `CONTRIBUTING`, `CHANGELOG`, `docs/` |
| 🔒 Typsicherheit | 10 | `tsconfig.json`, `types/`, `.d.ts`-Dateien |
| 🧪 Tests | 6 | Jest/Vitest/Mocha/Cypress/Playwright + Test-Verzeichnisse |
| ✨ Code-Qualität | 10 | ESLint + Prettier (jedes Format) + EditorConfig + Stylelint |
| 🔄 Git & CI/CD | 9 | GitHub Actions/GitLab CI + Husky + `.gitignore` |
| 📦 Abhängigkeiten | 8 | Lockfiles pro Sprache (JS, Python, Rust, Go) |

**Gesamt: 84 Punkte** → normalisiert auf 0–100.

---

## Optionen

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

### CI-Integration

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

## So verbessern Sie Ihre Bewertung

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

**Wird mein Projekt verändert?**
Nein. Vibe-check ist 100% schreibgeschützt.

**Welche Sprachen werden unterstützt?**
Alle. Es prüft universelle Werkzeuge (TypeScript, ESLint, Tests, CI), die mit jeder Sprache funktionieren.

**Kann ich es in CI verwenden?**
Ja! `npx vibe-check --min-score 70` endet mit Exit-Code 1, wenn die Bewertung unter dem Schwellenwert liegt. Perfekt für PR-Prüfungen.

**Warum ist meine Bewertung niedriger als erwartet?**
Sich gegenseitig ausschließende Punkte sind gruppiert. 4 ESLint-Konfigurationsdateien bringen nicht mehr Punkte als 1 — nur das tatsächlich verwendete Format zählt.

---

## Siehe auch

| Projekt | Beschreibung |
|---------|--------------|
| [**awesome-ai-rules**](https://github.com/liangzhengtao/awesome-ai-rules) | 20 produktionsreife KI-Coding-Regeln |
| [**ai-commit**](https://github.com/liangzhengtao/ai-commit) | `npx ai-commit` — KI schreibt Ihre Commit-Nachrichten |
| [**awesome-mcp-servers**](https://github.com/liangzhengtao/awesome-mcp-servers) | MCP-Server für Cursor, Claude Code und Kimi Code |

## Mitwirken

Siehe [CONTRIBUTING.md](CONTRIBUTING.md). PRs willkommen!

## Lizenz

[MIT](LICENSE)

---

<div align="center">

**Nützlich? Geben Sie eine ⭐**

</div>

---
