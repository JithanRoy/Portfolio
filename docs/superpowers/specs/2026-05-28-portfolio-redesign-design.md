# Portfolio Redesign — Design Spec

**Date:** 2026-05-28
**Owner:** Jithan Roy
**Status:** Draft, pending implementation

## Goal

Redesign the existing CRA portfolio with a modern, animation-heavy aesthetic. Preserve all content (name, bio paragraphs, skills, projects, socials, contact form, EmailJS integration). Replace the visual layer entirely: new palette, new scroll model (full-page snap), new loader, new section-enter animations with content sliding in from the sides.

## Non-goals

- No framework migration (stay on CRA + React 18).
- No content rewriting (paragraphs, skill list, project list copied verbatim from `src/utils/helper.js`).
- No backend changes (EmailJS + Firebase config untouched).
- No tsparticles (explicit user requirement).

## Tech changes

**Removed**
- `react-tsparticles`, `tsparticles` packages and `src/containers/ParticlesContainer.jsx`.
- Fire-glow border overlay in `App.jsx` and its CSS animation in `index.css`.

**Upgraded**
- `framer-motion@10` → `motion@^11` (new package name, import path `motion/react`). All animation imports updated.

**Added**
- `@studio-freight/lenis` for eased smooth scrolling that pairs with CSS scroll-snap.

**Kept**
- React 18, react-scripts, Tailwind 3, EmailJS, Firebase, react-icons.

## Design tokens

`tailwind.config.js` extended with:

```
colors:
  bg.deep      #161a23
  bg.surface   #222831
  bg.elevated  #393E46
  accent.teal  #00ADB5
  accent.coral #FF6B6B
  accent.amber #FFB454
  accent.violet #A78BFA
  text.primary #EEEEEE
  text.muted   #B8BCC4

fontFamily:
  sans:    Outfit (existing body)
  display: Space Grotesk (added for headings/numbers)

backgroundImage:
  gradient-primary:   linear-gradient(135deg, #00ADB5, #A78BFA)
  gradient-decor:     linear-gradient(135deg, #FF6B6B, #FFB454)
```

`index.css` updates:
- Replace radial-gradient body background with `#161a23` solid.
- Import Space Grotesk alongside Outfit.
- Add `.snap-container` / `.snap-section` utilities (scroll-snap mandatory, y axis).
- Remove fire-flicker keyframes and `.animate-fire` class.

## Loader

New component `src/components/Loader.jsx`, mounted at app root, controlled by a `useLoader` hook.

**Visual**
- Full-screen fixed overlay, `bg.deep`, z-index above everything.
- Centered column:
  - Top: kerned label `PORTFOLIO · 2026` in `text.muted`.
  - Center: large counter `00 → 100`, Space Grotesk ~120px, gradient teal→violet.
  - Below counter: 320px wide, 1px tall progress track; bar fills with `gradient-decor` (coral→amber).
  - Below bar: rotating status text — `Loading assets` → `Preparing scenes` → `Almost there`, fade-cycled.

**Behavior**
- Real progress: starts at 0%, advances to 90% during `Image.decode()` of hero/about/project images, jumps to 100% on `window.load`.
- Minimum visible duration: 1500ms (prevents flash on fast loads).
- Exit (~700ms): counter + label fade up and out, progress bar scales vertically to fill viewport in teal, then wipes upward off-screen revealing hero. Hero's first elements are mid-entry by the time wipe completes.
- `prefers-reduced-motion`: skip the wipe; cross-fade overlay to transparent.

## Scroll system

**Snap layout**
- `App.jsx` wraps all sections in a `.snap-container` with `scroll-snap-type: y mandatory; height: 100vh; overflow-y: scroll`.
- Each section is `.snap-section` with `scroll-snap-align: start; height: 100vh; width: 100%`.
- Body overflow hidden; the snap-container is the scroll context.
- Scrollbar hidden via `::-webkit-scrollbar { display: none }` on the snap-container.

**Lenis**
- `useLenis()` hook initialized in `App.jsx` once mount completes.
- Attached to the snap-container (not window) so it respects snap boundaries.
- Provides eased wheel/trackpad feel; touch scrolling on mobile uses native (no Lenis on touch).

**Section enter/exit**
- New `SectionLayout` component wraps each section. Takes `id`, `index`, `children`, optional `leftDecor` / `rightDecor` slots.
- Uses `useInView` from `motion/react` with `amount: 0.5` threshold.
- Variants defined once in `src/utils/motionVariants.js`:
  - `fromLeft`: `{ x: -80, opacity: 0 } → { x: 0, opacity: 1 }`
  - `fromRight`: `{ x: 80, opacity: 0 } → { x: 0, opacity: 1 }`
  - `fadeUp`: `{ y: 40, opacity: 0 } → { y: 0, opacity: 1 }`
  - `stagger`: `staggerChildren: 0.08, delayChildren: 0.1`
  - Decor variants use longer easing (0.9s) and a 0.3s delay.
- Exit on leave: reverse with shorter duration (0.4s).

**Side decorations**
- New `Decorations.jsx` exports `<Blob>`, `<Shape>`, `<NumberMark>` primitives.
- Each section's `leftDecor`/`rightDecor` slots receive these — colored gradient blobs, small geometric shapes (rings, squares, dots), and oversized faint section numbers.
- Blobs use `filter: blur(60px)` and slow rotate/scale loops.

**Navigation rail (replaces existing `Header.jsx`)**
- New `ScrollProgress.jsx`: vertical rail fixed right edge (desktop) / bottom (mobile).
- Renders `01–06` numbered dots. Active section gets a teal pill that slides between numbers via `layoutId` shared transition.
- Clicking a number programmatically snaps to that section (Lenis `scrollTo`).
- Hover: number expands to show section name.

## Sections

All section IDs preserved (`#home`, `#about`, `#skills`, `#projects`, `#contact`). All content read from `src/utils/helper.js` unchanged.

### 01 · Hero (`Home.jsx`)

- Two-column grid (single column on mobile).
- **Left**: eyebrow `HELLO, IT'S ME` (kerned, `text.muted`) → name `Jithan Roy` (display 96px, gradient teal→violet) → typewriter line `And I'm [a Software Engineer..]` cycling `HeroData.titles` → description paragraph from `HeroData.description` → row of social icon chips (magnetic hover) → "Hire me" pill button (filled teal, amber underline slides in on hover, links `mailto:jithanroyjony@gmail.com`).
- **Right**: portrait (`Hero` asset) circular mask with `border: 4px solid accent.teal`, surrounded by 3 orbiting shapes (coral disc, amber ring, violet square) on independent slow rotations.
- **Decor**: oversized outline `01` bottom-right, drifting teal/violet blobs.
- **Scroll hint**: chevron + "scroll" label centered bottom, fades on first scroll.

### 02 · About (`About.jsx`)

- Two-column grid.
- **Left**: number mark `02`, label `ABOUT`, then `AboutData.paragraphs` (3 paragraphs verbatim) stacked. Each paragraph staggers from left.
- **Right**: about portrait (`about` asset) in a card with `gradient-decor` border, slight 3deg tilt, floats vertically.
- **Decor**: coral blob enters from left edge, amber shape from right.

### 03 · Skills (`Skills.jsx`)

- Two-column grid.
- **Left**: heading `03 · SKILLS & EXPERIENCE`, intro paragraph (last entry in `SkillsData.paragraphs`).
- **Right**: list of skill bars. Each row: skill name (left) + animated count percentage (right) + horizontal bar below filling from 0% to target. Bar uses `SkillsData.skills[].color`. Counts tick up from 0 to target over 1.2s on enter.
- **Decor**: faint code-grid SVG pattern, floating violet shape.

### 04 · Projects (`Projects.jsx`)

- Full-width section.
- Heading `04 · SELECTED WORK` top-left.
- Grid: 3 cols desktop, 2 cols tablet, 1 col mobile.
- Each project card: rounded `bg.elevated`, project image fills card, on hover image scales to 1.05 and a teal overlay slides up from bottom showing project name + GitHub icon (preserved interaction). Cards stagger-fade up on section enter.
- **Decor**: coral arc top-right, amber dot cluster bottom-left.
- All entries in `ProjectsData` rendered as-is.

### 05 · Contact (`Contact.jsx`)

- Two-column grid.
- **Left**: heading `05 · LET'S TALK`, supporting line `Have an idea? Drop a message.`, then three clickable rows with icon: email, phone, location (email and phone from existing Footer content).
- **Right**: form (same fields and EmailJS integration verbatim): First Name, Last Name, Email, Message, Send button.
  - Inputs: floating labels, transparent background, bottom border only, focus state shows teal underline animating in.
  - Send button: filled teal with amber hover, same `sendMessage` handler.
- Toast `Alert` component preserved (success/warning states).
- **Decor**: gradient blob behind form.

### 06 · Footer (`Footer.jsx`)

- Centered column.
- Large display `Jithan Roy` (Space Grotesk).
- Socials row (same `HomeSocialLinks` component).
- Contact lines preserved: `Jithanroyjony@gmail.com`, `+880 1521327660`, "Hire Me" gradient link.
- Bottom edge: slow horizontal marquee `LET'S BUILD SOMETHING ·` repeating, very low opacity.

## File map

**New**
- `src/components/Loader.jsx`
- `src/components/SectionLayout.jsx`
- `src/components/Decorations.jsx`
- `src/components/ScrollProgress.jsx`
- `src/hooks/useLenis.js`
- `src/hooks/useLoader.js`
- `src/utils/motionVariants.js`

**Modified**
- `package.json` — remove tsparticles, replace framer-motion with motion, add lenis
- `tailwind.config.js` — new color/font tokens
- `src/index.css` — fonts, snap utilities, remove fire animation
- `src/containers/App.jsx` — mount Loader, init Lenis, snap container, drop Particles + fire border
- `src/containers/Home.jsx` — new hero layout
- `src/containers/About.jsx` — new about layout
- `src/containers/Skills.jsx` — animated bars
- `src/containers/Projects.jsx` — new card grid
- `src/containers/Contact.jsx` — new form layout (logic preserved)
- `src/containers/Footer.jsx` — new outro
- `src/components/HeroTypeWritter.jsx` — port to `motion/react`
- `src/components/HomeSocialLinks.jsx` — port to `motion/react`, magnetic hover
- `src/components/SkillCard.jsx` — replaced by inline skill bar in `Skills.jsx`
- `src/components/MenuItem.jsx` — replaced by `ScrollProgress.jsx`

**Removed**
- `src/containers/ParticlesContainer.jsx`
- `react-tsparticles`, `tsparticles` from `package.json`
- Fire-glow border `<div>` from `App.jsx`
- `.animate-fire` and `@keyframes fire-flicker` from `index.css`

## Accessibility

- All animations gated by `prefers-reduced-motion`: replaced with simple fades, no transforms.
- Scroll snap is native — keyboard PageUp/PageDown and arrow keys work.
- Side rail buttons have aria-labels.
- Form inputs keep labels (visually as floating, semantically as `<label htmlFor>`).
- Loader has `role="progressbar"` with `aria-valuenow`.

## Testing

- Manual: each section snaps correctly on wheel, trackpad, keyboard, touch.
- Manual: loader exits cleanly, no flash, real progress reflected.
- Manual: contact form sends via EmailJS, alert toast still works.
- Manual: reduced-motion preference disables transforms.
- Visual: works at 360px, 768px, 1024px, 1440px, 1920px.

## Open questions

None — all major decisions confirmed with the user:
- Palette: dark teal base + coral/amber/violet accents.
- Scroll: full-page snap.
- Loader: animated progress bar with name reveal.
- Framer: upgrade to `motion@11`.
- Side content: decorative shapes + text.
- Transitions: slide+fade with stagger.
