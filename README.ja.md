[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Español](README.es.md) | [العربية](README.ar.md) | [한국어](README.ko.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)

<div align="center">

<img src=".banner.svg" width="100%" alt="banner">

</div>


# 🎯 Vibe Check

<div align="center">

### `npx @liangzhengtao/vibe-check` — あなたのプロジェクトは AI 対応できていますか？

**AI コーディングアシスタント向けの設定状況を瞬時にスコアリング。**
1コマンド。設定不要。すぐ使える結果。

[![npm](https://img.shields.io/npm/v/@liangzhengtao/vibe-check.svg)](https://www.npmjs.com/package/@liangzhengtao/vibe-check)
[![Downloads](https://img.shields.io/npm/dm/@liangzhengtao/vibe-check.svg)](https://www.npmjs.com/package/@liangzhengtao/vibe-check)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

```bash
$ npx @liangzhengtao/vibe-check

╔══════════════════════════════════════════════════════════════╗
║                    VIBE CHECK RESULTS                       ║
╚══════════════════════════════════════════════════════════════╝

╭────────────────────────────────────────────────────────────╮
│   ✨ Score: 83/100 | Grade: A                              │
│   素晴らしい！あなたのプロジェクトは非常に AI フレンドリーです。  │
╰────────────────────────────────────────────────────────────╯

📊 詳細結果:
  AI ルールファイル  [4/6]  20/26 点
  ドキュメント       [4/4]  15/15 点
  型安全性           [2/3]   8/10 点
  テスト             [2/5]   6/6  点
  コード品質         [3/4]   8/10 点
  Git と CI/CD      [3/4]   9/9  点
  依存関係           [2/3]   4/8  点

💡 改善提案:
  1. さらに多くの AI ツール用ルールを追加して互換性を最大化
  2. TypeScript の型定義（.d.ts ファイル）を追加
```

---

## なぜ Vibe Check なのか？

AI コーディングアシスタント（Cursor、Claude Code、Copilot、Kimi Code）は、プロジェクトに適切な設定（ルールファイル、TypeScript、テスト、Lint）があると **はるかに高品質なコード** を生成します。しかし、ほとんどのプロジェクトではその半分が欠けています。

**Vibe Check** は数秒でプロジェクトをスキャンし、0〜100のスコアと具体的な改善提案を提示します。

| 等級 | スコア | 意味 |
|:-----:|:-----:|---------|
| 🏆 S | 90–100 | 完璧 — あなたのプロジェクトはゴールドスタンダード |
| ✨ A | 75–89 | 優秀 — 小さな改善の余地あり |
| 👍 B | 60–74 | 良好 — いくつかのギャップを埋める必要あり |
| 🔧 C | 40–59 | 普通 — 改善の余地が大きい |
| ⚠️ D | 20–39 | 要改善 — AI アシスタントが十分に力を発揮できていない |
| ❌ F | 0–19 | 不良 — 重大な設定不足 |

---

## クイックスタート

```bash
# インストール不要
npx @liangzhengtao/vibe-check

# 特定のプロジェクトをチェック
npx @liangzhengtao/vibe-check /path/to/project

# CI モード — スコアが 70 未満ならビルド失敗
npx @liangzhengtao/vibe-check --min-score 70

# スクリプト向け JSON 出力
npx @liangzhengtao/vibe-check --json
```

---

## チェック内容

7カテゴリ。**排他的なチェック項目**（異なる形式の ESLint 設定など）はグループ化され、最良の一致のみがカウントされます。

| カテゴリ | 満点 | チェック内容 |
|----------|:---:|----------------|
| 🤖 AI ルール | 26 | `.cursorrules`、`CLAUDE.md`、`AGENTS.md`、Copilot、Windsurf、Cline |
| 📚 ドキュメント | 15 | `README`、`CONTRIBUTING`、`CHANGELOG`、`docs/` |
| 🔒 型安全性 | 10 | `tsconfig.json`、`types/`、`.d.ts` ファイル |
| 🧪 テスト | 6 | Jest/Vitest/Mocha/Cypress/Playwright + テストディレクトリ |
| ✨ コード品質 | 10 | ESLint + Prettier（任意の形式）+ EditorConfig + Stylelint |
| 🔄 Git と CI/CD | 9 | GitHub Actions/GitLab CI + Husky + `.gitignore` |
| 📦 依存関係 | 8 | 各言語のロックファイル（JS、Python、Rust、Go） |

**合計：84点** → 0〜100に正規化。

---

## オプション

```
vibe-check [options] [directory]

Options:
  -j, --json             JSON 形式で出力
  -v, --verbose          各チェックの詳細結果を表示
  -m, --min-score <N>    スコアが N 未満の場合、終了コード 1（CI モード）
  --no-color             カラー出力を無効化
  -h, --help             ヘルプを表示
  -V, --version          バージョンを表示
```

### CI 統合

```yaml
# GitHub Actions
- name: Check AI-friendliness
  run: npx @liangzhengtao/vibe-check --min-score 60 --json
```

```yaml
# GitLab CI
vibe-check:
  script:
    - npx @liangzhengtao/vibe-check --min-score 60
```

---

## スコア改善方法

```bash
# 1. AI ルールを追加（最大の効果 — 最大 26 点）
echo "# My Rules" > .cursorrules
echo "# My Rules" > CLAUDE.md

# 2. TypeScript を追加（10 点）
npx tsc --init

# 3. ESLint + Prettier を追加（10 点）
npm init @eslint/config
npm i -D prettier && echo {} > .prettierrc

# 4. テストフレームワークを追加（6 点）
npm i -D vitest

# 5. GitHub Actions CI を追加（4 点）
mkdir -p .github/workflows
# ci.yml を作成

# 6. .gitignore を追加（2 点）
npx gitignore node
```

---

## よくある質問

**プロジェクトを変更しますか？**
いいえ。Vibe Check は 100% 読み取り専用です。

**どのプログラミング言語に対応していますか？**
すべての言語です。TypeScript、ESLint、テスト、CI など、あらゆる言語で動作するユニバーサルなツールをチェックします。

**CI で使えますか？**
はい！`npx @liangzhengtao/vibe-check --min-score 70` はスコアがしきい値未満の場合に終了コード 1 を返します。PR チェックに最適です。

**スコアが思ったより低いのはなぜですか？**
排他項目はグループ化されます。ESLint 設定ファイルが4つあっても1つの場合と同じポイントしか得られません — 実際に使用しているフォーマットのみがカウントされます。

---

## 関連プロジェクト

| プロジェクト | 説明 |
|---------|-------------|
| [**awesome-ai-rules**](https://github.com/Serennity007/awesome-ai-rules) | 20 のプロダクション向け AI コーディングルール |
| [**ai-commit**](https://github.com/Serennity007/ai-commit) | `npx @liangzhengtao/commit-ai` — AI がコミットメッセージを生成 |
| [**awesome-mcp-servers**](https://github.com/Serennity007/awesome-mcp-servers) | Cursor、Claude Code、Kimi Code 向け MCP サーバー |

## コントリビューション

[CONTRIBUTING.md](CONTRIBUTING.md) をご覧ください。PR を歓迎します！

## ライセンス

[MIT](LICENSE)

---

<div align="center">

**役に立ったら ⭐ をお願いします！**

</div>

---
