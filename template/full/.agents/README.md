# AI Company Framework V3 Core

An **Operating Framework** that transforms your repository into an "AI-Native Software Company" with autonomous operation capabilities, maintaining strategic alignment and preventing context decay of AI Agents over the long term.

## Core Philosophy
The Framework is not just a collection of prompts or static documentation. It is a true operating system for AI. Every file is a "living entity" containing metadata and **Initialization Protocols** to govern AI Agent behavior.

## How to Embed the Framework into a New Project

To apply the AI Company Framework to any of your projects (SaaS, Game, Web App...), follow these 3 simple steps:

### Step 1: Copy Initialization Script
Copy the `init_framework.ps1` file from this repository and paste it into the root directory of your new project.

### Step 2: Run the Script
Open terminal/powershell at the new project directory and run the command:
```powershell
powershell -ExecutionPolicy Bypass -File init_framework.ps1
```
The script will automatically generate the hidden directories `.ai-founder`, `.ai-company`, `.ai-runtime`, `.ai-execution`, and `reports`, along with files set to the `UNINITIALIZED` state.

### Step 3: Wake up the Agent
Open the project using an AI-powered editor (such as VS Code with Copilot, Cursor, or Windsurf), open the Chat window, and send the first prompt:

> *"Please read `.ai-founder/VISION_LOCK.md` and execute the AGENT INITIALIZATION PROTOCOL."*

Immediately, the AI Agent will understand the "rules of the game", recognize the `UNINITIALIZED` status, and begin interviewing you (the Founder) to gather information. Then, it will automatically propagate to establish the strategic (`.ai-company`) and architectural (`.ai-execution`) layers for your project!

## Directory Structure

- `.ai-founder/`: The "Constitution" and Founder DNA. AI is forbidden from modifying this without permission.
- `.ai-company/`: Governance Layer. Where the Agent acts as C-Level (CTO, Product Manager) to establish strategy and roadmaps.
- `.ai-runtime/`: Memory & Handoff System. Contains the project state and decision rationale, helping Agents maintain an unbroken workflow.
- `.ai-execution/`: The Coding Factory. Contains architecture, coding, testing, and deployment standards.
- `.ai-domains/`: (Optional) Contains domain-specific knowledge plugins (e.g., Trading AI, SaaS, etc.).
- `reports/`: Contains periodic audit reports to prevent Strategic Drift.
