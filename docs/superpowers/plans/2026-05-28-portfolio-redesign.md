# Portfolio Redesign Implementation Plan

**Goal:** Rebuild the portfolio's visual layer with a dark teal palette, animated progress-bar loader, full-page snap scrolling, and section content sliding in from left/right — preserving all content verbatim from `src/utils/helper.js`.

**Architecture:** CRA + React 18 stays. Replace `framer-motion@10` with `motion@11`, drop `tsparticles`, add `lenis` for eased smooth scroll over CSS scroll-snap. New shared components: `Loader`, `SectionLayout`, `Decorations`, `ScrollProgress`. Six full-viewport snap sections with `useInView`-driven enter animations.

**Tech Stack:** React 18, Tailwind 3, motion@11, lenis, Space Grotesk + Outfit, EmailJS (preserved).

---

## Task 1 — Dependencies & token setup

**Files:**
- Modify: `package.json`
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

Steps:
1. Remove `react-tsparticles`, `tsparticles`; remove `framer-motion`; add `motion@^11` and `lenis@^1`. Run `npm install`.
2. Rewrite `tailwind.config.js` with new color tokens (`bg.deep`, `bg.surface`, `bg.elevated`, `accent.teal/coral/amber/violet`, `text.primary/muted`), `fontFamily` (`sans: Outfit`, `display: Space Grotesk`), and `backgroundImage` gradients.
3. Rewrite `src/index.css`: keep Tailwind directives, import Outfit + Space Grotesk, set body bg to `#161a23`, remove fire keyframes, remove smooth-scroll (Lenis handles it), add `.snap-container` / `.snap-section` utilities, hide scrollbar.
4. Commit: `chore: update deps and design tokens for redesign`.

## Task 2 — Motion variants util

**Files:**
- Create: `src/utils/motionVariants.js`

Export `fromLeft`, `fromRight`, `fadeUp`, `staggerContainer`, `decorVariant` with the transitions described in the spec.

Commit: `feat: add shared motion variants`.

## Task 3 — Lenis + loader hooks

**Files:**
- Create: `src/hooks/useLenis.js`
- Create: `src/hooks/useLoader.js`

`useLenis` initializes Lenis on a target ref, wires RAF loop, cleans up on unmount, skips on touch.

`useLoader` runs a minimum 1500ms timer in parallel with `Image.decode()` on hero/about/projects assets, advances progress 0→90% during load, jumps to 100% on completion, returns `{ progress, isLoading }`.

Commit: `feat: add lenis and loader hooks`.

## Task 4 — Loader component

**Files:**
- Create: `src/components/Loader.jsx`

Full-screen overlay, centered counter `00→100` driven by `progress`, gradient progress bar, rotating status text, curtain-wipe exit animation. `prefers-reduced-motion` → fade only. `role="progressbar"` + `aria-valuenow`.

Commit: `feat: add animated loader`.

## Task 5 — Decorations & SectionLayout

**Files:**
- Create: `src/components/Decorations.jsx` (exports `Blob`, `Shape`, `NumberMark`)
- Create: `src/components/SectionLayout.jsx`

`SectionLayout` props: `id`, `index`, `label`, `leftDecor`, `rightDecor`, `children`. Uses `useInView` from `motion/react` to trigger `staggerContainer` variants on children. Wraps in `.snap-section` and a positioned decor layer.

Commit: `feat: add SectionLayout and decoration primitives`.

## Task 6 — ScrollProgress rail

**Files:**
- Create: `src/components/ScrollProgress.jsx`
- Delete: `src/components/MenuItem.jsx` (no longer used after App refactor)

Vertical rail right edge (desktop) / bottom row (mobile). 6 numbered dots (`01`–`06`). Active dot gets teal pill via `layoutId`. Clicking a dot calls Lenis `scrollTo` on the snap-container. Reads menu items from `helper.js`.

Commit: `feat: add scroll progress rail`.

## Task 7 — App.jsx restructure

**Files:**
- Modify: `src/containers/App.jsx`
- Delete: `src/containers/ParticlesContainer.jsx`

Mount `Loader` (conditional on `isLoading`), wrap sections in `<main className="snap-container" ref={lenisRef}>`, init `useLenis(lenisRef)`. Remove fire border, remove ParticlesContainer, replace Header with ScrollProgress.

Commit: `refactor: restructure app shell with snap container`.

## Task 8 — Home rewrite

**Files:**
- Modify: `src/containers/Home.jsx`
- Modify: `src/components/HomeSocialLinks.jsx` (port to motion/react, magnetic hover)
- Modify: `src/components/HeroTypeWritter.jsx` (port to motion/react)

New 2-col layout per spec. Eyebrow + display name (gradient teal→violet) + typewriter + description + socials + Hire-me button. Right column: portrait with orbiting shapes. Section number `01` outline mark + drifting blobs as decor.

Commit: `feat: rewrite hero section`.

## Task 9 — About rewrite

**Files:**
- Modify: `src/containers/About.jsx`

2-col: left content with `02` mark + `ABOUT` label + 3 paragraphs from `AboutData.paragraphs` (verbatim). Right: about portrait with gradient border + tilt + float loop. Coral blob left, amber shape right.

Commit: `feat: rewrite about section`.

## Task 10 — Skills rewrite

**Files:**
- Modify: `src/containers/Skills.jsx`
- Delete: `src/components/SkillCard.jsx` (replaced inline)

Left: `03 · SKILLS & EXPERIENCE` + intro paragraph. Right: animated skill bars — each bar fills 0→target with count tick-up over 1.2s on enter, uses `SkillsData.skills[].color`. Code-grid decor + violet shape.

Commit: `feat: rewrite skills section with animated bars`.

## Task 11 — Projects rewrite

**Files:**
- Modify: `src/containers/Projects.jsx`

Heading `04 · SELECTED WORK`. Responsive grid (3/2/1 cols). Cards: rounded `bg.elevated`, image, hover teal overlay slides up with name + GitHub icon. Stagger-fade on enter. Coral arc + amber dot cluster decor.

Commit: `feat: rewrite projects grid`.

## Task 12 — Contact rewrite

**Files:**
- Modify: `src/containers/Contact.jsx`

2-col: left `05 · LET'S TALK` + intro + 3 contact rows (email, phone, location with icons). Right: form with floating labels, teal focus underline. EmailJS `sendMessage` logic preserved verbatim including service IDs. Alert toast preserved.

Commit: `feat: rewrite contact section`.

## Task 13 — Footer rewrite

**Files:**
- Modify: `src/containers/Footer.jsx`

Centered display name + socials row + contact lines + Hire Me link, all preserved. Add slow horizontal marquee `LET'S BUILD SOMETHING ·` at bottom edge with low opacity.

Commit: `feat: rewrite footer outro`.

## Task 14 — Cleanup, build, verify

Steps:
1. `npm run build` — must succeed with no errors.
2. `npm start` — manually verify: loader runs, snap works on wheel/keyboard, each section animates in, form sends, scroll rail navigates, reduced-motion fallback.
3. Search for stale imports of `framer-motion`, `tsparticles`, `MenuItem`, `ServiceCount`, `SkillCard`, `ParticlesContainer` — remove if found.
4. Commit: `chore: cleanup stale references after redesign`.
