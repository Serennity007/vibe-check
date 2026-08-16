const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');
const gradient = require('gradient-string');
const figures = require('figures');

// Each group is a set of mutually exclusive checks (only the best match counts).
// Checks outside a group are independent.
const CHECKS = {
  aiRules: {
    name: 'AI Rules Files',
    description: 'Check for AI coding assistant configuration files',
    checks: [
      { file: '.cursorrules', name: 'Cursor Rules', points: 5 },
      { file: 'CLAUDE.md', name: 'Claude Code Rules', points: 5 },
      { file: 'AGENTS.md', name: 'Kimi Code Rules', points: 5 },
      { file: '.github/copilot-instructions.md', name: 'Copilot Instructions', points: 5 },
      { file: '.windsurfrules', name: 'Windsurf Rules', points: 3 },
      { file: '.clinerules', name: 'Cline Rules', points: 3 },
    ],
    // All independent - each tool's rule file can coexist
  },

  documentation: {
    name: 'Documentation',
    description: 'Check for project documentation',
    checks: [
      { file: 'README.md', name: 'README', points: 5 },
      { file: 'CONTRIBUTING.md', name: 'Contributing Guide', points: 3 },
      { file: 'CHANGELOG.md', name: 'Changelog', points: 2 },
      { file: 'docs/', name: 'Documentation Directory', points: 5, isDirectory: true },
    ],
  },

  typeSafety: {
    name: 'Type Safety',
    description: 'Check for type definitions and TypeScript usage',
    checks: [
      { file: 'tsconfig.json', name: 'TypeScript Config', points: 5 },
      { file: 'types/', name: 'Types Directory', points: 3, isDirectory: true },
      { file: '.d.ts', name: 'Type Definitions', points: 2, isGlob: true },
    ],
  },

  testing: {
    name: 'Testing',
    description: 'Check for testing setup and coverage',
    checks: [
      { file: 'jest.config.js', name: 'Jest Config', points: 3, group: 'test-framework' },
      { file: 'jest.config.ts', name: 'Jest Config (TS)', points: 3, group: 'test-framework' },
      { file: 'vitest.config.ts', name: 'Vitest Config', points: 3, group: 'test-framework' },
      { file: 'vitest.config.js', name: 'Vitest Config (JS)', points: 3, group: 'test-framework' },
      { file: '.mocharc.js', name: 'Mocha Config', points: 3, group: 'test-framework' },
      { file: 'cypress.config.ts', name: 'Cypress Config', points: 3, group: 'test-framework' },
      { file: 'playwright.config.ts', name: 'Playwright Config', points: 3, group: 'test-framework' },
      { file: '__tests__/', name: 'Tests Directory', points: 3, isDirectory: true, group: 'test-dir' },
      { file: 'test/', name: 'Test Directory', points: 3, isDirectory: true, group: 'test-dir' },
      { file: 'tests/', name: 'Tests Directory', points: 3, isDirectory: true, group: 'test-dir' },
    ],
    // Groups: test-framework (any one = 3pts), test-dir (any one = 3pts)
  },

  codeQuality: {
    name: 'Code Quality',
    description: 'Check for linting and formatting tools',
    checks: [
      { file: '.eslintrc.js', name: 'ESLint Config', points: 3, group: 'eslint' },
      { file: '.eslintrc.json', name: 'ESLint Config (JSON)', points: 3, group: 'eslint' },
      { file: '.eslintrc.yml', name: 'ESLint Config (YAML)', points: 3, group: 'eslint' },
      { file: 'eslint.config.js', name: 'ESLint Config (Flat)', points: 3, group: 'eslint' },
      { file: '.prettierrc', name: 'Prettier Config', points: 3, group: 'prettier' },
      { file: '.prettierrc.js', name: 'Prettier Config (JS)', points: 3, group: 'prettier' },
      { file: '.prettierrc.json', name: 'Prettier Config (JSON)', points: 3, group: 'prettier' },
      { file: 'prettier.config.js', name: 'Prettier Config (JS)', points: 3, group: 'prettier' },
      { file: '.editorconfig', name: 'Editor Config', points: 2 },
      { file: '.stylelintrc.json', name: 'Stylelint Config', points: 2 },
    ],
    // Groups: eslint (any one = 3pts), prettier (any one = 3pts)
  },

  gitCicd: {
    name: 'Git & CI/CD',
    description: 'Check for Git hooks and CI/CD setup',
    checks: [
      { file: '.husky/', name: 'Husky Directory', points: 3, isDirectory: true },
      { file: '.github/workflows/', name: 'GitHub Actions', points: 4, group: 'ci-provider' },
      { file: '.gitlab-ci.yml', name: 'GitLab CI', points: 3, group: 'ci-provider' },
      { file: 'Jenkinsfile', name: 'Jenkins', points: 2, group: 'ci-provider' },
      { file: '.circleci/', name: 'CircleCI', points: 2, isDirectory: true, group: 'ci-provider' },
      { file: '.gitignore', name: 'Gitignore', points: 2 },
    ],
    // Groups: ci-provider (highest = 4pts)
  },

  dependencies: {
    name: 'Dependencies',
    description: 'Check for dependency management',
    checks: [
      { file: 'package-lock.json', name: 'npm Lockfile', points: 2, group: 'js-lock' },
      { file: 'yarn.lock', name: 'Yarn Lockfile', points: 2, group: 'js-lock' },
      { file: 'pnpm-lock.yaml', name: 'pnpm Lockfile', points: 2, group: 'js-lock' },
      { file: 'Pipfile.lock', name: 'Pipenv Lockfile', points: 2, group: 'python-lock' },
      { file: 'poetry.lock', name: 'Poetry Lockfile', points: 2, group: 'python-lock' },
      { file: 'Cargo.lock', name: 'Cargo Lockfile', points: 2, group: 'rust-lock' },
      { file: 'go.sum', name: 'Go Sum', points: 2, group: 'go-lock' },
    ],
    // Groups: js-lock, python-lock, rust-lock, go-lock (one per language)
  },
};

// Score thresholds (ordered array)
const SCORE_THRESHOLDS = [
  { grade: 'S', min: 90, color: 'green', emoji: '🏆', message: 'Perfect! Your project is AI-ready!' },
  { grade: 'A', min: 75, color: 'green', emoji: '✨', message: 'Great! Your project is very AI-friendly.' },
  { grade: 'B', min: 60, color: 'blue', emoji: '👍', message: 'Good job! Some improvements possible.' },
  { grade: 'C', min: 40, color: 'yellow', emoji: '🔧', message: 'Fair. Consider adding more AI configurations.' },
  { grade: 'D', min: 20, color: 'yellow', emoji: '⚠️', message: 'Needs work. Your project could benefit from more setup.' },
  { grade: 'F', min: 0, color: 'red', emoji: '❌', message: 'Poor. Your project needs significant AI configuration.' },
];

function fileExists(filePath, isDirectory = false) {
  try {
    const stats = fs.statSync(filePath);
    return isDirectory ? stats.isDirectory() : stats.isFile();
  } catch {
    return false;
  }
}

function findGlobPattern(directory, pattern, maxDepth = 3) {
  function search(dir, depth) {
    if (depth > maxDepth) return false;
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name.startsWith('.') && entry.name !== '.d.ts') continue;
        if (entry.name === 'node_modules' || entry.name === '.git') continue;
        if (entry.isFile() && entry.name.endsWith(pattern)) return true;
        if (entry.isDirectory() && search(path.join(dir, entry.name), depth + 1)) return true;
      }
    } catch { /* permission error */ }
    return false;
  }
  return search(directory, 0);
}

function runCheck(directory, check) {
  const filePath = path.join(directory, check.file);
  if (check.isGlob) return findGlobPattern(directory, check.file);
  return fileExists(filePath, check.isDirectory);
}

// Calculate realistic max points: for grouped checks, only the highest-scoring one counts
function calculateCategoryScore(checkResults) {
  let earnedPoints = 0;
  let maxPoints = 0;

  // Separate into groups and ungrouped
  const groups = {};
  const ungrouped = [];

  for (const result of checkResults) {
    if (result.group) {
      if (!groups[result.group]) groups[result.group] = [];
      groups[result.group].push(result);
    } else {
      ungrouped.push(result);
    }
  }

  // Ungrouped: each counts independently
  for (const result of ungrouped) {
    maxPoints += result.points;
    if (result.passed) earnedPoints += result.points;
  }

  // Grouped: only the highest-scoring passed check in each group counts
  for (const [, groupChecks] of Object.entries(groups)) {
    const groupMax = Math.max(...groupChecks.map(c => c.points));
    maxPoints += groupMax;

    const passedInGroup = groupChecks.filter(c => c.passed);
    if (passedInGroup.length > 0) {
      earnedPoints += Math.max(...passedInGroup.map(c => c.points));
    }
  }

  return { earnedPoints, maxPoints };
}

function calculateScore(results) {
  let totalMax = 0;
  let totalEarned = 0;

  for (const category of Object.values(results)) {
    totalMax += category.maxPoints;
    totalEarned += category.earnedPoints;
  }

  return totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
}

function getGrade(score) {
  for (const threshold of SCORE_THRESHOLDS) {
    if (score >= threshold.min) return { ...threshold };
  }
  return { ...SCORE_THRESHOLDS[SCORE_THRESHOLDS.length - 1] };
}

function formatCheckResult(check, passed) {
  const icon = passed ? chalk.green(figures.tick) : chalk.red(figures.cross);
  const name = passed ? chalk.green(check.name) : chalk.dim(check.name);
  const points = passed ? chalk.green(`+${check.points}`) : chalk.dim(`+${check.points}`);
  return `  ${icon} ${name} ${chalk.dim(`(${points})`)}`;
}

function formatCategoryResults(category) {
  const passed = category.checks.filter(c => c.passed).length;
  const total = category.checks.length;
  const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;

  let statusColor;
  if (percentage >= 75) statusColor = chalk.green;
  else if (percentage >= 50) statusColor = chalk.yellow;
  else statusColor = chalk.red;

  const status = statusColor(`${passed}/${total}`);
  const points = chalk.cyan(`${category.earnedPoints}/${category.maxPoints}`);

  return {
    header: `${chalk.bold(category.name)} ${chalk.dim(`[${status}] ${points} points`)}`,
    description: chalk.dim(category.description),
    checks: category.checks.map(c => formatCheckResult(c, c.passed)),
  };
}

function generateRecommendations(results) {
  const recommendations = [];

  const aiRules = results.aiRules;
  if (aiRules.earnedPoints === 0) {
    recommendations.push('Add AI rules files (.cursorrules, CLAUDE.md, AGENTS.md) to configure your AI assistant');
  } else if (aiRules.earnedPoints < aiRules.maxPoints) {
    recommendations.push('Consider adding rules for more AI tools to maximize compatibility');
  }

  const docs = results.documentation;
  if (!docs.checks.find(c => c.file === 'README.md' && c.passed)) {
    recommendations.push('Add a README.md with clear project description and setup instructions');
  }

  const types = results.typeSafety;
  if (types.earnedPoints === 0) {
    recommendations.push('Add TypeScript configuration for better AI code suggestions');
  }

  const testing = results.testing;
  if (testing.earnedPoints === 0) {
    recommendations.push('Set up a testing framework (Jest, Vitest, Playwright) for better code quality');
  }

  const quality = results.codeQuality;
  if (quality.earnedPoints === 0) {
    recommendations.push('Add ESLint and Prettier for consistent code style');
  }

  return recommendations;
}

async function runVibeCheck(directory, options = {}) {
  const spinner = ora('Checking your project vibe...').start();

  const resolvedDir = path.resolve(directory);

  if (!fs.existsSync(resolvedDir)) {
    spinner.fail(chalk.red(`Directory not found: ${resolvedDir}`));
    process.exit(1);
  }

  // Run all checks with group-aware scoring
  const results = {};

  for (const [key, category] of Object.entries(CHECKS)) {
    // Run each check
    const checkResults = category.checks.map(check => ({
      ...check,
      passed: runCheck(resolvedDir, check),
    }));

    // Calculate score with group awareness
    const { earnedPoints, maxPoints } = calculateCategoryScore(checkResults);

    results[key] = {
      name: category.name,
      description: category.description,
      maxPoints,
      earnedPoints,
      checks: checkResults,
    };
  }

  const score = calculateScore(results);
  const grade = getGrade(score);

  spinner.stop();

  if (options.json) {
    console.log(JSON.stringify({ score, grade: grade.grade, results }, null, 2));
    if (options.returnResult) return { score, grade: grade.grade, results };
    return;
  }

  // Display results
  console.log('');
  console.log(gradient.pastel.multiline('╔══════════════════════════════════════════════════════════════╗'));
  console.log(gradient.pastel.multiline('║                    VIBE CHECK RESULTS                       ║'));
  console.log(gradient.pastel.multiline('╚══════════════════════════════════════════════════════════════╝'));
  console.log('');

  const scoreColor = chalk[grade.color] || chalk.white;
  const scoreDisplay = scoreColor.bold(`${score}/100`);
  const gradeDisplay = scoreColor.bold(grade.grade);

  console.log(boxen(
    `${grade.emoji} Score: ${scoreDisplay} | Grade: ${gradeDisplay}\n\n${grade.message}`,
    { padding: 1, margin: 1, borderStyle: 'round', borderColor: grade.color }
  ));

  console.log(chalk.bold('\n📊 Detailed Results:\n'));

  for (const [, category] of Object.entries(results)) {
    const formatted = formatCategoryResults(category);
    console.log(formatted.header);
    console.log(formatted.description);
    if (options.verbose) {
      formatted.checks.forEach(check => console.log(check));
    }
    console.log('');
  }

  const recommendations = generateRecommendations(results);
  if (recommendations.length > 0) {
    console.log(chalk.bold('\n💡 Recommendations:\n'));
    recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });
    console.log('');
  }

  console.log(boxen(
    chalk.dim('Tip: Run with --verbose to see detailed check results\n' +
    'Tip: Run with --json to get machine-readable output'),
    { padding: 1, margin: 1, borderStyle: 'single', borderColor: 'dim' }
  ));

  if (options.returnResult) return { score, grade: grade.grade, results };
}

module.exports = { runVibeCheck, CHECKS, SCORE_THRESHOLDS, calculateScore, calculateCategoryScore, getGrade, runCheck, findGlobPattern };
