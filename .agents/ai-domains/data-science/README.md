---
owner: Domain_Agent
review_cadence: monthly
last_reviewed: 2026-06-18
staleness_risk: low
---
# Data/AI Domain Preset

This preset configures the AI Company Framework for Data Science, Machine Learning, and AI projects.

## Included Standards
By activating this preset, the Execution Agents will default to Data/AI-specific best practices:
- **Language**: Python (3.11+).
- **Environment**: Poetry or `uv` for dependency management.
- **Experiment Tracking**: MLflow or Weights & Biases.
- **Structure**: Clear separation of `data/raw`, `data/processed`, `notebooks/`, and `src/`.
- **Notebooks**: Use Jupyter notebooks only for exploration, moving core logic to `src/`.

## How to use
When the Founder Interview occurs, if the Founder mentions building a Data or ML pipeline, the system will automatically prioritize the rules from this folder to guide the engineering agents.
