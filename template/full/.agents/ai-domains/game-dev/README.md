---
owner: Domain_Agent
review_cadence: monthly
last_reviewed: 2026-06-18
staleness_risk: low
---
# Game Development Domain Preset

This preset configures the AI Company Framework for Game Development.

## Included Standards
By activating this preset, the Execution Agents will default to GameDev-specific best practices:
- **Engine**: Unity (C#) or Godot (GDScript/C#).
- **Architecture**: Entity Component System (ECS) or strictly decoupled MVC for UI vs Gameplay.
- **Assets**: Structured under `Assets/Art`, `Assets/Scripts`, `Assets/Prefabs`, `Assets/Scenes`.
- **Version Control**: Git LFS must be configured for `.png`, `.fbx`, `.wav`, etc.

## How to use
When the Founder Interview occurs, if the Founder mentions building a Game, the system will automatically prioritize the rules from this folder to guide the engineering agents.
