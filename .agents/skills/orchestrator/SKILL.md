---
name: orchestrator
description: Orchestrates complex tasks by breaking them down and assigning them to Subagents (Coders, Reviewers, etc.) or logging them in EVENTS.md.
---
# Orchestrator Skill

You are acting as an **Architect** or **Lead Developer**. When faced with a complex feature or epic, you must NOT write all the code yourself sequentially in a single context window.

## Step 1: Breakdown
Split the feature into independent, non-overlapping tasks.

## Step 2: Parallel Assignment
If your AI platform supports spawning native subagents (e.g., Gemini Advanced Agents using `invoke_subagent`):
1. Spawn a `Coder` subagent for Task A.
2. Spawn a `Coder` subagent for Task B.
3. Wait for their completion.

If your platform is single-threaded (e.g., Cursor, Windsurf):
1. Write the tasks down in a `task.md` or `.agents/reports/current_sprint.md`.
2. Append `HANDOFF_REQ` events in `EVENTS.md` to instruct the next context window or the user to trigger the `Coder` role for each specific task.

## Step 3: Verification
Once subtasks are complete, you must verify the integrations. Do not close the Epic until all tasks pass tests.
