# How We Turned Cursor & Claude into a Full Virtual Company

*By The AI Company Framework Team*

Agentic coding is the future, but right now, we are all using it wrong. We treat LLMs like extremely fast junior developers that we have to babysit. What if we treated them like a company?

Enter **AI Company Framework V3**.

## The Problem with Prompts
When you open Cursor or Copilot, you usually start typing: "Create a Next.js app with Tailwind". The AI complies. Then you ask it to add authentication. It complies. But as the project grows, the AI loses context. It forgets your architecture. It overwrites working code.

## The Solution: A Virtual `.agents` Directory
We built a framework that scaffolds an `.agents/` folder into your repository. This folder acts as the "brain" and "office" for your AI.

### 1. The Founder Interview
Instead of guessing what you want, the AI intercepts your first message and conducts a PM-style interview. It locks your vision into `VISION_LOCK.md`.

### 2. Standard Operating Procedures (Skills)
Just like a real company, our framework has SOPs. The Architect agent knows to read `.agents/skills/orchestrator/SKILL.md` when breaking down epics. The QA agent knows to read `.agents/skills/audit-agent/SKILL.md` before approving code.

### 3. Asynchronous Handoffs
We introduced `STATE_GRAPH.md` and `EVENTS.md`. An Architect can plan a feature, emit a `HANDOFF_REQ` event, and the Coder agent will pick it up on the next context window.

## The Live Dashboard
To make this tangible, V3 includes a local Next.js Dashboard. You can watch your AI agents transition states from `PLANNING` to `EXECUTING`, and see their internal event logs in real-time.

## Try It Today
```bash
npx create-ai-company my-virtual-company
```
Stop writing prompts. Start managing your AI Company.
