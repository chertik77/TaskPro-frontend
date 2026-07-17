const DEFAULT_ACCENT_COLOR = '#bedbb0'

export const resetSettings = () => {
  const root = document.documentElement

  root.dataset.pointerCursors = 'true'
  root.style.setProperty('--accent-color', DEFAULT_ACCENT_COLOR)
}
