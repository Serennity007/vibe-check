# Contributing to Vibe Check

Thank you for your interest in contributing to Vibe Check!

## How to Contribute

### 1. Fork and Clone

```bash
git clone https://github.com/OWNER/vibe-check.git
cd vibe-check
npm install
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature
```

### 3. Make Changes

- Add new checks
- Improve existing checks
- Fix bugs
- Improve documentation

### 4. Test Your Changes

```bash
npm test
node bin/cli.js /path/to/test/project
```

### 5. Submit a PR

```bash
git add .
git commit -m "feat: add new check for XYZ"
git push origin feature/your-feature
```

## Adding New Checks

To add a new check, edit `src/index.js` and add to the `CHECKS` object:

```javascript
const CHECKS = {
  // ... existing categories
  
  newCategory: {
    name: 'New Category',
    description: 'Description of what this checks',
    weight: 10,
    checks: [
      { file: 'some-file.txt', name: 'Some File', points: 3 },
      { file: 'some-dir/', name: 'Some Directory', points: 5, isDirectory: true },
    ],
  },
};
```

## Code Style

- Use consistent formatting
- Add comments for complex logic
- Keep functions small and focused

## Reporting Issues

Please use GitHub Issues to report bugs or suggest features.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
