# Guide: Applying AI Company Framework to an IN-PROGRESS Project

If you received this framework (as a ZIP file) and want to embed it into a project that is **currently in progress** (already has source code, architecture, database...), please follow these steps.

The biggest difference between a new project and an in-progress project is: The AI Agent needs to "Reverse-engineer" what you have done to incorporate it into the Framework.

---

### Step 1: Extract and Embed the Framework
1. Extract the ZIP file you received.
2. Copy the `init_framework.ps1` file and paste it directly into the root directory of your in-progress project.
3. Open a terminal/powershell in that project and run the command:
   ```powershell
   powershell -ExecutionPolicy Bypass -File init_framework.ps1
   ```
   *This command will NOT overwrite your current code; it only creates the hidden directories `.ai-founder`, `.ai-company`, `.ai-runtime`, `.ai-execution`...*

---

### Step 2: "Catch-up Protocol"
Open the project using an AI IDE (Cursor, VS Code Copilot, Windsurf, etc.). The system is currently in the `UNINITIALIZED` state.

Instead of just answering basic questions, send the AI the following prompt:

> *"I have just installed the AI Company Framework. This is a project that already has code. Please scan the entire directory structure and my current source code to understand the context. Then, execute the AGENT INITIALIZATION PROTOCOL in the `.ai-founder/VISION_LOCK.md` file. Based on the code you just read, suggest a Mission and Target Audience for me to approve."*

At this point, the AI will read your existing code and automatically draft a vision closest to reality for your approval.

---

### Step 3: Architecture Reverse-Engineering
After establishing the Founder DNA, ask the AI to update the Execution Layer:

> *"Go to the `.ai-execution/ARCHITECTURE.md` file. Do NOT propose a new Tech Stack; instead, analyze the current code and document the Tech Stack, Database, and Directory Structure that I am CURRENTLY using. Then change the status to `INITIALIZED`."*

This step prevents the AI from proposing unrealistic technologies, ensuring it strictly adheres to what the in-progress project is currently using.

---

### Step 4: Transition Work to the Runtime Layer
This is the decisive step to run your project using the Framework:

1. **Gather Tasks:** Send the AI a list of bugs and features you are currently working on (you can pull this from Jira, Trello, or your memory).
2. **Request:** *"Please update all these pending tasks into `.ai-runtime/PROJECT_STATE.md` and select the 3 most important ones to put into `.ai-runtime/CURRENT_SPRINT.md`."*

---

### Step 5: Daily Operations
From this point forward, your in-progress project is officially "digitized" into the AI Company Framework.

Every morning when you turn on your computer, simply open the `.ai-runtime/HANDOFF.md` file and type:
> *"I want to continue working. Where did we stop yesterday, and what is the next task?"*

The Framework will automatically maintain your workflow continuously from day to day, month to month, without ever getting lost!
