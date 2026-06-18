# AI Company Framework V3

[![NPM Version](https://img.shields.io/npm/v/create-ai-company.svg)](https://www.npmjs.com/package/create-ai-company)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docs](https://img.shields.io/badge/docs-vitepress-blue)](https://thonguyen98vn.github.io/AI-Company-framework/)
[![llms.txt](https://img.shields.io/badge/llms.txt-AI_Optimized-purple.svg)](/llms.txt)

Welcome to the **AI Company Framework V3**. This framework turns any software repository into a self-governing, autonomous "AI-Native Company". 

By establishing a structured hierarchy of **Governance**, **Memory**, and **Execution**, it allows AI Agents (like Cursor, GitHub Copilot, Cline, or Antigravity) to act as your C-level executives, product managers, and engineers without losing context or drifting from your original vision.

## 🌟 Why this Framework?
Standard AI tools lose context over long sessions. They don't know the difference between a minor feature tweak and a core architectural change. This framework introduces:
- **Founder DNA:** Hard-coded vision and non-negotiables that the AI cannot alter.
- **State & Event Systems:** Agents can "hand off" tasks to other agents asynchronously.
- **Continuous Memory:** A built-in mechanism for the AI to leave notes for itself.
- **Auto-Trigger Onboarding:** The AI intercepts the very first message and interviews you (the Founder) to set up the company.

## 🚀 Quick Start

The fastest way to initialize the framework in your project is via NPM:

```bash
npx create-ai-company@latest
```

*(You can also run it inside an existing project to inject the `.agents` brain without overwriting your code!)*

### Next Steps:
1. Open your project in an AI-powered IDE (Cursor, VSCode with Copilot).
2. Open the AI Chat and type: `hello`.
3. The Agent will intercept your request and begin the **Founder Interview**.
4. Answer the questions to shape the `VISION_LOCK.md`.

## 📂 Architecture

The framework operates via the `.agents` directory:
- `.agents/ai-founder/`: The Constitution. Immutable vision and core rules.
- `.agents/ai-company/`: Governance & Strategy. Where the CTO/CPO plans the roadmap.
- `.agents/ai-runtime/`: Memory & Handoff. Short-term session memory and state graphs.
- `.agents/ai-execution/`: The Factory. Coding standards, testing, and deployment rules.
- `.agents/ai-domains/`: Specialized industry presets (SaaS, Data, Web3, etc.).
- `docs/`: In-depth documentation on how to extend the framework.

📚 **[Read the Full Documentation](https://thonguyen98vn.github.io/AI-Company-framework/)**

## 🤝 Contributing
We welcome contributions! Please see `CONTRIBUTING.md` for details on how to add new Domain Presets or improve the core framework.

## 📜 License
This project is licensed under the MIT License - see the `LICENSE` file for details.
