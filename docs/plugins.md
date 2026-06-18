# Plugin Ecosystem

The AI Company Framework is highly extensible. Developers can create custom "Domain Presets" or "Agent Skills" and share them with the community.

## Creating a Domain Preset

A Domain Preset is simply a folder inside `.agents/ai-domains/`. To create one:
1. Create a new folder (e.g., `.agents/ai-domains/ecommerce`).
2. Add a `README.md` defining the specific rules, frameworks, and architectural constraints for your domain.
3. The Architect Agent will automatically read this if the Founder mentions "ecommerce" in the Interview.

## Creating an Agent Skill

Skills are `.md` files in `.agents/skills/`. To build a custom skill:
1. Create a file, e.g., `.agents/skills/database-optimizer/SKILL.md`.
2. Define the exact trigger (When to use this skill).
3. Provide step-by-step Standard Operating Procedures (SOPs) for the AI to follow.

## Sharing Plugins

Currently, plugins can be shared by simply providing the Markdown files on GitHub. In the future, `create-ai-company` will support fetching community plugins directly via a registry.
