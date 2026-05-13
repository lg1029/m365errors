# Intune Apps Category — Design Spec

**Date:** 2026-05-12
**Status:** Approved

## Overview

Add a new `intune_apps` category to M365ErrorFinder covering common app deployment errors across Windows, iOS/VPP, and Android. Simultaneously add 2 Autopilot TPM errors to the existing `autopilot` category and 1 enrollment error to the existing `intune` category.

No UI changes are required — the category grid and search already handle new categories dynamically.

## Category Metadata

| Field | Value |
|---|---|
| Key | `intune_apps` |
| Name | Intune Apps |
| Icon | 📦 |
| Description | App deployment failures, packaging errors, VPP licensing, and install blocks across Windows, iOS, and Android |
| Color | `#0369A1` |
| Reddit sub | `Intune` |

The color `#0369A1` is distinct from Intune's `#1D6FEB` but clearly in the same blue family, signaling the relationship.

## Errors to Add

### `intune_apps` — Windows Packaging (4 errors)

| Code | Title |
|---|---|
| `0x80073CF0` | Package is unsigned |
| `0x80073CF3` | Package conflict, dependency, or architecture mismatch |
| `0x80073CFB` | Package already installed — reinstall blocked |
| `0x80073CFF` | Sideloading not enabled on this device |

### `intune_apps` — iOS / VPP (8 errors)

| Code | Title |
|---|---|
| `0x87D13B7E` | No VPP licenses remaining |
| `0x87D1313D` | Could not retrieve VPP license from iTunes Store |
| `0x87D13B62` | User rejected the offer to install the app |
| `0x87D13B63` | User rejected the offer to update the app |
| `0x87D11388` | iOS device is locked or busy |
| `0x87D13B94` | App Store is disabled on this device |
| `0x87D13B97` | Device is in Lost Mode — app install blocked |
| `0x87D13B80` | Cannot connect to the iTunes Store |

### `intune_apps` — Android (3 errors)

| Code | Title |
|---|---|
| `0xC7D14FB1` | User canceled the app installation |
| `0xC7D14FB5` | App failed to install — unknown cause |
| `0xC7D14FB7` | APK signature mismatch — upgrade blocked |

### `autopilot` — New additions (2 errors)

| Code | Title |
|---|---|
| `0x800705B4` | Enrollment timed out — device may not support TPM 2.0 |
| `0x801C03EA` | TPM attestation failed during Autopilot self-deploying |

### `intune` — New addition (1 error)

| Code | Title |
|---|---|
| `0xC1036501` | Multiple MDM configurations detected in Entra ID |

## Errors Skipped

- `0x87D1041C` — already exists as `intune_0x87d1041c`
- `0x87D1FDE8` — already exists as `intune_0x87d1fde8`

## Error Entry Format

Each entry follows the existing schema:

```js
{
  id: 'intune_apps_0x80073cf3',
  code: '0x80073CF3',
  category: 'intune_apps',
  title: '...',
  summary: '...',         // one sentence, plain English
  whatItMeans: '...',     // 2-3 sentences explaining context
  whyItHappens: [...],    // 3-5 bullet causes
  whatToTry: [...],       // 3-5 actionable steps
  learnUrl: 'https://learn.microsoft.com/en-us/mem/intune/apps/troubleshoot-app-install',
}
```

## Files Changed

- `src/data/errors.js` — only file modified
  - Add `intune_apps` entry to `CATEGORY_COLORS`
  - Add `intune_apps` entry to `CATEGORY_META`
  - Add `intune_apps` entry to `REDDIT_SUBS`
  - Append 15 new `intune_apps` error objects
  - Append 2 new `autopilot` error objects
  - Append 1 new `intune` error object
