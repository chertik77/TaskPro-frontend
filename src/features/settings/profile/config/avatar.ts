export const ALLOWED_AVATAR_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif'
]

export const MAX_AVATAR_SIZE = 5 * 1024 * 1024
export const PINCH_ZOOM_SENSITIVITY = 0.01
export const EDITOR_SIZE = 240
export const MIN_SCALE = 1
export const MAX_SCALE = 3

type EditorColors = {
  mask: [number, number, number, number]
  border: [number, number, number, number]
  background: string
}

export const EDITOR_COLORS: Record<'light' | 'dark', EditorColors> = {
  light: {
    mask: [252, 252, 252, 0.8],
    border: [22, 22, 22, 0.35],
    background: '#fcfcfc'
  },
  dark: {
    mask: [22, 22, 22, 0.8],
    border: [252, 252, 252, 0.35],
    background: '#161616'
  }
}
