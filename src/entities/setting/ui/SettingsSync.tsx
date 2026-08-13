import { useEffect } from 'react'
import { MotionGlobalConfig } from 'motion/react'

import { ACCENT_COLOR_MAP } from '@/entities/user/@x/setting'

import {
  getStoredAppearance,
  resetStoredAppearance,
  setStoredAppearance
} from '@/shared/config'

import { useSettings } from '../model/useSettings'

const storedAppearance = getStoredAppearance()

export const SettingsSync = () => {
  const { data: settings } = useSettings(settings => settings.general)

  const theme = settings?.theme ?? storedAppearance.theme
  const fontSize = settings?.fontSize ?? storedAppearance.fontSize ?? 'medium'
  const animations =
    settings?.enableAnimations ?? storedAppearance.animations ?? 'system'
  const accentColor = settings
    ? ACCENT_COLOR_MAP[settings.accentColor]
    : storedAppearance.accentColor

  useEffect(() => {
    document.documentElement.dataset.animations = animations

    if (animations === 'system') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

      const apply = () => {
        MotionGlobalConfig.skipAnimations = mq.matches
      }

      apply()
      mq.addEventListener('change', apply)

      return () => mq.removeEventListener('change', apply)
    }

    MotionGlobalConfig.skipAnimations = animations === 'off'
  }, [animations])

  useEffect(() => {
    if (!accentColor) return

    document.documentElement.style.setProperty('--accent-color', accentColor)
  }, [accentColor])

  useEffect(() => {
    document.documentElement.dataset.fontSize = fontSize
  }, [fontSize])

  useEffect(() => {
    if (!theme) return

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

    root.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    if (!settings) return

    setStoredAppearance({
      theme: settings.theme,
      accentColor: ACCENT_COLOR_MAP[settings.accentColor],
      fontSize: settings.fontSize,
      animations: settings.enableAnimations
    })
  }, [settings])

  useEffect(() => () => resetStoredAppearance(), [])

  return null
}
