---
name: event-handler
description: Handles transitions in STATE_GRAPH.md and processes messages in EVENTS.md. Run this skill when you need to change project states or when you see unacknowledged events in the Event Log.
---
# Event Handler Skill

This skill allows you (the AI Agent) to safely navigate the Track B Event System. The Event System is the central nervous system of the AI Company Framework, allowing async communication between agents and tracking the high-level project lifecycle.

## When to use this skill
1. You have completed a major milestone and need to change the project's overall status (e.g., from `PLANNING` to `EXECUTING`).
2. You need to request an Audit (e.g., `AUDIT_REQ`).
3. You need to hand off context to another agent role (e.g., `HANDOFF_REQ`).
4. You are blocked by the user and need to emit a `USER_BLOCK` event.

## Step 1: Read the current state
Always start by reading `.agents/ai-runtime/STATE_GRAPH.md` and `.agents/ai-runtime/EVENTS.md`.

## Step 2: State Transitions
If you are transitioning the state, you must:
1. Ensure the new state is valid according to `STATE_GRAPH.md`.
2. Update the **STATUS** field in `STATE_GRAPH.md`.
3. Update the **status** frontmatter in `.agents/ai-runtime/HANDOFF.md`.
4. Add a log entry in `EVENTS.md` explaining the transition.

## Step 3: Emitting Events
If you are requesting a handoff or audit, append a row to the `Event Log` table in `EVENTS.md`.
The format is:
`| [YYYY-MM-DD] | [Event Type] | [Your Role] | [Target Role] | [Description] | UNACKNOWLEDGED |`

Once you emit an event (like a Handoff), you should instruct the user to trigger the target agent, or if you have autonomous capabilities, trigger the subagent directly.

## Step 4: Acknowledging Events
If you see an event in `EVENTS.md` targeted at your role with the status `UNACKNOWLEDGED`, you should process it. Once you have read and understood the event, change its status in the file to `ACKNOWLEDGED`.
