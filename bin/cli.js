#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const path = require('path');
const { runVibeCheck } = require('../src/index');

const pkg = require(path.join(__dirname, '..', 'package.json'));

program
  .name('vibe-check')
  .description('Check if your project is AI-friendly and get a vibe score')
  .version(pkg.version)
  .argument('[directory]', 'Directory to check', '.')
  .option('-j, --json', 'Output as JSON')
  .option('-v, --verbose', 'Show detailed information')
  .option('-m, --min-score <number>', 'Exit with non-zero code if score is below this threshold (CI mode)')
  .option('--no-color', 'Disable colors')
  .action(async (directory, options) => {
    try {
      const result = await runVibeCheck(directory, { ...options, returnResult: true });

      // CI mode: exit non-zero if score below threshold
      if (options.minScore !== undefined) {
        const threshold = parseInt(options.minScore, 10);
        if (isNaN(threshold) || threshold < 0 || threshold > 100) {
          console.error(chalk.red(`Error: --min-score must be a number between 0 and 100, got "${options.minScore}"`));
          process.exit(1);
        }
        if (result.score < threshold) {
          if (!options.json) {
            console.error(chalk.red(`\n❌ Score ${result.score} is below minimum threshold ${threshold}`));
          }
          process.exit(1);
        }
      }
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();
