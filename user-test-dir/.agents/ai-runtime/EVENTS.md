# EVENT PROTOCOL

The Event System allows AI Agents to asynchronously communicate, trigger audits, or hand off responsibilities without losing context.

## How to emit an Event
To emit an event, an Agent must append a new entry to the `Event Log` below.
When reading this file, Agents should check for any unacknowledged events directed at them.

## Event Types
- `HANDOFF_REQ`: Requesting another agent role (e.g., Architect -> Coder) to take over the session.
- `AUDIT_REQ`: Requesting an alignment or security audit.
- `USER_BLOCK`: The system is blocked and requires Founder (User) input.

## Event Log
| Timestamp | Event Type | Emitter Role | Target Role | Description | Status |
|-----------|------------|--------------|-------------|-------------|--------|
| 2026-06-18 | `INIT` | `System` | `All` | Framework initialized | `ACKNOWLEDGED` |
| 2026-06-18 | `HANDOFF_REQ` | `System` | `All` | State transitioned from UNINITIALIZED to PLANNING. Reason: Automated transition | `ACKNOWLEDGED` |
