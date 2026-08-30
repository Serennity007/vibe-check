[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md) | [العربية](README.ar.md) | [한국어](README.ko.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

<div align="center">

<img src=".banner.svg" width="100%" alt="banner">

</div>


# 🎯 Vibe Check

<div align="center">

### `npx vibe-check` — هل مشروعك جاهز للذكاء الاصطناعي؟

**قيّم مدى جاهزية مشروعك لمساعدي البرمجة بالذكاء الاصطناعي فورًا.**
أمر واحد. بدون إعداد. نتائج قابلة للتنفيذ.

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

## لماذا Vibe Check؟

مساعدي البرمجة بالذكاء الاصطناعي (Cursor، Claude Code، Copilot، Kimi Code) تُنتج **كودًا أفضل بكثير** عندما يكون مشروعك مُعدًا بشكل صحيح — ملفات القواعد، TypeScript، الاختبار، Linting. لكن معظم المشاريع تفتقر لنصف هذه العناصر.

**Vibe Check** يفحص مشروعك في ثوانٍ ويمنحك درجة من 0-100 مع توصيات محددة.

| الدرجة | النتيجة | المعنى |
|:------:|:-------:|--------|
| 🏆 S | 90–100 | ممتاز — مشروعك معيار ذهبي |
| ✨ A | 75–89 | رائع — تحسينات طفيفة ممكنة |
| 👍 B | 60–74 | جيد — بعض الفجوات لملئها |
| 🔧 C | 40–59 | مقبول — مجال كبير للتحسين |
| ⚠️ D | 20–39 | يحتاج عمل — مساعدي AI بأداء ضعيف |
| ❌ F | 0–19 | ضعيف — إعدادات رئيسية مفقودة |

---

## البدء السريع

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

## ما يتم فحصه

7 فئات. **فحوصات متنافية** (مثل صيغ إعداد ESLint) مُجمّعة — فقط أفضل تطبيق يُحتسب.

| الفئة | الحد الأقصى | ما يتم فحصه |
|-------|:----------:|-------------|
| 🤖 قواعد AI | 26 | `.cursorrules`، `CLAUDE.md`، `AGENTS.md`، Copilot، Windsurf، Cline |
| 📚 التوثيق | 15 | `README`، `CONTRIBUTING`، `CHANGELOG`، `docs/` |
| 🔒 سلامة الأنواع | 10 | `tsconfig.json`، `types/`، ملفات `.d.ts` |
| 🧪 الاختبار | 6 | Jest/Vitest/Mocha/Cypress/Playwright + مجلدات الاختبار |
| ✨ جودة الكود | 10 | ESLint + Prettier (أي صيغة) + EditorConfig + Stylelint |
| 🔄 Git و CI/CD | 9 | GitHub Actions/GitLab CI + Husky + `.gitignore` |
| 📦 التبعيات | 8 | ملفات القفل لكل لغة (JS، Python، Rust، Go) |

**المجموع: 84 نقطة** ← مُسوّاة إلى 0-100.

---

## الخيارات

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

### التكامل مع CI

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

## كيفية تحسين درجتك

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

## الأسئلة الشائعة

**هل هذا يُعدّل على مشروعي؟**
لا. Vibe Check للقراءة فقط 100%.

**ما اللغات المدعومة؟**
جميعها. يتحقق من أدوات عالمية (TypeScript، ESLint، الاختبار، CI) تعمل مع أي لغة.

**هل يمكنني استخدامه في CI؟**
نعم! `npx vibe-check --min-score 70` ينتهي بالرمز 1 إذا كانت الدرجة أقل من الحد المطلوب. مثالي لفحص PR.

**لماذا درجتي أقل مما توقعت؟**
العناصر المتنافية مُجمّعة. وجود 4 ملفات ESLint لا يُعطي نقاطًا أكثر من ملف واحد — فقط الصيغة التي تستخدمها فعليًا تُحتسب.

---

## أنظر أيضًا

| المشروع | الوصف |
|---------|-------|
| [**awesome-ai-rules**](https://github.com/Serennity007/awesome-ai-rules) | 20 قاعدة برمجة AI جاهزة للإنتاج |
| [**ai-commit**](https://github.com/Serennity007/ai-commit) | `npx ai-commit` — AI يكتب رسائل الإيداع |
| [**awesome-mcp-servers**](https://github.com/Serennity007/awesome-mcp-servers) | خوادم MCP لـ Cursor، Claude Code، و Kimi Code |

## المساهمة

راجع [CONTRIBUTING.md](CONTRIBUTING.md). طلبات السحب مرحب بها!

## الرخصة

[MIT](LICENSE)

---

<div align="center">

**وجدت هذا مفيدًا؟ منحه ⭐**

</div>

---
