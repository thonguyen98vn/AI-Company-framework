# Trading AI - Non-Negotiables

> [!CAUTION]
> **FINANCIAL RISK RULES**
> Any violation of these rules may lead to irreversible financial loss.

1. **Never Hardcode API Keys:** All API keys, especially those with trading or withdrawal permissions, MUST be loaded from environment variables.
2. **Withdrawal Permissions:** Never request API keys with withdrawal permissions enabled. Only trading and reading.
3. **Dry-Run by Default:** All new strategies MUST execute in `DRY_RUN=true` mode. Trading on production accounts requires explicit manual override.
4. **Hard Stop Loss:** Every strategy must implement a hard stop-loss threshold. If the account equity drops below this threshold, all trading activities must instantly halt.
