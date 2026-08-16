# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-08-16

### Added
- CI mode: `--min-score <N>` exits with code 1 if score is below threshold
- `returnResult` option for programmatic use
- CI integration examples in README (GitHub Actions, GitLab CI)

### Fixed
- Scoring system: mutually exclusive checks now use group-aware logic
- README example output now matches actual scoring behavior
- All category max points in documentation corrected

### Changed
- README completely rewritten for clarity and impact

## [1.0.0] - 2026-08-16

### Added
- 7-category AI-friendliness check system
- 100-point scoring system with S/A/B/C/D/F grades
- Colored terminal output with progress indicators
- JSON output mode for programmatic use
- Verbose mode for detailed check results
- Actionable recommendations based on score
