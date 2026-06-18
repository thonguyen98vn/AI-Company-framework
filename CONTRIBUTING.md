# Contributing to AI Company Framework

First off, thank you for considering contributing to the AI Company Framework! It's people like you that make the open-source community such an amazing place to learn, inspire, and create.

## How to Contribute

1. **Fork the repository** and clone it to your local machine.
2. **Create a branch** for your feature or bug fix.
3. **Make your changes**. If you are adding a new Domain Preset, please ensure it goes into `template/.agents/ai-domains/`.
4. **Test your changes** by running the install scripts in a blank directory and verifying the agent behaves as expected.
5. **Submit a Pull Request** with a detailed explanation of your changes.

## Adding Domain Presets
Domain Presets are specialized rulesets for specific types of projects (e.g., SaaS, Mobile, Data Science).
To add one:
1. Create a folder in `template/.agents/ai-domains/[domain-name]/`.
2. Add a `README.md` explaining the domain.
3. Add specialized `.md` files for architecture, testing, or UI guidelines.
