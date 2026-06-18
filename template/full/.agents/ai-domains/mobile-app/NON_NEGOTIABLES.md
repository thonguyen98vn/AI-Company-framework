# Mobile App - Non-Negotiables

> [!CAUTION]
> **APP STORE COMPLIANCE**
> These rules exist to ensure the app is not rejected by Apple or Google.

1. **No Hot-Code Push for Native Code**: Over-The-Air (OTA) updates using EAS Update are only allowed for JavaScript bundles. You must never attempt to bypass App Store review for native modules.
2. **Handle Permissions Gracefully**: Never crash if a user denies a permission (Camera, Location, etc.). Always provide a fallback UI explaining why the feature is disabled.
3. **No WebViews for Core UI**: Apple rejects apps that are just wrapped websites. All primary navigation and core UI components must be built using native React Native components.
