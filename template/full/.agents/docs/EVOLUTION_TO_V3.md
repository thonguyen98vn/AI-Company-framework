This is a concise yet comprehensive summary of the evolution from the initial idea to **AI Company Framework V3 Core**.

# Project Name

```text
AI Company Framework
```

Goal:

```text
Transform a repository into an AI-Native Software Company
capable of:

- self-operation
- self-assessment
- self-improvement
- preventing context decay
- preventing strategic drift

over a long period (18-24+ months)
with multiple different AI agents.
```

---

# Phase 1 — AI Software Company V2

Initially, the framework was designed based on a traditional company model:

```text
.ai-company/

00-vision
01-strategy-office
02-user-council
03-product-office
04-cto-office
05-engineering
06-qa-office
07-security-office
08-growth-office
09-research-lab
10-board-room
```

Philosophy:

```text
AI Agent = employee

Office = department

Governance = company
```

Advantages:

```text
- comprehensive
- easy to understand
- resembles a real company
```

Disadvantages:

```text
- too many files
- heavily governance-focused
- doesn't solve daily workflows
```

---

# Phase 2 — Critical Feedback

A crucial piece of feedback emerged:

```text
Agents are not humans.
```

The Problem:

When an Agent opens a repo, it needs to know:

```text
Where is the project currently?

What is the next task?

What do I need to do right now?
```

While V2 mainly answered:

```text
Why are we doing this?

What should we do?
```

Missing:

```text
State Management
Execution Flow
Session Context
```

---

# Phase 3 — Realizing the 3 Layers

The framework was restructured.

## Layer 1

Governance

Answers:

```text
Why?
What?
Are we on the right path?
```

---

## Layer 2

Runtime

Answers:

```text
Current State
Next Action
Current Sprint
```

---

## Layer 3

Execution

Answers:

```text
How?
```

---

Diagram:

```text
Governance
      ↓
Runtime
      ↓
Execution
```

---

# Phase 4 — Explicit Bridges

Realization:

```text
Layers existing is not enough.

There must be bridges.
```

---

## Bridge A

Governance → Runtime

```text
Product Priorities
        ↓
Current Sprint
```

---

## Bridge B

Runtime → Execution

```text
Tasks
      ↓
Code
```

---

## Bridge C

Execution → Runtime

```text
Code Results
      ↓
Handoff
```

---

## Bridge D

Runtime → Governance

```text
Decisions
      ↓
Board Review
```

---

## Bridge E

Governance Audit Bridge

```text
Board Review
       ↓
Runtime Repair Tasks
```

---

# Phase 5 — Context Decay

An important discovery:

Decay does not only happen in Runtime.

---

## Governance Decay

```text
Vision is unread.

Roadmap is outdated.
```

---

## Runtime Decay

```text
Project State becomes stale.
```

---

## Execution Decay

```text
Coding Standards are ignored.
```

---

New Concept:

```text
Document Lifecycle
```

Every file must have metadata:

```yaml
owner:
review_cadence:
last_reviewed:
staleness_risk:
```

---

# Phase 6 — Strategic Decay

A discovery more dangerous than document decay:

```text
Strategic Decay
```

Meaning:

```text
Every file is fresh.

Every report is green.

But the product is heading in the wrong direction.
```

This became the central problem for the framework to solve.

---

# Phase 7 — CONTEXT_HEALTH

Instead of a single score.

The Framework uses:

## Freshness Score

```text
Is the documentation fresh?
```

---

## Alignment Score

```text
Is it still aligned with the Vision?
```

---

## Confidence Score

```text
How confident is the Agent?
```

---

Additionally:

```text
Agent Assessment
+
Telemetry
+
Board Audit
```

all participate in the evaluation.

---

# Phase 8 — Drift Budget

New Concept:

```text
Drift Budget
```

Example:

```text
Vision Drift Budget = 20

Current Drift = 14
```

Every decision contrary to founder directives:

```text
+1
+2
+3 drift
```

If the threshold is exceeded:

```text
Founder Review Required
```

---

# Phase 9 — Founder Layer

Added the highest layer:

```text
.ai-founder/
```

---

Contains:

```text
VISION_LOCK.md

NON_NEGOTIABLES.md

INVESTMENT_THESES.md
```

---

Role:

```text
Founder DNA

Cannot be violated.
```

---

# Phase 10 — Domain Plugin

A very important discovery:

The Framework should not be tied to a domain.

---

Framework:

```text
AI Company Framework
```

---

Domain:

```text
Trading AI
Club Management
SaaS
E-Commerce
Content Platform
```

---

Conclusion:

```text
The Framework outlives the domain.

Domains are plugins.
```

---

# Phase 11 — V3 Core

Final architecture locked in.

```text
.ai-founder/

.ai-company/

.ai-runtime/

.ai-execution/

.ai-domains/

reports/
```

---

## .ai-founder

```text
VISION_LOCK

NON_NEGOTIABLES

INVESTMENT_THESES
```

---

## .ai-company

```text
vision

strategy

user-council

product-office

cto-office

board-room
```

---

## .ai-runtime

```text
PROJECT_STATE

CURRENT_SPRINT

NEXT_ACTIONS

DECISIONS

BLOCKERS

HANDOFF

CONTEXT_HEALTH
```

---

## .ai-execution

```text
ARCHITECTURE

CODING_STANDARDS

TESTING_STANDARDS

DEPLOYMENT

STACK_GUIDE
```

---

## .ai-domains

```text
trading-ai

club-management

saas
```

---

## reports

```text
board-review

technical-debt

maturity-score

drift-ledger

recovery-plan
```

---

# Phase 12 — Avoiding Overengineering

A final warning:

We started moving towards:

```text
Event System

State Graph

Workflow Engine

Governance Engine
```

But the final decision:

```text
DO NOT BUILD IMMEDIATELY.
```

Reason:

```text
The framework is scaling faster than actual needs.
```

---

# Final Decision

Track A:

```text
Build Now
```

Build:

```text
AI Company Framework V3 Core
```

with approximately:

```text
20-25 files
```

---

Track B:

```text
Future OS Spec
```

Record ideas:

```text
Events
State Graph
Agent Registry
Workflow Engine
```

in:

```text
docs/AI_COMPANY_OS_V4_SPEC.md
```

---

# Final Philosophy

```text
AI Company Framework
is not:

- A Documentation System
- A Prompt Collection
- A Governance Simulator

but rather:

An Operating Framework

that helps AI Agents and Founders
maintain long-term alignment,
prevent context decay,
prevent strategic decay,
and turn strategy into action,
and action into learning.
```
