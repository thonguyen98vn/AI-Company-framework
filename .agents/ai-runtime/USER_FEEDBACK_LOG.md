---
owner: Product_Manager_Agent
review_cadence: weekly
last_reviewed: 2026-06-18
staleness_risk: high
---
# User Feedback Log

> [!IMPORTANT]
> **FEEDBACK PROTOCOL: VOICE OF THE USER**
> This file is the single source of truth for all user feedback. 
> **Any AI Agent processing user feedback MUST log it here before taking action.**
>
> **Priority Levels:**
> - **P0 (Critical)**: Blocks user workflow or causes data loss → Hotfix immediately
> - **P1 (High)**: Affects many users, clear fix path → Next sprint
> - **P2 (Medium)**: Nice to have, moderate effort → Backlog
> - **P3 (Low)**: Edge case or cosmetic → Icebox

## Feedback Summary (Sprint 6)
- **P0**: Framework loop was missing RELEASING and USER_FEEDBACK states → Fixed by adding 2 new states to STATE_GRAPH.md and creating `user-feedback` skill.
- **P1**: Vietnamese text still present in root `.agents/`, `.cursorrules`, and `docs/` → Fixed by full English translation.
- **P1**: Node 20 deprecated in GitHub Actions → Fixed by upgrading CI/CD to Node 24.

| Date | Source | Category | Priority | Summary | Status | Resolution |
|------|--------|----------|----------|---------|--------|------------|
| 2026-06-18 | Founder Chat | FEATURE_REQUEST | P0 | Framework loop missing User Testing & Feedback phase | RESOLVED | Added RELEASING + USER_FEEDBACK states, created user-feedback skill |
| 2026-06-18 | Founder Chat | BUG | P1 | Vietnamese text remains in root .agents/, .cursorrules, docs/ | RESOLVED | Full English translation of all affected files |
| 2026-06-18 | GitHub Actions | BUG | P1 | Node 20 deprecated, CI/CD failing with cache error | RESOLVED | Updated ci.yml and publish.yml to Node 24, fixed cache-dependency-path |
| 2026-06-18 | Founder Chat | FEATURE_REQUEST | P1 | Need llms.txt and AI SEO optimization for discoverability | RESOLVED | Created llms.txt, llms-full.txt, added AI SEO badge |
