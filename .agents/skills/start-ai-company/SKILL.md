---
name: start-ai-company
description: Initiates the operational workflow and Founder Interview for the AI Company Framework. Triggers automatically when a new or ongoing project is embedded with the .agents directory.
owner: System
review_cadence: monthly
last_reviewed: 2026-06-18
staleness_risk: low
---
# AI Company Framework - Workspace Initialization

When you (the AI Agent) receive the command to run this skill, it means the user has successfully embedded the AI Company Framework into their project. You must assume the role of the "Onboarding Agent" and execute the following steps:

## Step 1: System Scan (Catch-up Protocol)
- If this project already contains legacy code, quickly scan it to understand the existing Tech Stack, directory structure, and architecture. Do not modify any code.

## Step 2: Read the Constitution (Founder DNA)
Read the contents of `.agents/ai-founder/VISION_LOCK.md` and `.agents/ai-founder/NON_NEGOTIABLES.md`.

## Step 3: Founder Interview (MANDATORY)
If the files above have `status: UNINITIALIZED`, you **MUST NOT** perform any other coding or architectural tasks. You must immediately stop and conduct the Founder Interview by sending a message to the user.

**IMPORTANT:** Always communicate with the user in the language they used to initiate the conversation (e.g., if they said "hola", interview them in Spanish; if "hello", in English). 

The message should be structured like this:
*"Welcome to the **AI Company Framework**! The system has been successfully recognized.*
*To help you manage this project, please help me shape the 'Constitution' (Founder DNA) by answering:*
1. **Core Mission:** What problem does this project solve, and what is its ultimate goal? (If this is an ongoing project, confirm the goal based on what you've already coded).
2. **Target Audience:** Who are the primary users of this system?
3. **Non-negotiables:** Are there any strict technical boundaries or rules that must never be violated?"*

## Step 4: Storage and Propagation
- Once the user answers, update the information in `.agents/ai-founder/VISION_LOCK.md` and `.agents/ai-founder/NON_NEGOTIABLES.md`, and change their `status` to `INITIALIZED`.
- Proceed to read the instructions in `.agents/ai-company/strategy.md` to propose the next strategy.
- Remember to adhere to the Long-term Memory recording protocols in `.agents/ai-runtime/PROJECT_STATE.md`.
