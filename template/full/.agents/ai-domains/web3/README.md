---
owner: Domain_Agent
review_cadence: monthly
last_reviewed: 2026-06-18
staleness_risk: low
---
# Web3 / Blockchain Domain Preset

This preset configures the AI Company Framework for building Web3 and Blockchain projects (DApps, Smart Contracts).

## Included Standards
By activating this preset, the Execution Agents will default to Web3-specific best practices:
- **Smart Contracts**: Solidity (0.8.20+), OpenZeppelin standards.
- **Framework**: Hardhat or Foundry for testing and deployment.
- **Frontend**: Next.js with Wagmi and viem for wallet connections.
- **Security**: Slither for static analysis. **CRITICAL:** All state-changing functions must have Reentrancy guards.

## How to use
When the Founder Interview occurs, if the Founder mentions building a Web3 project, DApp, or Smart Contract, the system will automatically prioritize the rules from this folder to guide the engineering agents.
