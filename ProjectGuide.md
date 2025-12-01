## TurvaApp – Project Guide

This guide explains how TurvaApp is structured, how navigation works, and where to find key functionality in the codebase.

---

## 1. High-Level Architecture

- **Tech stack**
  - Expo + React Native
  - Expo Router (file-based navigation in `app/`)
  - React Navigation Drawer + Tabs + Stack (via Expo Router)
  - React Native Paper (UI components + theming)
  - Zustand (state management for theme, language, safety progress)
  - AsyncStorage (onboarding completion flag)

- **Top-level navigation**
  - `app/index.tsx` – startup router (decides onboarding vs main app)
  - `app/(onboarding)/` – onboarding flow
  - `app/(tabs)/` – main app tabs (Home, Search, Camera)
  - `app/(tabs)/home/` – Home tab, with a nested drawer and multiple screens

---

## 2. Startup & Onboarding Flow

- **File**: `app/index.tsx`
  - Reads `IsOnboardingComplete` from `AsyncStorage`.
  - If `"true"` → redirects to `/(tabs)/home`.
  - Else (false/missing/error) → redirects to `/(onboarding)`.
  - Shows a loading spinner while checking, then renders nothing (because it immediately redirects).

- **Onboarding stack**
  - Layout: `app/(onboarding)/_layout.tsx` (headerless `Stack`).
  - Individual onboarding screens live under `app/(onboarding)/`.
  - After onboarding is done, app should set the `IsOnboardingComplete` flag so subsequent launches skip this flow.

---

## 3. Global Layout, Theme & Language

- **Root layout**: `app/_layout.tsx`
  - Wraps the entire app in:
    - `SafeAreaProvider`
    - `StatusBar`
    - `PaperProvider` with either `LightTheme` or `DarkTheme`
  - Selects theme using `useThemeStore` (Zustand).
  - Declares the root `Stack`:
    - `index`
    - `(onboarding)`
    - `(tabs)`

- **Theme**
  - Store: `useThemeStore` (in `src/zustand/store`).
  - UI: `ThemeButton` in the Home drawer toggles light/dark mode.

- **Language**
  - Store: `useLanguageStore` (in `src/zustand/store`).
  - Text sources:
    - `static/homeTexts.json`
    - `static/drawerTexts.json`
    - `static/safetyInfoTexts.json`
    - `static/gameTexts.json`
  - UI: `LanguageButton` in the Home drawer switches language and re-renders all localized text.

---

## 4. Tabs Navigation (Main App Shell)

- **Layout**: `app/(tabs)/_layout.tsx`
  - Defines bottom tab navigator with:
    - `home` – main Home area with drawer.
    - `search` – search screen.
    - `camera` – camera screen.
  - Uses `Ionicons` for tab icons.
  - Tab labels come from `homeTexts.json` via `useLanguageStore`.
  - Colors and backgrounds use React Native Paper theme tokens.

- **Special Home behavior**
  - `home` tab has a `tabPress` listener:
    - Overrides the default behavior (which would reopen the last screen you visited in Home).
    - Navigates to `/(tabs)/home`, ensuring the tab always resets to Home root (drawer root) instead of restoring last nested screen.

---

## 5. Home Area – Drawer Navigation & Screens

- **Drawer layout**: `app/(tabs)/home/_layout.tsx`
  - Uses `expo-router/drawer` to create a drawer inside the Home tab.
  - Header:
    - Custom title (no default text).
    - Profile icon on the right navigates to → `/(tabs)/home/profile`.
  - Drawer content:
    - `DrawerItemList` for visible routes.
    - Close button.
    - `ThemeButton` + `LanguageButton` in a footer section.

- **Drawer routes**
  - **Visible**
    - `index` – Home landing screen.
    - `news` 
    - `safe-haaga-helia`
    - `rules`
    - `crisis-team-contact`
    - `campus-instructions`
    - `emergency-app`
    - `about-app`
  - **Hidden (drawerItemStyle: { display: "none" })**
    - `profile`
    - `settings`
    - `rewards`
    - `safety-briefing`
    - `report-description-screen`
    - `report-form-screen`
    - `game`
    - `safety-info`

- **Home landing screen**: `app/(tabs)/home/index.tsx`
  - Displays:
    - Hero image (`Home_screen.png`).
    - Four key CTA buttons:
      - Safety Briefing → `/ (tabs)/home/safety-briefing`
      - Game → `/ (tabs)/home/game`
      - Safety perception (security) → `report-description-screen?type=security`
      - Report (harassment) → `report-description-screen?type=harassment`
  - This is the user’s main hub into learning, game, and reporting flows.

---

## 6. Game Flow

- **Layout**: `app/(tabs)/home/game/_layout.tsx`
  - `Stack` navigator with full-screen content, `headerShown: false`.

- **Onboarding screen**: `app/(tabs)/home/game/index.tsx`
  - Reads localized content from `gameTexts.json`.
  - Shows `HH_SafetyCharacters.png` with `moti` animation.
  - Renders a list of onboarding slides:
    - Each slide: title + multiple description lines.
  - Navigation logic:
    - `Next` increments the slide index.
    - On the final slide, `Next` label changes (e.g. “Valmiina!”) and pushes `/(tabs)/home/game/worlds`.
    - Optional `Back` button when not on first slide.
  - Keeps UX clean by auto-scrolling to top on slide change.

---

## 7. Safety Briefing & Safety Info

- **Safety Briefing list**: `app/(tabs)/home/safety-briefing.tsx`
  - Shows a list of safety topics sourced from `safetyBriefingData` (mock data).
  - Each item links to `/(tabs)/home/safety-info?itemId=<topicId>`.

- **Safety Info detail**: `app/(tabs)/home/safety-info.tsx`
  - Params: `itemId` via `useLocalSearchParams`.
  - Data: `safetyBriefingData` in `src/mockData`.
  - Store: `useSafetyStore` tracks completion (`completed` routes and `markCompleted`).
  - UI:
    - Title + subtitle from `safetyInfoTexts.json`.
    - Multiple `Card` sections, each with a title and list of content items.
    - “Understood” row at the bottom with a `Checkmark`:
      - Toggles completion for the route `/(tabs)/home/safety-info?itemId=<id>`.
  - Error handling:
    - If `itemId` is invalid/missing, shows an error view and a button back to `/(tabs)/home/safety-briefing`.

---

## 8. About App

- **File**: `app/(tabs)/home/about-app.tsx`
  - Uses `drawerTexts.json` for localized text.
  - Animates:
    - Top image (`About_app_screen.png`).
    - Title + description.
    - List of developer names (defined in a local array) with staggered entrance animations.
  - Accessible via the drawer as “About app”.

---

## 9. Key State Stores & Data Sources

- **Zustand stores** (in `src/zustand/store`):
  - `useThemeStore` – stores `"light"` or `"dark"`.
  - `useLanguageStore` – stores current language (e.g. `fi`, `en`) and drives JSON text selection.
  - `useSafetyStore` – tracks which safety topics/routes are marked completed.

- **Static JSON text files** (under `static/`):
  - `homeTexts.json` – Home screen and tabs labels.
  - `drawerTexts.json` – Drawer titles, About-app texts.
  - `safetyInfoTexts.json` – Safety info labels, error messages, button texts.
  - `gameTexts.json` – Game onboarding titles and descriptions.

- **Mock data**
  - `src/mockData.ts` – includes `safetyBriefingData` for safety topics and sections.

---

## 10. Adding or Modifying Screens

When you add new screens:

1. **Decide where they live**
   - Global (top-level) → in `app/` and connected via root `Stack`.
   - Tab-specific → under `app/(tabs)/<tabName>/`.
   - Drawer-specific → under `app/(tabs)/home/` and registered in `home/_layout.tsx`.
2. **Update navigation**
   - For new drawer items, register them as `Drawer.Screen` entries in `app/(tabs)/home/_layout.tsx`:
     - Set `drawerItemStyle` and `title`.
     - Optionally hide them from the drawer if they’re only reachable via buttons/links.
3. **Wire localization**
   - Add new text keys to the appropriate `static/*.json` files.
   - Use `useLanguageStore` and the correct JSON to read localized text in your component.
4. **Respect theme**
   - Use `useTheme()` from React Native Paper for colors.
   - Avoid hardcoded colors; rely on theme tokens (`theme.colors.*`).

---

## 11. Developer Onboarding Checklist

- Install dependencies and run the app with Expo.
- Explore navigation:
  - Verify onboarding redirect logic.
  - Confirm tabs and drawer routes work as described.
  - Try safety briefing, safety info, and marking topics as understood.
  - Walk through the full game onboarding flow to `worlds`.
- Check theme and language switches:
  - Toggle light/dark theme.
  - Change language and verify texts update across Home, drawer, safety, and game.




