# EVENT PROTOCOL

The Event System allows AI Agents to asynchronously communicate, trigger audits, or hand off responsibilities without losing context.

## How to emit an Event
To emit an event, an Agent must append a new entry to the `Event Log` below.
When reading this file, Agents should check for any unacknowledged events directed at them.

## Event Types
- `HANDOFF_REQ`: Requesting another agent role (e.g., Architect -> Coder) to take over the session.
- `AUDIT_REQ`: Requesting an alignment or security audit.
- `USER_BLOCK`: The system is blocked and requires Founder (User) input.
- `RELEASE_REQ`: Requesting deployment/release of the current build.
- `FEEDBACK_RECEIVED`: A user has submitted feedback (bug, feature request, UX issue). Must include category and priority.

## Event Log
| Timestamp | Event Type | Emitter Role | Target Role | Description | Status |
|-----------|------------|--------------|-------------|-------------|--------|
| 2026-06-18 | `INIT` | `System` | `All` | Framework initialized | `ACKNOWLEDGED` |
| 2026-06-18 | `RELEASE_REQ` | `Architect` | `PM` | V3.0.0 released with English Standardization, AI SEO, and Bulletproof CLI | `ACKNOWLEDGED` |
| 2026-06-18 | `FEEDBACK_RECEIVED` | `Founder` | `PM` | User feedback: Missing User Feedback loop in framework architecture. Category: FEATURE_REQUEST, Priority: P0 | `ACKNOWLEDGED` |
| 2026-06-18 | `FEEDBACK_RECEIVED` | `Founder` | `PM` | User feedback: Vietnamese text still present in root .agents/, .cursorrules, docs/. Category: BUG, Priority: P1 | `ACKNOWLEDGED` |
| 2026-06-18 | `HANDOFF_REQ` | `PM` | `Planner` | Feedback processed. P0: Add RELEASING+USER_FEEDBACK states. P1: Complete English standardization. Feed into next PLANNING cycle. | `ACKNOWLEDGED` |
| 2026-06-18 | `HANDOFF_REQ` | `Planner` | `Coder` | Transitioned to PLANNING state. Initializing roadmap and architecture. | `ACKNOWLEDGED` |
| 2026-06-18 | `HANDOFF_REQ` | `System` | `All` | State transitioned from PLANNING to EXECUTING. Reason: Ready to build features | `ACKNOWLEDGED` |
| 2026-06-18 | `HANDOFF_REQ` | `System` | `All` | State transitioned from EXECUTING to PLANNING. Reason: Continuing verification | `ACKNOWLEDGED` |
| 2026-06-18 | `AUDIT_REQ` | `PM` | `audit-agent` | Requesting codebase audit | `ACKNOWLEDGED` |
| 2026-06-18 | `HANDOFF_REQ` | `System` | `All` | State transitioned from AUDITING to PLANNING. Reason: Verification completed | `ACKNOWLEDGED` |
| 2026-06-18 | `TEST_PASS` | `Tester_Agent` | `All` | Automated test suite passed successfully. | `ACKNOWLEDGED` |
