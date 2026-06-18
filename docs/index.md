---
layout: home

hero:
  name: "AI Company Framework"
  text: "Turn your IDE into a virtual AI company"
  tagline: The productivity optimization solution for Agentic AI coding (Cursor, Copilot, Antigravity)
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/thonguyen98vn/AI-Company-framework
---

Welcome to the official documentation for the **AI Company Framework V3**.

## What is this?
The AI Company Framework is an OS-level paradigm shift for agentic coding. Instead of relying on raw prompts for Cursor, Copilot, or Gemini, this framework builds an entire virtual "company" inside your `.agents` folder. It guides AI agents to act as autonomous developers, PMs, and domain experts.

## Key Concepts
1. **The Founder Interview:** When you start a new project, the AI acts as a PM and interviews you to extract your vision into `VISION_LOCK.md`.
2. **State Machine:** Projects progress through strict stages (`UNINITIALIZED`, `PLANNING`, `EXECUTING`, `AUDITING`, `RELEASING`, `USER_FEEDBACK`) defined in `STATE_GRAPH.md`.
3. **Event System:** Agents communicate asynchronously using an Event Log (`EVENTS.md`), allowing them to hand off tasks (e.g., from an Architect to a Coder).
4. **User Feedback Loop:** Real user feedback is collected, categorized, and prioritized before feeding back into the next planning cycle.
5. **Agent Skills:** Reusable `.md` files that act as standard operating procedures for the AI.

Ready? Head over to [Getting Started](./getting-started.md).
