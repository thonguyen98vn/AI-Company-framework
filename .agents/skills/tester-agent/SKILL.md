---
name: tester-agent
description: Runs the codebase tests and logs test pass/fail reports.
review_cadence: daily
last_reviewed: 2026-06-19
---
# tester-agent Skill

This skill governs the automated running of codebase test suites.

## How to execute tests
1. Run command: `node cli/bin/create-ai-company.js test`
2. If tests pass, emit event: `TEST_PASS`
3. If tests fail, emit event: `TEST_FAIL`
