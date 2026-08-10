import { useEffect } from 'react'
import { MotionGlobalConfig } from 'motion/react'

import { ACCENT_COLOR_MAP } from '@/entities/user/@x/setting'

import { DEFAULT_THEME } from '@/shared/config'

import { useSettings } from '../model/useSettings'

export const SettingsSync = () => {
  const { data: settings } = useSettings(settings => settings.general)

  const theme = settings?.theme
  const animations = settings?.enableAnimations
  const accentColor = ACCENT_COLOR_MAP[settings?.accentColor ?? 'blue']

  useEffect(() => {
    document.documentElement.dataset.animations = String(animations ?? true)
    MotionGlobalConfig.skipAnimations = !animations
  }, [animations])

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor)
  }, [accentColor])

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')

      const apply = () => {
        root.dataset.theme = mq.matches ? 'dark' : 'light'
      }

      apply()
      mq.addEventListener('change', apply)

      return () => mq.removeEventListener('change', apply)
    }

    root.dataset.theme = theme ?? DEFAULT_THEME
  }, [theme])

  return null
}
