export const ICONS = [
  'project',
  'star',
  'loading',
  'puzzle',
  'container',
  'lightning',
  'colors',
  'hexagon'
] as const

export type Icon = (typeof ICONS)[number]
