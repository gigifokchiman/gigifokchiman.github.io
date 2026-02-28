/**
 * Zen-inspired color palette
 * Single source of truth for all colors across the app.
 *
 * Named after traditional Japanese materials and pigments:
 *   matcha  — stone garden moss
 *   sumi    — ink stone, charcoal
 *   bengara — rust-red earth pigment (shrine gates)
 *   bokuju  — calligraphy ink
 *   usuzumi — diluted ink wash
 *   washi   — handmade paper
 *   shikkui — lime plaster walls
 *   kinari  — undyed silk / raw linen
 *   suna    — raked sand
 */

const palette = {
  matcha:       '#7A9A7E',
  sumi:         '#5C5C5C',
  bengara:      '#B8704B',
  bengaraDark:  '#9A5D3A',
  bokuju:       '#4A4039',
  usuzumi:      '#8A8478',
  washi:        '#F5F0E8',
  shikkui:      '#FEFCF8',
  kinari:       '#EDE8DF',
  suna:         '#D6CFBF',
} as const;

export default palette;
