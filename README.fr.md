[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md) | [العربية](README.ar.md) | [한국어](README.ko.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

<div align="center">

<img src=".banner.svg" width="100%" alt="banner">

</div>


# 🎯 Vibe Check

<div align="center">

### `npx vibe-check` — Votre projet est-il prêt pour l'IA ?

**Évaluez instantanément dans quelle mesure votre projet est configuré pour les assistants de codage IA.**
Une commande. Zéro configuration. Des résultats exploitables.

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
│   ✨ Score : 83/100 | Note : A                             │
│   Super ! Votre projet est très adapté à l'IA.             │
╰────────────────────────────────────────────────────────────╯

📊 Résultats détaillés :
  Fichiers de règles IA  [4/6]  20/26 pts
  Documentation          [4/4]  15/15 pts
  Sécurité des types     [2/3]   8/10 pts
  Tests                  [2/5]   6/6  pts
  Qualité du code        [3/4]   8/10 pts
  Git & CI/CD            [3/4]   9/9  pts
  Dépendances            [2/3]   4/8  pts

💡 Recommandations :
  1. Ajoutez des règles pour plus d'outils IA pour maximiser la compatibilité
  2. Ajoutez des définitions de types TypeScript (fichiers .d.ts)
```

---

## Pourquoi Vibe Check ?

Les assistants de codage IA (Cursor, Claude Code, Copilot, Kimi Code) génèrent un **code nettement meilleur** lorsque votre projet dispose d'une configuration adéquate — fichiers de règles, TypeScript, tests, linting. Mais la plupart des projets manquent de la moitié de ces éléments.

**Vibe Check** analyse votre projet en quelques secondes et vous attribue un score de 0 à 100 avec des recommandations spécifiques.

| Note | Score | Signification |
|:-----:|:-----:|---------|
| 🏆 S | 90–100 | Parfait — votre projet est un étalon-or |
| ✨ A | 75–89 | Excellent — quelques améliorations mineures possibles |
| 👍 B | 60–74 | Bien — quelques lacunes à combler |
| 🔧 C | 40–59 | Moyen — une marge d'amélioration significative |
| ⚠️ D | 20–39 | À améliorer — les assistants IA fonctionnent en dessous de leurs capacités |
| ❌ F | 0–19 | Insuffisant — configuration majeure manquante |

---

## Démarrage rapide

```bash
# Aucune installation requise
npx vibe-check

# Vérifier un projet spécifique
npx vibe-check /path/to/project

# Mode CI — échec de la build si score < 70
npx vibe-check --min-score 70

# Sortie JSON pour les scripts
npx vibe-check --json
```

---

## Ce qui est vérifié

7 catégories. Les **vérifications mutuellement exclusives** (différents formats de config ESLint) sont regroupées — seule la meilleure correspondance compte.

| Catégorie | Max | Ce qui est vérifié |
|----------|:---:|----------------|
| 🤖 Règles IA | 26 | `.cursorrules`, `CLAUDE.md`, `AGENTS.md`, Copilot, Windsurf, Cline |
| 📚 Documentation | 15 | `README`, `CONTRIBUTING`, `CHANGELOG`, `docs/` |
| 🔒 Sécurité des types | 10 | `tsconfig.json`, `types/`, fichiers `.d.ts` |
| 🧪 Tests | 6 | Jest/Vitest/Mocha/Cypress/Playwright + répertoires de tests |
| ✨ Qualité du code | 10 | ESLint + Prettier (tout format) + EditorConfig + Stylelint |
| 🔄 Git & CI/CD | 9 | GitHub Actions/GitLab CI + Husky + `.gitignore` |
| 📦 Dépendances | 8 | Fichiers de verrouillage par langage (JS, Python, Rust, Go) |

**Total : 84 points** → normalisé sur 0–100.

---

## Options

```
vibe-check [options] [directory]

Options:
  -j, --json             Sortie au format JSON
  -v, --verbose          Afficher les résultats détaillés par vérification
  -m, --min-score <N>    Code de sortie 1 si score < N (mode CI)
  --no-color             Désactiver les couleurs
  -h, --help             Afficher l'aide
  -V, --version          Afficher la version
```

### Intégration CI

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

## Comment améliorer votre score

```bash
# 1. Ajouter des règles IA (impact maximal — jusqu'à 26 points)
echo "# My Rules" > .cursorrules
echo "# My Rules" > CLAUDE.md

# 2. Ajouter TypeScript (10 points)
npx tsc --init

# 3. Ajouter ESLint + Prettier (10 points)
npm init @eslint/config
npm i -D prettier && echo {} > .prettierrc

# 4. Ajouter un framework de tests (6 points)
npm i -D vitest

# 5. Ajouter GitHub Actions CI (4 points)
mkdir -p .github/workflows
# créer ci.yml

# 6. Ajouter .gitignore (2 points)
npx gitignore node
```

---

## FAQ

**Cet outil modifie-t-il mon projet ?**
Non. Vibe Check est 100 % en lecture seule.

**Quels langages sont pris en charge ?**
Tous. Il vérifie des outils universels (TypeScript, ESLint, tests, CI) qui fonctionnent avec n'importe quel langage.

**Puis-je l'utiliser dans une CI ?**
Oui ! `npx vibe-check --min-score 70` se termine avec le code de sortie 1 si le score est en dessous du seuil. Parfait pour les vérifications de PR.

**Pourquoi mon score est-il inférieur à ce que j'attendais ?**
Les éléments mutuellement exclusifs sont regroupés. Avoir 4 fichiers de configuration ESLint ne rapporte pas plus de points qu'en avoir 1 — seul le format que vous utilisez réellement compte.

---

## Voir aussi

| Projet | Description |
|---------|-------------|
| [**awesome-ai-rules**](https://github.com/Serennity007/awesome-ai-rules) | 20 règles de codage IA prêtes pour la production |
| [**ai-commit**](https://github.com/Serennity007/ai-commit) | `npx ai-commit` — L'IA rédige vos messages de commit |
| [**awesome-mcp-servers**](https://github.com/Serennity007/awesome-mcp-servers) | Serveurs MCP pour Cursor, Claude Code et Kimi Code |

## Contribuer

Voir [CONTRIBUTING.md](CONTRIBUTING.md). PR bienvenues !

## Licence

[MIT](LICENSE)

---

<div align="center">

**Trouvez-vous cet outil utile ? Donnez-lui une ⭐**

</div>

---
