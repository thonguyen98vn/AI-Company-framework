---
owner: Architect_Agent
status: INITIALIZED
review_cadence: monthly
last_reviewed: 2026-06-18
staleness_risk: low
---
# SYSTEM ARCHITECTURE

> [!IMPORTANT]
> **AGENT INITIALIZATION PROTOCOL:**
> If this file is `UNINITIALIZED`, the Architect Agent MUST read `.agents/ai-company/strategy.md` and `.agents/ai-founder/VISION_LOCK.md`.
> Propose the foundational Tech Stack (Frontend, Backend, Database, Infrastructure) suited for the strategy.
> Once approved by the Founder, document the architecture here and change status to `INITIALIZED`.

## Tech Stack
- **Governance & Memory Storage**: Text-based Markdown files (`.md`) residing in `.agents/` as the single source of truth for all tools and agents.
- **Command Line Interface (CLI)**: Node.js console application utilizing `commander` for command routing and `inquirer` for interactive scaffolding.
- **Dashboard UI**: Next.js App Router (React) using static/dynamic routes reading from local files for real-time visualization.
- **Documentation**: VitePress static site generator.

## High-Level Architecture
```mermaid
graph TD
    subgraph "Core AI Framework (.agents/)"
        A["ai-founder/ (Vision Lock, Non-Negotiables)"]
        B["ai-company/ (Strategy, Roadmap)"]
        C["ai-runtime/ (STATE_GRAPH.md, EVENTS.md, Handoffs)"]
        D["ai-execution/ (Standards, Architecture)"]
    end
    
    subgraph "Tooling & UI"
        E["create-ai-company CLI"]
        F["Next.js Web Dashboard"]
    end
    
    E -- Reads & Writes --&gt; C
    F -- Reads --&gt; C
    E -- Scaffolds --&gt; Core
```

