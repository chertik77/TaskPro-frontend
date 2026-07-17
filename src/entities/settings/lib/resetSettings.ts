import { MotionGlobalConfig } from 'motion/react'

const DEFAULT_ACCENT_COLOR = '#bedbb0'

export const resetSettings = () => {
  const root = document.documentElement

  root.dataset.pointerCursors = 'true'
  root.dataset.animations = 'true'
  MotionGlobalConfig.skipAnimations = false
  root.style.setProperty('--accent-color', DEFAULT_ACCENT_COLOR)
}
