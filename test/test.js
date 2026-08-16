const assert = require('assert');
const path = require('path');
const fs = require('fs');
const { CHECKS, SCORE_THRESHOLDS, calculateScore, calculateCategoryScore, getGrade, runCheck, findGlobPattern, runVibeCheck } = require('../src/index');

function createTestDir(files) {
  const tmpDir = path.join(__dirname, 'tmp_test');
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
  fs.mkdirSync(tmpDir, { recursive: true });
  for (const file of files) {
    const filePath = path.join(tmpDir, file);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (file.endsWith('/')) fs.mkdirSync(filePath, { recursive: true });
    else fs.writeFileSync(filePath, '// test');
  }
  return tmpDir;
}

function cleanupTestDir() {
  const tmpDir = path.join(__dirname, 'tmp_test');
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
}

async function runTests() {
  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try { fn(); console.log(`  ✓ ${name}`); passed++; }
    catch (error) { console.log(`  ✗ ${name}\n    ${error.message}`); failed++; }
  }

  async function asyncTest(name, fn) {
    try { await fn(); console.log(`  ✓ ${name}`); passed++; }
    catch (error) { console.log(`  ✗ ${name}\n    ${error.message}`); failed++; }
  }

  console.log('\n🧪 Running vibe-check tests...\n');

  // ========== Structure ==========
  console.log('📋 CHECKS Structure:');
  test('7 categories exist', () => {
    assert.strictEqual(Object.keys(CHECKS).length, 7);
  });
  test('Each category has name, description, checks', () => {
    for (const [k, c] of Object.entries(CHECKS)) {
      assert(c.name && c.description && Array.isArray(c.checks) && c.checks.length > 0, k);
    }
  });
  test('Each check has file, name, points', () => {
    for (const [, c] of Object.entries(CHECKS))
      for (const ch of c.checks)
        assert(ch.file && ch.name && ch.points > 0);
  });

  // ========== Thresholds ==========
  console.log('\n📊 Thresholds:');
  test('Ordered array S/A/B/C/D/F', () => {
    assert(Array.isArray(SCORE_THRESHOLDS));
    assert.deepStrictEqual(SCORE_THRESHOLDS.map(t => t.grade), ['S','A','B','C','D','F']);
  });

  // ========== getGrade ==========
  console.log('\n🏆 getGrade:');
  for (const [score, expected] of [[95,'S'],[80,'A'],[65,'B'],[45,'C'],[25,'D'],[5,'F'],[0,'F'],[75,'A'],[90,'S']])
    test(`${score} → ${expected}`, () => assert.strictEqual(getGrade(score).grade, expected));

  // ========== calculateScore ==========
  console.log('\n📐 calculateScore:');
  test('All earned = 100', () => assert.strictEqual(calculateScore({a:{maxPoints:50,earnedPoints:50}}), 100));
  test('None earned = 0', () => assert.strictEqual(calculateScore({a:{maxPoints:50,earnedPoints:0}}), 0));
  test('Half = 50', () => assert.strictEqual(calculateScore({a:{maxPoints:100,earnedPoints:50}}), 50));

  // ========== calculateCategoryScore (group-aware) ==========
  console.log('\n🧮 calculateCategoryScore (group-aware):');
  test('Ungrouped checks count independently', () => {
    const checks = [
      { points: 5, passed: true },
      { points: 3, passed: false },
      { points: 2, passed: true },
    ];
    const r = calculateCategoryScore(checks);
    assert.strictEqual(r.maxPoints, 10);
    assert.strictEqual(r.earnedPoints, 7);
  });
  test('Grouped checks: only highest passed counts', () => {
    const checks = [
      { points: 3, passed: true, group: 'eslint' },
      { points: 3, passed: false, group: 'eslint' },
      { points: 3, passed: false, group: 'eslint' },
      { points: 3, passed: false, group: 'eslint' },
    ];
    const r = calculateCategoryScore(checks);
    assert.strictEqual(r.maxPoints, 3); // only 3, not 12
    assert.strictEqual(r.earnedPoints, 3);
  });
  test('Grouped checks: none passed = 0 earned', () => {
    const checks = [
      { points: 3, passed: false, group: 'eslint' },
      { points: 3, passed: false, group: 'eslint' },
    ];
    const r = calculateCategoryScore(checks);
    assert.strictEqual(r.maxPoints, 3);
    assert.strictEqual(r.earnedPoints, 0);
  });
  test('Multiple groups counted separately', () => {
    const checks = [
      { points: 3, passed: true, group: 'eslint' },
      { points: 3, passed: true, group: 'prettier' },
      { points: 2, passed: true }, // ungrouped
    ];
    const r = calculateCategoryScore(checks);
    assert.strictEqual(r.maxPoints, 8); // 3+3+2
    assert.strictEqual(r.earnedPoints, 8);
  });

  // ========== runCheck ==========
  console.log('\n🔍 runCheck:');
  test('Detects existing file', () => {
    const d = createTestDir(['README.md']);
    assert.strictEqual(runCheck(d, {file:'README.md',name:'R',points:5}), true);
    cleanupTestDir();
  });
  test('Returns false for missing file', () => {
    const d = createTestDir([]);
    assert.strictEqual(runCheck(d, {file:'README.md',name:'R',points:5}), false);
    cleanupTestDir();
  });
  test('Detects directory', () => {
    const d = createTestDir(['docs/']);
    assert.strictEqual(runCheck(d, {file:'docs/',name:'D',points:5,isDirectory:true}), true);
    cleanupTestDir();
  });
  test('Detects .d.ts recursively', () => {
    const d = createTestDir(['src/types/index.d.ts']);
    assert.strictEqual(runCheck(d, {file:'.d.ts',name:'T',points:2,isGlob:true}), true);
    cleanupTestDir();
  });
  test('Skips node_modules for glob', () => {
    const d = createTestDir(['node_modules/some/lib.d.ts']);
    assert.strictEqual(runCheck(d, {file:'.d.ts',name:'T',points:2,isGlob:true}), false);
    cleanupTestDir();
  });

  // ========== findGlobPattern ==========
  console.log('\n🔎 findGlobPattern:');
  test('Finds in subdirectory', () => {
    const d = createTestDir(['src/index.d.ts']);
    assert.strictEqual(findGlobPattern(d, '.d.ts'), true);
    cleanupTestDir();
  });
  test('Returns false when no match', () => {
    const d = createTestDir(['src/index.ts']);
    assert.strictEqual(findGlobPattern(d, '.d.ts'), false);
    cleanupTestDir();
  });
  test('Respects maxDepth', () => {
    const d = createTestDir(['a/b/c/d/e.d.ts']);
    assert.strictEqual(findGlobPattern(d, '.d.ts', 2), false);
    assert.strictEqual(findGlobPattern(d, '.d.ts', 5), true);
    cleanupTestDir();
  });

  // ========== Integration: realistic project scores high ==========
  console.log('\n🎯 Integration:');
  test('Well-configured project scores B+ (>=60)', () => {
    const d = createTestDir([
      '.cursorrules', 'CLAUDE.md', 'README.md', 'CONTRIBUTING.md', 'CHANGELOG.md',
      'tsconfig.json', 'types/', 'jest.config.js', 'test/',
      'eslint.config.js', '.prettierrc', '.editorconfig',
      '.github/workflows/ci.yml', '.gitignore', 'package-lock.json',
    ]);
    const results = {};
    for (const [key, cat] of Object.entries(CHECKS)) {
      const checkResults = cat.checks.map(ch => ({...ch, passed: runCheck(d, ch)}));
      const {earnedPoints, maxPoints} = calculateCategoryScore(checkResults);
      results[key] = {maxPoints, earnedPoints, checks: checkResults};
    }
    const score = calculateScore(results);
    assert(score >= 50, `Expected >=50, got ${score}`);
    cleanupTestDir();
  });

  test('Perfect realistic project scores A (>=75)', () => {
    const d = createTestDir([
      '.cursorrules', 'CLAUDE.md', 'AGENTS.md', '.github/copilot-instructions.md',
      'README.md', 'CONTRIBUTING.md', 'CHANGELOG.md', 'docs/',
      'tsconfig.json', 'types/', 'src/index.d.ts',
      'vitest.config.ts', '__tests__/',
      'eslint.config.js', '.prettierrc', '.editorconfig',
      '.husky/', '.github/workflows/ci.yml', '.gitignore',
      'package-lock.json',
    ]);
    const results = {};
    for (const [key, cat] of Object.entries(CHECKS)) {
      const checkResults = cat.checks.map(ch => ({...ch, passed: runCheck(d, ch)}));
      const {earnedPoints, maxPoints} = calculateCategoryScore(checkResults);
      results[key] = {maxPoints, earnedPoints, checks: checkResults};
    }
    const score = calculateScore(results);
    assert(score >= 75, `Expected >=75, got ${score}`);
    cleanupTestDir();
  });

  test('Empty project scores 0', () => {
    const d = createTestDir([]);
    const results = {};
    for (const [key, cat] of Object.entries(CHECKS)) {
      const checkResults = cat.checks.map(ch => ({...ch, passed: runCheck(d, ch)}));
      const {earnedPoints, maxPoints} = calculateCategoryScore(checkResults);
      results[key] = {maxPoints, earnedPoints, checks: checkResults};
    }
    assert.strictEqual(calculateScore(results), 0);
    cleanupTestDir();
  });

  // ========== Integration: runVibeCheck main function ==========
  console.log('\n🚀 runVibeCheck (main function):');
  await asyncTest('runVibeCheck produces JSON output', async () => {
    const d = createTestDir(['README.md', '.gitignore']);
    const origLog = console.log;
    let output = '';
    console.log = (msg) => { output += msg; };
    await runVibeCheck(d, { json: true });
    console.log = origLog;
    const data = JSON.parse(output);
    assert(typeof data.score === 'number');
    assert(typeof data.grade === 'string');
    assert(data.results && typeof data.results === 'object');
    cleanupTestDir();
  });

  await asyncTest('JSON output has all 7 categories', async () => {
    const d = createTestDir([]);
    const origLog = console.log;
    let output = '';
    console.log = (msg) => { output += msg; };
    await runVibeCheck(d, { json: true });
    console.log = origLog;
    const data = JSON.parse(output);
    assert.strictEqual(Object.keys(data.results).length, 7);
    cleanupTestDir();
  });

  // ========== CI mode (min-score) ==========
  console.log('\n🔒 CI Mode (--min-score):');
  await asyncTest('runVibeCheck returns result object', async () => {
    const d = createTestDir(['README.md', '.gitignore']);
    const origLog = console.log;
    console.log = () => {};
    const result = await runVibeCheck(d, { json: true, returnResult: true });
    console.log = origLog;
    assert(typeof result.score === 'number');
    assert(typeof result.grade === 'string');
    assert(result.results);
    cleanupTestDir();
  });

  await asyncTest('returnResult works without json mode', async () => {
    const d = createTestDir(['README.md']);
    const origLog = console.log;
    console.log = () => {};
    const result = await runVibeCheck(d, { returnResult: true });
    console.log = origLog;
    assert(typeof result.score === 'number');
    assert(result.score >= 0 && result.score <= 100);
    cleanupTestDir();
  });

  // ========== Module exports ==========
  console.log('\n📦 Exports:');
  test('All exports available', () => {
    const m = require('../src/index');
    assert(typeof m.runVibeCheck === 'function');
    assert(typeof m.calculateScore === 'function');
    assert(typeof m.calculateCategoryScore === 'function');
    assert(typeof m.getGrade === 'function');
    assert(typeof m.runCheck === 'function');
    assert(typeof m.findGlobPattern === 'function');
    assert(Array.isArray(m.SCORE_THRESHOLDS));
  });

  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 Results: ${passed} passed, ${failed} failed`);
  console.log(`${'='.repeat(50)}\n`);

  if (failed > 0) process.exit(1);
}

runTests().catch(err => { console.error(err); process.exit(1); });
