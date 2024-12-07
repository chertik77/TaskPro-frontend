export const icons = [
  'project',
  'star',
  'loading',
  'puzzle',
  'container',
  'lightning',
  'colors',
  'hexagon'
] as const

export type Icon = (typeof icons)[number]
