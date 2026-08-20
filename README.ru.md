[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md) | [العربية](README.ar.md) | [한국어](README.ko.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

<div align="center">

<img src=".banner.svg" width="100%" alt="banner">

</div>


# 🎯 Vibe Check

<div align="center">

### `npx vibe-check` — Готов ли ваш проект к ИИ?

**Мгновенно оцените, насколько хорошо ваш проект настроен для ИИ-ассистентов.**
Одна команда. Никаких настроек. Конкретные результаты.

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

## Почему Vibe Check?

ИИ-ассистенты (Cursor, Claude Code, Copilot, Kimi Code) генерируют **значительно лучший код**, когда ваш проект правильно настроен — файлы правил, TypeScript, тесты, линтинг. Но большинству проектов не хватает половины из этого.

**Vibe Check** сканирует ваш проект за секунды и выставляет оценку от 0 до 100 с конкретными рекомендациями.

| Оценка | Балл | Значение |
|:------:|:----:|----------|
| 🏆 S | 90–100 | Идеально — ваш проект эталон |
| ✨ A | 75–89 | Отлично — возможны небольшие улучшения |
| 👍 B | 60–74 | Хорошо — есть пробелы для заполнения |
| 🔧 C | 40–59 | Средне — значительный потенциал улучшения |
| ⚠️ D | 20–39 | Требует работы — ИИ-ассистенты работают слабо |
| ❌ F | 0–19 | Плохо — отсутствуют основные настройки |

---

## Быстрый старт

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

## Что проверяется

7 категорий. **Взаимоисключающие проверки** (например, форматы конфигов ESLint) сгруппированы — учитывается только наилучшее совпадение.

| Категория | Макс | Что проверяется |
|-----------|:----:|----------------|
| 🤖 ИИ-правила | 26 | `.cursorrules`, `CLAUDE.md`, `AGENTS.md`, Copilot, Windsurf, Cline |
| 📚 Документация | 15 | `README`, `CONTRIBUTING`, `CHANGELOG`, `docs/` |
| 🔒 Типобезопасность | 10 | `tsconfig.json`, `types/`, файлы `.d.ts` |
| 🧪 Тестирование | 6 | Jest/Vitest/Mocha/Cypress/Playwright + директории тестов |
| ✨ Качество кода | 10 | ESLint + Prettier (любой формат) + EditorConfig + Stylelint |
| 🔄 Git & CI/CD | 9 | GitHub Actions/GitLab CI + Husky + `.gitignore` |
| 📦 Зависимости | 8 | Файлы блокировок по языкам (JS, Python, Rust, Go) |

**Итого: 84 балла** → нормализовано до 0–100.

---

## Опции

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

### Интеграция с CI

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

## Как улучшить оценку

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

**Это изменяет мой проект?**
Нет. Vibe-check полностью только для чтения.

**Какие языки поддерживаются?**
Все. Проверяются универсальные инструменты (TypeScript, ESLint, тесты, CI), работающие с любым языком.

**Можно ли использовать в CI?**
Да! `npx vibe-check --min-score 70` завершается с кодом 1, если оценка ниже порога. Идеально для PR-проверок.

**Почему моя оценка ниже ожидаемой?**
Взаимоисключающие пункты сгруппированы. Наличие 4 конфигов ESLint не даёт больше очков, чем наличие 1 — учитывается только реально используемый формат.

---

## Смотрите также

| Проект | Описание |
|--------|----------|
| [**awesome-ai-rules**](https://github.com/liangzhengtao/awesome-ai-rules) | 20 production-ready ИИ-правил для кодинга |
| [**ai-commit**](https://github.com/liangzhengtao/ai-commit) | `npx ai-commit` — ИИ пишет сообщения коммитов |
| [**awesome-mcp-servers**](https://github.com/liangzhengtao/awesome-mcp-servers) | MCP-серверы для Cursor, Claude Code и Kimi Code |

## Участие

См. [CONTRIBUTING.md](CONTRIBUTING.md). PR приветствуются!

## Лицензия

[MIT](LICENSE)

---

<div align="center">

**Полезно? Поставьте ⭐**

</div>

---
