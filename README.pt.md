[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md) | [العربية](README.ar.md) | [한국어](README.ko.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

<div align="center">

<img src=".banner.svg" width="100%" alt="banner">

</div>


# 🎯 Vibe Check

<div align="center">

### `npx vibe-check` — Seu projeto está pronto para IA?

**Avalie instantaneamente o quão bem configurado está seu projeto para assistentes de IA.**
Um comando. Zero configuração. Resultados práticos.

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

## Por que Vibe Check?

Assistentes de código com IA (Cursor, Claude Code, Copilot, Kimi Code) geram **código significativamente melhor** quando seu projeto possui configurações adequadas — arquivos de regras, TypeScript, testes, linting. Mas a maioria dos projetos está faltando metade disso.

**Vibe Check** escaneia seu projeto em segundos e dá uma pontuação de 0 a 100 com recomendações específicas.

| Nota | Pontuação | Significado |
|:----:|:---------:|-------------|
| 🏆 S | 90–100 | Perfeito — seu projeto é referência |
| ✨ A | 75–89 | Ótimo — melhorias menores possíveis |
| 👍 B | 60–74 | Bom — algumas lacunas a preencher |
| 🔧 C | 40–59 | Regular — bastante espaço para melhoria |
| ⚠️ D | 20–39 | Precisa melhorar — assistentes IA com baixo desempenho |
| ❌ F | 0–19 | Fraco — configurações principais ausentes |

---

## Início Rápido

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

## O que é verificado

7 categorias. **Verificações mutuamente exclusivas** (ex: formatos de config ESLint) são agrupadas — apenas a melhor correspondência conta.

| Categoria | Máx | O que é verificado |
|-----------|:---:|-------------------|
| 🤖 Regras de IA | 26 | `.cursorrules`, `CLAUDE.md`, `AGENTS.md`, Copilot, Windsurf, Cline |
| 📚 Documentação | 15 | `README`, `CONTRIBUTING`, `CHANGELOG`, `docs/` |
| 🔒 Segurança de Tipos | 10 | `tsconfig.json`, `types/`, arquivos `.d.ts` |
| 🧪 Testes | 6 | Jest/Vitest/Mocha/Cypress/Playwright + diretórios de teste |
| ✨ Qualidade de Código | 10 | ESLint + Prettier (qualquer formato) + EditorConfig + Stylelint |
| 🔄 Git & CI/CD | 9 | GitHub Actions/GitLab CI + Husky + `.gitignore` |
| 📦 Dependências | 8 | Arquivos de lock por linguagem (JS, Python, Rust, Go) |

**Total: 84 pontos** → normalizado para 0–100.

---

## Opções

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

### Integração com CI

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

## Como Melhorar Sua Pontuação

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

**Isso modifica meu projeto?**
Não. Vibe-check é 100% somente leitura.

**Quais linguagens suporta?**
Todas. Verifica ferramentas universais (TypeScript, ESLint, testes, CI) que funcionam com qualquer linguagem.

**Posso usar no CI?**
Sim! `npx vibe-check --min-score 70` sai com código 1 se a pontuação estiver abaixo do limite. Perfeito para verificações de PR.

**Por que minha pontuação é menor que o esperado?**
Itens mutuamente exclusivos são agrupados. Ter 4 arquivos de config ESLint não dá mais pontos que ter 1 — apenas o formato que você realmente usa conta.

---

## Veja Também

| Projeto | Descrição |
|---------|-----------|
| [**awesome-ai-rules**](https://github.com/Serennity007/awesome-ai-rules) | 20 regras de IA para produção |
| [**ai-commit**](https://github.com/Serennity007/ai-commit) | `npx ai-commit` — IA escreve suas mensagens de commit |
| [**awesome-mcp-servers**](https://github.com/Serennity007/awesome-mcp-servers) | Servidores MCP para Cursor, Claude Code e Kimi Code |

## Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md). PRs são bem-vindos!

## Licença

[MIT](LICENSE)

---

<div align="center">

**Achou útil? Dê uma ⭐**

</div>

---
