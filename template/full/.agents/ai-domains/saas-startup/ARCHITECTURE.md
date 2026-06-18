# SaaS Startup - Architecture

## Purpose
This domain configures the AI Company to build highly scalable, multi-tenant B2B or B2C SaaS platforms.

## Stack Requirements
- **Frontend**: Next.js (App Router), React, TailwindCSS
- **Backend**: Next.js API Routes or separate Node.js/Go backend
- **Database**: PostgreSQL (Prisma or Drizzle ORM)
- **Payments**: Stripe Checkout and Webhooks

## Core Components
1. **Authentication**: NextAuth or Clerk for secure user and tenant management.
2. **Tenant Isolation**: Database schema must support Row-Level Security (RLS) or explicit tenant IDs on every query.
3. **Billing Engine**: Syncs with Stripe to enforce feature gating based on active subscriptions.
