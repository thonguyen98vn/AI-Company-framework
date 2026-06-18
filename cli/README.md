# create-ai-company

The official CLI tool to scaffold an **AI Company Framework V3** project. 

## What is AI Company Framework?

AI Company Framework is an OS-level paradigm shift for agentic coding. Rather than relying on simple AI prompts, this framework initializes an entire virtual "company" structure directly inside your code repository. It guides AI agents (Cursor, Windsurf, Copilot, Cline, Antigravity) to act as autonomous developers, PMs, and domain experts.

## Usage

```bash
npx create-ai-company my-awesome-project
cd my-awesome-project
```

Once initialized, simply open the folder in your favorite AI IDE (Cursor, Windsurf, Copilot) and type:

> "hello"

The AI Agent will automatically read the framework rules and start the **Founder Interview** to gather your requirements!

## Supported AI Environments

Out of the box, `create-ai-company` generates instructions for:
- 🖱️ **Cursor** (`.cursorrules`)
- 🏄 **Windsurf** (`.windsurfrules`)
- 🐙 **GitHub Copilot / Codex** (`.github/copilot-instructions.md`, `.codexrules`)
- 🤖 **Claude Code** (`.clauderules`)
- 🚀 **Gemini Advanced Agents / Antigravity** (`.agents/AGENTS.md`)

## Features

- **Automated Scaffolding:** Sets up the `.agents/` intelligence directory.
- **State Management:** Includes `STATE_GRAPH.md` to track project lifecycles.
- **Event System:** Includes `EVENTS.md` for cross-agent asynchronous communication.
- **Domain Presets:** Supports SaaS, Data Science, Web3, GameDev, and Mobile App defaults out of the box.

## License
MIT
