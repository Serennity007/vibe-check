[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md) | [العربية](README.ar.md) | [한국어](README.ko.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

<div align="center">

<img src=".banner.svg" width="100%" alt="banner">

</div>


# 🎯 Vibe Check

<div align="center">

### `npx vibe-check` — ¿Tu proyecto está listo para la IA?

**Evalúa al instante qué tan bien configurado está tu proyecto para asistentes de codificación con IA.**
Un comando. Cero configuración. Resultados accionables.

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
│   ✨ Puntuación: 83/100 | Calificación: A                  │
│   ¡Genial! Tu proyecto es muy amigable con la IA.          │
╰────────────────────────────────────────────────────────────╯

📊 Resultados detallados:
  Archivos de reglas IA  [4/6]  20/26 pts
  Documentación          [4/4]  15/15 pts
  Seguridad de tipos     [2/3]   8/10 pts
  Pruebas                [2/5]   6/6  pts
  Calidad del código     [3/4]   8/10 pts
  Git y CI/CD            [3/4]   9/9  pts
  Dependencias           [2/3]   4/8  pts

💡 Recomendaciones:
  1. Añade reglas para más herramientas de IA para maximizar la compatibilidad
  2. Añade definiciones de tipos TypeScript (archivos .d.ts)
```

---

## ¿Por qué Vibe Check?

Los asistentes de codificación con IA (Cursor, Claude Code, Copilot, Kimi Code) generan **código significativamente mejor** cuando tu proyecto tiene la configuración adecuada — archivos de reglas, TypeScript, pruebas, linting. Pero la mayoría de los proyectos carecen de la mitad de estos elementos.

**Vibe Check** escanea tu proyecto en segundos y te da una puntuación de 0 a 100 con recomendaciones específicas.

| Calificación | Puntuación | Significado |
|:-----:|:-----:|---------|
| 🏆 S | 90–100 | Perfecto — tu proyecto es un referente de oro |
| ✨ A | 75–89 | Excelente — mejoras menores posibles |
| 👍 B | 60–74 | Bien — algunas brechas por cubrir |
| 🔧 C | 40–59 | Regular — margen significativo de mejora |
| ⚠️ D | 20–39 | Necesita trabajo — los asistentes IA están por debajo de su rendimiento |
| ❌ F | 0–19 | Deficiente — falta configuración importante |

---

## Inicio rápido

```bash
# Sin instalación
npx vibe-check

# Verificar un proyecto específico
npx vibe-check /path/to/project

# Modo CI — fallo en la build si la puntuación < 70
npx vibe-check --min-score 70

# Salida JSON para scripts
npx vibe-check --json
```

---

## Qué verifica

7 categorías. Las **verificaciones mutuamente excluyentes** (diferentes formatos de configuración ESLint) se agrupan — solo cuenta la mejor coincidencia.

| Categoría | Máx | Qué se verifica |
|----------|:---:|----------------|
| 🤖 Reglas IA | 26 | `.cursorrules`, `CLAUDE.md`, `AGENTS.md`, Copilot, Windsurf, Cline |
| 📚 Documentación | 15 | `README`, `CONTRIBUTING`, `CHANGELOG`, `docs/` |
| 🔒 Seguridad de tipos | 10 | `tsconfig.json`, `types/`, archivos `.d.ts` |
| 🧪 Pruebas | 6 | Jest/Vitest/Mocha/Cypress/Playwright + directorios de pruebas |
| ✨ Calidad del código | 10 | ESLint + Prettier (cualquier formato) + EditorConfig + Stylelint |
| 🔄 Git y CI/CD | 9 | GitHub Actions/GitLab CI + Husky + `.gitignore` |
| 📦 Dependencias | 8 | Archivos de bloqueo por lenguaje (JS, Python, Rust, Go) |

**Total: 84 puntos** → normalizado a 0–100.

---

## Opciones

```
vibe-check [options] [directory]

Options:
  -j, --json             Salida en formato JSON
  -v, --verbose          Mostrar resultados detallados por verificación
  -m, --min-score <N>    Código de salida 1 si la puntuación < N (modo CI)
  --no-color             Desactivar colores
  -h, --help             Mostrar ayuda
  -V, --version          Mostrar versión
```

### Integración CI

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

## Cómo mejorar tu puntuación

```bash
# 1. Añadir reglas de IA (mayor impacto — hasta 26 puntos)
echo "# My Rules" > .cursorrules
echo "# My Rules" > CLAUDE.md

# 2. Añadir TypeScript (10 puntos)
npx tsc --init

# 3. Añadir ESLint + Prettier (10 puntos)
npm init @eslint/config
npm i -D prettier && echo {} > .prettierrc

# 4. Añadir un framework de pruebas (6 puntos)
npm i -D vitest

# 5. Añadir GitHub Actions CI (4 puntos)
mkdir -p .github/workflows
# crear ci.yml

# 6. Añadir .gitignore (2 puntos)
npx gitignore node
```

---

## Preguntas frecuentes

**¿Esta herramienta modifica mi proyecto?**
No. Vibe Check es 100% de solo lectura.

**¿Qué lenguajes soporta?**
Todos. Verifica herramientas universales (TypeScript, ESLint, pruebas, CI) que funcionan con cualquier lenguaje.

**¿Puedo usarlo en CI?**
¡Sí! `npx vibe-check --min-score 70` sale con código 1 si la puntuación está por debajo del umbral. Perfecto para verificaciones de PR.

**¿Por qué mi puntuación es más baja de lo esperado?**
Los elementos mutuamente excluyentes se agrupan. Tener 4 archivos de configuración ESLint no da más puntos que tener 1 — solo cuenta el formato que realmente usas.

---

## Ver también

| Proyecto | Descripción |
|---------|-------------|
| [**awesome-ai-rules**](https://github.com/Serennity007/awesome-ai-rules) | 20 reglas de codificación con IA para producción |
| [**ai-commit**](https://github.com/Serennity007/ai-commit) | `npx ai-commit` — La IA escribe tus mensajes de commit |
| [**awesome-mcp-servers**](https://github.com/Serennity007/awesome-mcp-servers) | Servidores MCP para Cursor, Claude Code y Kimi Code |

## Contribuir

Consulta [CONTRIBUTING.md](CONTRIBUTING.md). ¡PRs bienvenidos!

## Licencia

[MIT](LICENSE)

---

<div align="center">

**¿Te resultó útil? Dale una ⭐**

</div>

---
