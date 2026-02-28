# Gigi Fok's Blog

A personal blog built with React, Material UI, and a Zen-inspired design.

## Features

- Zen-inspired light theme with warm, earthy tones
- Blog posts rendered from Markdown with syntax highlighting
- Expandable post previews with ink-wash fade effect
- Copy-to-clipboard button on code blocks
- Skeleton loading placeholders
- Subtle washi paper texture on post cards
- Sticky footer with social links
- Nunito font (Google Fonts)
- Responsive layout

## Color Palette

All colors live in `src/palette.ts` — a single source of truth inspired by traditional Japanese materials and pigments.

| Token | Hex | Inspiration |
|-------|-----|-------------|
| `matcha` | `#7A9A7E` | Stone garden moss (primary) |
| `sumi` | `#5C5C5C` | Ink stone, charcoal (secondary) |
| `bengara` | `#B8704B` | Rust-red earth pigment on shrine gates (links) |
| `bengaraDark` | `#9A5D3A` | Deeper bengara (link hover) |
| `bokuju` | `#4A4039` | Aged calligraphy ink (text) |
| `usuzumi` | `#8A8478` | Diluted ink wash (text secondary) |
| `washi` | `#F5F0E8` | Handmade paper (background) |
| `shikkui` | `#FEFCF8` | Lime plaster walls (cards) |
| `kinari` | `#EDE8DF` | Undyed silk / raw linen (inline code bg) |
| `suna` | `#D6CFBF` | Raked sand (dividers, borders) |

## Getting Started

```bash
yarn install
yarn start
```

## Build & Deploy

```bash
yarn build
yarn deploy
```
