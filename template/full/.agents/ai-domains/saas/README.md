---
owner: Domain_Agent
review_cadence: monthly
last_reviewed: 2026-06-18
staleness_risk: low
---
# SaaS Domain Preset

This preset configures the AI Company Framework for building Software-as-a-Service (SaaS) products. 

## Included Standards
By activating this preset, the Execution Agents will default to SaaS-specific best practices:
- **Architecture**: Next.js (App Router), Vercel, Supabase/Firebase, Stripe for billing.
- **Multi-tenancy**: Strict isolation of user data based on `tenant_id` or `org_id`.
- **UI/UX**: TailwindCSS, Shadcn UI, accessible components.

## How to use
When the Founder Interview occurs, if the Founder mentions building a SaaS, the system will automatically prioritize the rules from this folder to guide the engineering agents.
