@AGENTS.md

# Smile App — Havelock City Mall · Brand & Design System Guide

> **READ THIS FILE BEFORE GENERATING ANY SCREEN.**
> Every UI screen, component, or flow must strictly follow these guidelines.

---

## 1. Project Overview

**App Name:** Smile App (HCM Smiles)
**Platform:** Mobile (iOS & Android) — design at 393 × 852 px (iPhone 16 Pro viewport)
**Mode:** Light mode only
**Audience:** Havelock City Mall loyalty members (Gen Z & Millennial primary, all ages secondary)
**Vibe:** Modern, vibrant, rewarding — makes users *feel* special every time they open the app

### Core Purpose
A loyalty & lifestyle super-app for Havelock City Mall members. Every screen should reinforce the feeling of being rewarded, entertained, and connected to the mall experience.

---

## 2. Feature Inventory

| Feature Area | Key Screens / Functions |
|---|---|
| **Points & Wallet** | Points balance, earned/redeemed history, tier status |
| **QR & Scanning** | Scan QR at shop (earn), show My QR (earn), redeem QR |
| **Parking** | Pay parking with Smile Points, parking history |
| **Offers & Rewards** | Personalised offers, rewards by category, claim rewards |
| **Events** | Upcoming events listing, event detail, buy tickets with Smile Points |
| **Challenges** | Active challenges, challenge detail, progress tracking, completion |
| **Games & Fun** | Spin the Wheel, other mini-games |
| **Promotions** | Push notifications, in-app banners, What's New feed |
| **Shop Directory** | Shop locations (mall map), shop detail, category browse |
| **Family Sharing** | Add family members, shared points pool, member management |
| **Tiers** | Silver → Gold → Platinum — progress, benefits, comparison |
| **Profile** | User info, settings, notification preferences |

### Example Challenges
- Visit KFC at Havelock City Mall 2 times → Earn 350 Points
- Spend Rs. 2,500 at Cool Planet → Get 20% Discount
- Check in daily → Earn 20 Points (Daily Bonus)

---

## 3. Brand Colors

### Primary Palette
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#9728B8` | Primary CTAs, active states, key UI elements — use sparingly for premium feel |
| `accent-pink` | `#F002AF` | Highlights, badges, gradient accent |
| `accent-orange` | `#FA5D3E` | Warm highlights, challenge cards, alerts |
| `accent-yellow` | `#FED955` | Stars, coins, points indicators, gamification elements |
| `accent-teal` | `#63DBAE` | Success states, completed challenges, positive feedback |
| `accent-cyan` | `#00C1E2` | Info states, scan/QR elements, cool-tone cards |
| `accent-blue` | `#014D98` | Trust elements, tier badges (Silver border tones), links |

### Neutral Palette
| Token | Hex | Usage |
|---|---|---|
| `white` | `#FFFFFF` | Cards, surfaces, app bars, nav bars |
| `page-bg` | `#F5F5F7` | **All page/screen backgrounds** — every screen root div uses this |
| `black` | `#0E0E10` | Primary text, headings |
| `gray` | `#52525B` | Secondary text, descriptions |
| `mid-gray` | `#B3B3B4` | Placeholder text, disabled states |
| `light-gray` | `#F1F1F1` | Section dividers, inactive tabs, icon bg tints |
| `border` | `#D4D4D8` | Card borders, dividers, input borders |
| `red` | `#DC2626` | Errors, expiry warnings, destructive actions |

### Gradient Recipes (use selectively — only for gamification/celebration moments, NOT buttons or routine backgrounds)
```
Energy Gradient:    linear-gradient(135deg, #FA5D3E 0%, #FED955 100%)
Cool Gradient:      linear-gradient(135deg, #00C1E2 0%, #63DBAE 100%)
Hero Gradient:      linear-gradient(135deg, #9728B8 0%, #F002AF 60%, #FA5D3E 100%)
```

### Auth Screen Assets
```
Background image:   /images/bgsignup.jpg — use as photo background on auth screens (login, register, splash)
                    Always add a dark overlay (rgba(0,0,0,0.4–0.55)) for text legibility
Logo on dark/photo: /images/logowhite.png
Logo on white bg:   /images/logo.png
```

---

## 4. Typography

**Font Family:** `Proxima Nova` (use system fallback `'Inter', sans-serif` for web)

### Type Scale
| Role | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `display` | 32px | 800 (ExtraBold) | 1.2 | Hero numbers, big point totals |
| `h1` | 28px | 700 (Bold) | 1.25 | Screen titles |
| `h2` | 22px | 700 (Bold) | 1.3 | Section headings |
| `h3` | 18px | 600 (SemiBold) | 1.35 | Card titles, sub-sections |
| `h4` | 16px | 600 (SemiBold) | 1.4 | Labels, list titles |
| `body-lg` | 15px | 400 (Regular) | 1.5 | Primary body text |
| `body` | 14px | 400 (Regular) | 1.5 | Secondary body text |
| `body-sm` | 13px | 400 (Regular) | 1.5 | Helper text, captions |
| `caption` | 12px | 400 (Regular) | 1.4 | Timestamps, fine print |
| `overline` | 11px | 600 (SemiBold) | 1.3 | Category labels (ALL CAPS) |
| `button` | 15px | 700 (Bold) | 1 | CTA button text |
| `tab-label` | 11px | 600 (SemiBold) | 1 | Bottom nav labels |

---

## 5. Spacing & Layout

**Base Unit:** 4px
**Mobile Canvas:** 390px wide
**Safe Zones:** 20px horizontal padding (screen edge), 16px card internal padding
**Bottom Nav Height:** 72px (includes safe area)
**Status Bar:** 44px reserved at top
**Corner Radius Scale:**
- `xs`: 8px — chips, tags, small badges
- `sm`: 12px — input fields, small cards
- `md`: 16px — standard cards, buttons
- `lg`: 20px — large cards, modals
- `xl`: 24px — hero cards, bottom sheets
- `full`: 9999px — pills, avatar circles

---

## 6. Component Library

### Buttons
```
Primary Button:   bg=#9728B8 (solid, NO gradient), text=white, h=48px (full-width), radius=12px, font-weight=600
Secondary Button: bg=white, border=1.5px #9728B8, text=#9728B8, h=48px (full-width), radius=12px, font-weight=600
Black Button:     bg=#0E0E10, text=white, h=48px (full-width), radius=12px, font-weight=600
Ghost Button:     bg=transparent, text=#9728B8, no border, inline text link style
Pill Button:      bg=light-gray, text=black, h=36px, radius=full — for filters/tags
Danger Button:    bg=#DC2626, text=white, h=48px, radius=12px, font-weight=600
```
**Button rules:**
- ALL buttons use font-weight=600 (SemiBold) — NOT 500 or 700
- Full-width (screen-spanning) buttons: height=48px. Smaller inline/icon buttons may use other heights.
- NEVER use gradients on buttons. Primary = solid #9728B8. Secondary = white with #9728B8 border/text.
- Black buttons (#0E0E10) are acceptable where contextually appropriate.

### Filter Chips (Category/Tab navigation outside of auth flows)
```
Active chip:    bg=#0E0E10 (black), text=white, px=16px, py=8px, radius=9999px (pill), font-weight=600
Inactive chip:  bg=transparent, border=1.5px solid #0E0E10, text=#0E0E10, same padding, font-weight=600
Disabled chip:  bg=transparent, border=1.5px solid #D4D4D8, text=#B3B3B4, not-allowed cursor
```
Use filter chips wherever there is a set of mutually-exclusive filter options (category browsing, earned/redeemed toggle, etc.).
Do NOT use the pill-tab style (white background inside gray container) for filter navigation — that style is reserved for auth-flow binary toggles (Phone/Email mode switch).

### Cards
```
Standard Card:    bg=white, border=1px border-color, radius=lg, shadow=sm, padding=16px
Hero Card:        gradient background, radius=xl, padding=20px, no border
Reward Card:      bg=white, radius=lg, overflow=hidden, image-top + content-bottom
Challenge Card:   bg=gradient or white, radius=lg, progress bar inside
Tier Card:        border=2px tier-color, radius=xl, premium feel
```

### Tier Colors
```
Silver:   gradient(#C0C0C0 → #E8E8E8), accent=#B3B3B4
Gold:     gradient(#FED955 → #FA9E1A), accent=#E6A800
Platinum: gradient(#9728B8 → #F002AF), accent=#9728B8
```

### Points Badge
- Background: `accent-yellow` (`#FED955`)
- Text: `#0E0E10` bold
- Icon: coin/star emoji or custom SVG

### Notification Badge
- Background: `#DC2626`
- Text: white, 10px bold
- Position: top-right corner of icon

### Progress Bar
- Track: `#F1F1F1`
- Fill: primary gradient (left to right)
- Height: 8px, radius: full

### Bottom Navigation
- Background: white
- Active icon + label: `primary` (#9728B8)
- Inactive: `mid-gray` (#B3B3B4)
- Active indicator: small filled pill behind icon, `primary` at 12% opacity
- Icons: Home, Rewards, Explore, Events, Profile
- Height: 72px with safe area
- **Note:** Parking is accessible via Home page quick access (Parking button) for quick entry. Events navigation allows browsing all events from footer.

### Status Bar (Universal)
- **Component:** Use shared `StatusBar` from `@/app/components/StatusBar.tsx` on all screens
- **Styling:** paddingTop=12px, paddingBottom=4px, time fontSize=12px, fontWeight=600, color=#0E0E10
- **Icons:** Signal (14×10), WiFi (12×9), Battery (20×10) — all in black (#0E0E10)
- **Positioning:** absolute top-0, z-index=40, no pointer events

### Top App Bar
- **Height:** minHeight=80px (all screens except Home)
- **Padding:** paddingTop=48px, paddingBottom=12px
- **Border & Background:** borderBottom=1px solid #F0F0F0, background=#fff (or transparent on photo screens)
- **Title Font:** fontSize=16px, fontWeight=700 (bold)
- **Home Screen:** left logo (72×72), right icons (spinwheel + notification bell with badge)
- **Main Screens** (Rewards): title text only, no back button, footer navigation included, right spacer (40px)
- **Detail/Modal Screens** (Parking, Settings, Contact Support): back button (ChevronLeft 22px, black #0E0E10) + title (16px, weight 700, black #0E0E10), right spacer (40px), no footer

---

## 7. Iconography

- **Style:** Rounded, filled for active / outlined for inactive
- **Size:** 24px standard, 20px in lists, 28px in bottom nav
- **Color:** Inherit from context (primary, gray, or white)
- Use modern emoji or Lucide React icons where applicable

---

## 8. Imagery & Illustration Style

- **Photography:** Vibrant, lifestyle — people enjoying the mall, food, fashion
- **Illustrations:** Bold, colorful, slightly cartoonish mascot elements (the lion from current branding can stay)
- **Gamification art:** 3D-style, glossy, playful (spin wheel, trophies, coins)
- **Event banners:** Full-bleed photography with gradient overlay for text legibility
- **Category icons:** Colorful, rounded square containers with white icon inside

---

## 9. Shadows & Elevation

```
shadow-xs:  0 1px 2px rgba(0,0,0,0.06)       — subtle, for inputs
shadow-sm:  0 2px 8px rgba(0,0,0,0.08)       — standard cards
shadow-md:  0 4px 16px rgba(0,0,0,0.10)      — floating elements
shadow-lg:  0 8px 32px rgba(0,0,0,0.12)      — modals, bottom sheets
shadow-glow: 0 4px 20px rgba(151,40,184,0.25) — primary glow on CTAs (use sparingly)
```

---

## 10. Motion & Interaction Principles

- **Transitions:** 200–300ms ease-in-out for most interactions
- **Spring animations:** For reward reveals, points counting, spin-wheel
- **Micro-interactions:** Every tap should feel responsive (scale 0.96 on press)
- **Confetti / celebration:** Trigger on: challenge complete, tier upgrade, first spin win
- **Skeleton loaders:** Use purple-tinted skeleton screens (not gray)
- **Haptic feedback:** Light on normal taps, medium on rewards, heavy on jackpot/tier up

---

## 11. Screen Inventory (Design These Screens)

### Onboarding & Auth
1. Splash Screen
2. Onboarding (3 slides)
3. Login / Register
4. OTP Verification
5. Profile Setup

### Home & Navigation
6. **Home Screen** — Points summary hero, quick actions, challenges teaser, events, rewards categories
7. Bottom Navigation (persistent)

### Points & Wallet
8. Points Overview — balance, tier progress, history toggle
9. Points History — earned vs redeemed, filterable list
10. Tier Details — Silver/Gold/Platinum benefits comparison

### QR & Scanning
11. Scan QR (camera) — earn points at shop
12. My QR — show to cashier to earn points
13. Redeem QR — generated on redemption

### Offers & Rewards
14. Rewards Home — category filter, personalized grid
15. Reward Detail — full offer, how to redeem, expiry
16. Reward Claimed Confirmation

### Challenges
17. Challenges Hub — active, completed, upcoming tabs
18. Challenge Detail — progress, steps, reward preview
19. Challenge Complete Celebration

### Games
20. Games Hub — spin wheel + other games
21. Spin the Wheel — full interactive screen
22. Win / Lose result screen

### Events
23. Events Listing — upcoming events grid
24. Event Detail — info, ticket options, buy with points
25. Ticket Confirmation / My Tickets

### Parking
26. Parking Home — vehicle entry, points balance for parking
27. Pay with Points — confirm & pay flow
28. Parking History

### Shop Directory
29. Mall Map / Shop Locator — floor-based map
30. Shop Category Browse
31. Shop Detail — brand info, offers, location

### Family Sharing
32. Family Members — list, add member
33. Share Points flow
34. Family points pool overview

### Profile & Settings
35. Profile Screen — avatar, name, tier badge, stats, navigation menu
36. Edit Profile
37. Settings Screen — notifications, preferences, app info, privacy/terms
38. Contact Support — phone, email, live chat, FAQ, location
39. Invite Friends Drawer — share link, social media buttons

---

## 12. UX Principles for Gen Z Appeal

1. **Reward immediately** — Users should see their points update in real time
2. **Make it social** — Leaderboards, family sharing, shareable achievements
3. **Gamify everything** — Progress bars, streaks, badges, levels everywhere
4. **Bold & unapologetic** — Don't be afraid of color, gradients, large type
5. **Short & punchy** — No walls of text. 3 words > 3 sentences.
6. **Celebration moments** — Animate reward confirmations, make users feel the win
7. **Dark pattern free** — Clear CTAs, honest point values, transparent expiry

---

## 13. Code Conventions (Next.js / React)

- **Framework:** Next.js (see AGENTS.md for version notes)
- **Styling:** Tailwind CSS utility classes only
- **Components:** Functional React components with TypeScript
- **Mobile frame:** Wrap all screens in a `393px` wide iPhone 16 Pro simulator container centered on desktop
- **Font loading:** Import Proxima Nova via `@font-face` or use Inter as fallback in development
- **Icons:** Use `lucide-react` for all icons
- **Images:** Use Next.js `<Image>` component with placeholder gradients for demo screens
- **Animations:** Use Tailwind `transition`, `animate-` utilities + inline style for complex animations

### File Structure Convention
```
app/
  (screens)/
    home/
    rewards/
    challenges/
    games/
    events/
    parking/
    shops/
    family/
    profile/
  components/
    ui/          — Primitive components (Button, Card, Badge, etc.)
    layout/      — AppBar, BottomNav, MobileFrame
    features/    — Feature-specific components
```

---

## 14. Design Do's and Don'ts

### ✅ DO
- Use `#9728B8` solid color for primary CTAs (no gradient on buttons)
- Use `bgsignup.jpg` + dark overlay for auth screen hero headers
- Use `logowhite.png` on photo/dark backgrounds, `logo.png` on white
- Show points prominently on every relevant screen
- Use accent-yellow for anything coin/points related
- Add subtle shadows to cards to lift them off the background
- Use rounded corners everywhere (min 12px)
- Make tap targets minimum 44px tall
- Use skeleton screens while loading
- Keep the design premium: generous whitespace, restrained color use

### ❌ DON'T
- Use gradients on buttons or routine UI elements (only gamification/celebration)
- Overuse the primary color `#9728B8` — apply it only where it matters (CTAs, active states, key labels)
- Use `#9828B8` — the correct primary is `#9728B8`
- Use flat gray buttons as primary CTAs
- Make text smaller than 12px
- Use more than 3 colors in a single card
- Show empty states without a helpful illustration + CTA
- Use square/sharp corners anywhere
- Overcrowd cards — whitespace is premium
- Use system default blue for links

---

*Last updated: 2026-04-10 · Maintained by Milan Azbow*

---

## 15. Design Decisions Log

| Date | Decision |
|---|---|
| 2026-04-10 | Primary color corrected to `#9728B8` (not `#9828B8`) |
| 2026-04-10 | Auth screen gradients replaced with `bgsignup.jpg` photo background |
| 2026-04-10 | Primary buttons: solid `#9728B8`, no gradient |
| 2026-04-10 | Login page: "New to Smiles? Create Account" as inline text link, no separate button |
| 2026-04-10 | Removed "Continue with Email/Mobile" redundant toggle button from login |
| 2026-04-10 | Signup profile form: first name and last name in separate full-width rows |
| 2026-04-10 | Device target updated to iPhone 16 Pro (393 × 852 px) |
| 2026-04-10 | Filter chips: active=black bg/white text, inactive=transparent/black border, disabled=gray border/gray text |
| 2026-04-10 | Button font-weight: ALL buttons use 500 (Medium) — NOT 600 or 700 |
| 2026-04-10 | Reward cards: icon color = #52525B (gray), points text = #0E0E10 (black), +10px left margin on details section |
| 2026-04-10 | App bar standardized: paddingTop=48px, paddingBottom=8px, minHeight=68px across ALL screens |
| 2026-04-10 | Redeem drawer: drag-to-close from bottom (100px threshold), slide-up animation on open, no close button, points text color = black |
| 2026-04-10 | Rewards page is a main screen: has footer navigation with Rewards active, no back button in app bar, only title |
| 2026-04-10 | Main screens (Home, Rewards) have footer nav. Detail screens (Points, OTP, MyQR, Scanner) have back button, no footer |
| 2026-04-15 | All screen root backgrounds use `#F5F5F7` (page-bg) — NOT white. White is reserved for cards, app bars, and nav bars only |
| 2026-04-15 | Member points on family screen use black (`#0E0E10`), fontWeight 500 (medium) |
| 2026-04-15 | Admin member card uses accent-cyan (`#00C1E2`) for border/badge — NOT teal. Badge text uses dark cyan `#0077A8` for legibility |
| 2026-04-15 | Button overhaul: all gradients removed from buttons. Primary = solid `#9728B8`, Secondary = outline `#9728B8`. Full-width buttons = 48px height. All buttons = fontWeight 500 (Medium). Black buttons (`#0E0E10`) allowed contextually |
| 2026-04-15 | Success message pattern: **All** success states use a full-screen overlay popup (position absolute, inset 0, z-index 60, light purple-white gradient bg), large animated check circle (zoom-in spring animation), bold title + subtitle, "Tap anywhere to continue" hint, tap anywhere to dismiss. **Impactful** (Send Points, tier upgrade, spin win) adds floating animated particles (shapes/dots). **Simple** (invite sent, add member) = same overlay but NO floating elements. Drawers: NO close button — close only by dragging the top handle down |
| 2026-04-20 | **Universal Status Bar:** Created shared `StatusBar` component in `/app/components/StatusBar.tsx`. All screens use this component (not custom instances). Styling: paddingTop=12px, paddingBottom=4px, time fontSize=12px fontWeight=600 color=#0E0E10, SVG icons in black |
| 2026-04-20 | **App Bar Standardization:** All screens except Home now use minHeight=80px, paddingTop=48px, paddingBottom=12px, title fontSize=16px fontWeight=700. Detail/Modal screens include back button + title + right spacer (40px). Main screens include title + right spacer (40px) |
| 2026-04-20 | **Parking Page:** Added z-index=10 to footer navigation to fix visibility issue. Footer was being hidden behind scrollable content |
| 2026-04-20 | **New Screens Added:** Settings page with notifications, preferences, and app info. Contact Support page with phone, email, live chat, FAQ, and location. Invite Friends drawer on Profile page with shareable link and social media buttons |
| 2026-04-21 | **Button Font-Weight Updated:** All buttons updated from fontWeight=500 (Medium) to fontWeight=600 (SemiBold). Includes Primary, Secondary, Black, Danger buttons and Filter Chips. Updated across 23 screens |
| 2026-04-21 | **Category Cards Redesigned:** Explore page category cards updated from colored backgrounds (tinted with category accent colors) to white backgrounds with border/shadow. Font-weight of category labels reduced from 600 to 500 (Medium). Matches Scan QR/My QR card style |
| 2026-04-21 | **Status Bar Removed:** StatusBar component completely removed from all screens. Native iOS status bar (time, WiFi, battery) no longer displayed. Screens render cleanly from top edge |
| 2026-04-21 | **App Bar Height Reduced:** App bar standardized across ALL screens to paddingTop=12px, paddingBottom=8px, minHeight=56px (reduced from previous 80px). Improves vertical space efficiency and centers content properly |
| 2026-04-21 | **Scroll Padding Fixed:** Scrollable containers updated with pb-[222px] class (150px extra clearance + 72px footer height) to prevent content from being hidden behind fixed footer navigation. Logout buttons and other bottom content now fully visible |
| 2026-04-21 | **Diamond Icon Z-Index Fix:** Home page app bar z-index set to 20 to prevent Daily Login Bonus diamond icon (z-10) from overlapping app bar when scrolling. Ensures proper visual hierarchy |
| 2026-04-22 | **Bottom Navigation Redesign:** Replaced Parking icon with Events in footer navigation. Parking remains accessible via Home page quick access (Parking button). Events navigation provides convenient access to browse all events. |
