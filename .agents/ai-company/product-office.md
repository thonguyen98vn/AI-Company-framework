---
owner: Product_Agent
status: INITIALIZED
review_cadence: weekly
last_reviewed: 2026-06-18
staleness_risk: medium
---
# PRODUCT OFFICE & ROADMAP

> [!IMPORTANT]
> **AGENT INITIALIZATION PROTOCOL:**
> If this file is `UNINITIALIZED`, the Product Agent MUST read `.agents/ai-company/strategy.md`.
> Extract the product-specific strategy and propose an initial Product Roadmap (v1.0) broken down into Milestones.
> Once finalized, change status to `INITIALIZED`.

## Current Roadmap

### Milestone 4: Unified Tooling Integration (Sync CLI/Dashboard)
- **Goal**: Align the CLI, Dashboard, and core framework on a single markdown-based state and event system.
- **Tasks**:
  - [ ] Refactor CLI `state` and `event` commands to read/write Markdown.
  - [ ] Update Dashboard Next.js API router to parse `STATE_GRAPH.md` and `EVENTS.md` dynamically.
  - [ ] Sync update to boilerplate templates.

### Milestone 5: Multi-Agent Local Orchestration
- **Goal**: Formally support local runs with parallel execution of specialized subagents (Coders, Reviewers, Testers) controlled by the event system.
- **Tasks**:
  - [ ] Create `orchestrator` executor to parse `EVENTS.md` and trigger local subagents.
  - [ ] Support parallel execution pipelines.

### Milestone 6: Governance & Automated Audit
- **Goal**: Provide automated auditing tools checking rules defined in `NON_NEGOTIABLES.md` and outputting reports in CI/CD.
- **Tasks**:
  - [ ] Create CLI `audit` command.
  - [ ] Integrate audit execution into GitHub actions.

## Backlog
- [ ] Implement advanced security boundary controls.
- [ ] Add support for domain plugins (Web3, Mobile, GameDev).
- [ ] Build a community plugin registry CLI integration.

