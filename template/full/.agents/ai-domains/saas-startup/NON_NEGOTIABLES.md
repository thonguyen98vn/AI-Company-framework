# SaaS Startup - Non-Negotiables

> [!IMPORTANT]
> **MULTI-TENANT DATA SECURITY**
> These rules exist to prevent catastrophic cross-tenant data leaks.

1. **Tenant ID Requirement**: EVERY single database query must explicitly filter by `tenant_id` or `workspace_id`.
2. **Never Trust the Client**: Pricing, subscription status, and roles must always be verified on the server. Never rely on the frontend state for authorization.
3. **Soft Deletes**: User data must use soft deletes (`deleted_at` timestamp) to allow recovery in case of accidental workspace deletion.
