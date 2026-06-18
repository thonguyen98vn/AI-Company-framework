# AI Company Framework Architecture

The framework is structurally divided into five core operational layers within the `.agents` directory. This is designed to separate concerns so that AI Agents (acting as C-level executives, product managers, or engineers) have a clear context boundary.

## 1. `.agents/ai-founder/` (The Constitution)
**Purpose:** Stores the immutable core vision, mission, and non-negotiable constraints of the project.
**Key Files:**
- `VISION_LOCK.md`: The Founder's core intent.
- `NON_NEGOTIABLES.md`: Hard rules (e.g., "Always use TypeScript", "Never use third-party auth").
**Agent Rule:** Agents cannot modify these files after initialization without explicit Founder approval.

## 2. `.agents/ai-company/` (Governance & Strategy)
**Purpose:** Acts as the brain of the company. It decides *what* to build and *why*.
**Key Files:**
- `strategy.md`: Long-term strategy and OKRs.
- `roadmap.md`: Current quarter/month roadmap.
**Agent Role:** Product Manager / CTO.

## 3. `.agents/ai-runtime/` (Memory & Handoff)
**Purpose:** The central nervous system for inter-agent communication and state management.
**Key Files:**
- `STATE_GRAPH.md`: Tracks the high-level project state (`UNINITIALIZED`, `PLANNING`, `EXECUTING`).
- `EVENTS.md`: A log for agents to leave messages or requests for each other.
- `HANDOFF.md`: Short-term session memory. When an agent finishes a session, it writes the exact state here so the next agent can seamlessly resume.
- `PROJECT_STATE.md`: Long-term technical memory.

## 4. `.agents/ai-execution/` (The Factory)
**Purpose:** Stores the rules and standards for *how* things are built.
**Key Files:**
- `architecture.md`: The tech stack and system design.
- `coding_standards.md`: Rules for writing code (linting, patterns).
- `deployment.md`: CI/CD and hosting instructions.
**Agent Role:** Senior Software Engineer / DevOps.

## 5. `.agents/ai-domains/` (Domain Presets)
**Purpose:** Specialized knowledge for specific industries or architectures.
For example, if you are building a SaaS, the `saas` preset will populate the framework with best practices for multi-tenancy, Stripe billing, and Next.js setup.
