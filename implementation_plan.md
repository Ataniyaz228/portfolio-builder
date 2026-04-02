# Phase 5 — Polish, Performance & SEO

Improve animation architecture, add accessibility, enhance SEO, optimize loading, and polish UX across the existing portfolio React app.

## Proposed Changes

### New Reusable Components

#### [NEW] [AnimatedSection.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/components/common/AnimatedSection/AnimatedSection.jsx)
- DRY wrapper replacing 5+ repeated `motion.div + whileInView` patterns
- Props: `direction`, `delay`, `stagger`, `className`, `children`
- Auto-detects `prefers-reduced-motion` and disables animations
- Uses Framer Motion's `useReducedMotion()` hook

#### [NEW] [LazyImage.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/components/common/LazyImage/LazyImage.jsx)
- Unified image component with blur placeholder SVG
- `loading="lazy"`, error fallback, alt text enforcement
- Smooth fade-in on load

#### [NEW] [SkipToContent.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/components/common/SkipToContent/SkipToContent.jsx)
- "Skip to main content" link (WCAG 2.1 AA requirement)
- Visible only on keyboard focus

---

### Code Splitting

#### [MODIFY] [App.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/App.jsx)
- Wrap all page imports in `React.lazy()` + `<Suspense>`
- Reduces initial bundle size by splitting pages into separate chunks

---

### SEO Enhancement

#### [MODIFY] [SEO.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/components/common/SEO/SEO.jsx)
- Add: `canonical`, `og:image`, `og:type`, `og:url`, `robots`, `twitter:card`
- Default values for all meta tags
- JSON-LD structured data support via `jsonLd` prop

#### [MODIFY] [ProjectDetailPage.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/pages/ProjectDetailPage.jsx)
- Pass JSON-LD `SoftwareApplication` schema to SEO component
- Use `LazyImage` for project image

---

### Accessibility

#### [MODIFY] [index.css](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/index.css)
- `focus-visible` outline styles for keyboard navigation
- `prefers-reduced-motion` media query — disable transitions globally
- Skip link styles (visually hidden until focused)

#### [MODIFY] [Navbar.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/components/layout/Navbar/Navbar.jsx)
- `aria-label` on hamburger button, nav element
- `aria-expanded` on mobile menu toggle

#### [MODIFY] [Footer.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/components/layout/Footer/Footer.jsx)
- `aria-label` on social links

#### [MODIFY] [Layout.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/components/layout/Layout/Layout.jsx)
- Add `<SkipToContent />` before Navbar
- Add `id="main-content"` to `<main>`

---

### Section Refactors (use AnimatedSection)

#### [MODIFY] [Hero.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/components/sections/Hero/Hero.jsx)
#### [MODIFY] [Projects.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/components/sections/Projects/Projects.jsx)
#### [MODIFY] [Skills.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/components/sections/Skills/Skills.jsx)
#### [MODIFY] [Experience.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/components/sections/Experience/Experience.jsx)
#### [MODIFY] [Contact.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/components/sections/Contact/Contact.jsx)
- Replace inline `motion.div` with `<AnimatedSection>` wrapper
- Keep section-specific stagger configurations

#### [MODIFY] [Card.jsx](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/components/common/Card/Card.jsx)
- Replace `<img>` with `<LazyImage>` component

---

### Contact Form UX

#### [MODIFY] [useContactForm.js](file:///c:/Users/BINOM/Desktop/project%20adsum/portfolio-frontend/src/hooks/useContactForm.js)
- Optimistic UI: show success immediately, revert on error
- Debounced email validation (500ms)

## Verification Plan

### Build
- `npx vite build` — 0 errors, check chunk splitting

### Manual
- Browser test: scroll animations, hover effects, page transitions
- Keyboard navigation: Tab through all interactive elements
- `prefers-reduced-motion`: verify animations disabled
