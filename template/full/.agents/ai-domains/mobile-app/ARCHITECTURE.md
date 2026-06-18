# Mobile App - Architecture

## Purpose
This domain configures the AI Company to build cross-platform mobile applications for iOS and Android.

## Stack Requirements
- **Framework**: React Native with Expo (Managed Workflow)
- **Navigation**: Expo Router (File-based routing)
- **State Management**: Zustand or React Query
- **Backend as a Service**: Supabase or Firebase

## Core Components
1. **App Shell**: The main navigation container featuring a bottom tab bar and stack navigators.
2. **Offline-First Storage**: Uses AsyncStorage or WatermelonDB to cache API responses for offline capability.
3. **Push Notifications**: Integrated via Expo Push Notification service.
