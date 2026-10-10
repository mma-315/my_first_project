# Design System: Bolton Caterers

## Visual World: Warm Community Kitchen Editorial
A clean, trustworthy, high-contrast British community editorial style. Warm neutral backgrounds with rich dark slate typography and vibrant food-grade accents (British halal emerald, saffron/turmeric amber, deep slate).

## Color Tokens
- **Background Canvas**: `#F8FAFC` (Slate-50) / `#F1F5F9` (Slate-100) — soft, clean, warm neutral that prevents eye strain and sets crisp white cards apart.
- **Card Surface**: `#FFFFFF` with `border border-slate-200/90` and soft dual-level elevation shadows.
- **Primary Text**: `#0F172A` (Slate-900) — deep, rich slate, high-contrast (WCAG AAA).
- **Secondary Text**: `#475569` (Slate-600) — legible slate, never washed-out low-contrast gray.
- **Accents**:
  - Halal / Fresh Emerald: `#059669` (Emerald-600), `#047857` (Emerald-700), `#ECFDF5` (Emerald-50)
  - Heritage Amber / Gold: `#D97706` (Amber-600), `#B45309` (Amber-700), `#FFFBEB` (Amber-50)
  - Direct Dial Slate: `#F1F5F9` (Slate-100), `#E2E8F0` (Slate-200)

## Typography & Hierarchy
- **Primary Font**: Modern system humanist stack (`system-ui, -apple-system, sans-serif`) with tabular figures for phone numbers and postcodes.
- **Display Weights**: Black (900) for title, ExtraBold (800) for caterer names, Bold (700) for actions.
- **Body & Captions**: Medium (500) and SemiBold (600) for maximum legibility on budget smartphones and high-DPI desktop screens alike.

## Breakpoint Strategy
- **Mobile (< 640px)**: Single column stream, full-width thumb-friendly cards, sticky top branding, prominent bottom action row.
- **Tablet (640px - 1024px)**: 2-column balanced grid, maximized flyer preview visibility.
- **Desktop (≥ 1024px)**: Max width 1200px container, 3-column caterer showcase, refined sticky header with quick location switch and live status counter.
