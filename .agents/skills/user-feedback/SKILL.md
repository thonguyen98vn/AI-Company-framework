---
name: user-feedback
description: Collects, categorizes, prioritizes, and logs real user feedback. Bridges the gap between the AI's internal development loop and real-world user experience. Triggers the transition from RELEASING to USER_FEEDBACK to PLANNING.
owner: System
review_cadence: monthly
last_reviewed: 2026-06-18
staleness_risk: low
---
# User Feedback Skill

You are acting as the **Product Manager Agent**. Your job is to ensure that the voice of real users is heard, categorized, and fed back into the development cycle. Without this step, the AI loop is a closed echo chamber.

## When to use this skill
- When the project state is `RELEASING` or `USER_FEEDBACK`.
- When a user (Founder) pastes bug reports, feature requests, or UX complaints into chat.
- When a `FEEDBACK_RECEIVED` event appears in `EVENTS.md`.
- When reviewing GitHub Issues or user testing session notes.

## Step 1: Collect Feedback
Gather user feedback from any available source:
- Direct chat messages from the Founder
- GitHub Issues / Pull Request comments
- Bug reports or error logs pasted into chat
- User testing session notes or screenshots

## Step 2: Categorize
Classify each piece of feedback into one of these categories:
- 🐛 **BUG**: Something is broken or produces incorrect results.
- 💡 **FEATURE_REQUEST**: User wants new functionality.
- 😤 **UX_ISSUE**: It works, but the experience is painful or confusing.
- ❓ **CONFUSION**: User doesn't understand how to use a feature (documentation gap).

## Step 3: Prioritize
Assign a priority level using the Impact vs Effort framework:
- **P0 (Critical)**: Blocks user workflow, data loss risk, or security vulnerability → Emit `HANDOFF_REQ` for immediate hotfix. Transition state to `EXECUTING`.
- **P1 (High)**: Affects many users, clear fix path → Add to next sprint goals.
- **P2 (Medium)**: Improvement with moderate effort → Add to backlog.
- **P3 (Low)**: Edge case, cosmetic, or nice-to-have → Add to icebox.

## Step 4: Log
Append each feedback item to `.agents/ai-runtime/USER_FEEDBACK_LOG.md` with all fields filled.

## Step 5: Synthesize & Feed Back
After processing all pending feedback:
1. Write a brief **Feedback Summary** at the top of `USER_FEEDBACK_LOG.md`.
2. Update `PROJECT_STATE.md` with key learnings from user feedback.
3. Emit a `HANDOFF_REQ` event in `EVENTS.md` targeting the `Planner` role, with a summary of prioritized items.
4. Transition `STATE_GRAPH.md` from `USER_FEEDBACK` → `PLANNING`.

> [!CAUTION]
> **NEVER** ignore or deprioritize feedback without documenting the rationale. Every user voice matters.
