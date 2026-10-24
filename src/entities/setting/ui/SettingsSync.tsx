import type { GeneralSettings } from '@/shared/api'
import type { Appearance } from '@/shared/config'

import { useEffect, useState } from 'react'
import { MotionGlobalConfig } from 'motion/react'

import { ACCENT_COLOR_MAP } from '@/entities/user/@x/setting'

import {
  applyAppearance,
  clearStoredAppearance,
  DEFAULT_APPEARANCE,
  getStoredAppearance,
  setStoredAppearance
} from '@/shared/config'
import { useMediaQuery } from '@/shared/lib'

import { useSettings } from '../model/useSettings'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const toAppearance = (settings: GeneralSettings): Appearance => ({
  theme: settings.theme,
  fontSize: settings.fontSize,
  animations: settings.enableAnimations,
  accentColor: ACCENT_COLOR_MAP[settings.accentColor]
})

export const SettingsSync = () => {
  const { data: settings } = useSettings(settings => settings.general)

  const [storedAppearance] = useState(getStoredAppearance)

  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY)

  const { theme, fontSize, animations, accentColor } = settings
    ? toAppearance(settings)
    : storedAppearance

  const isLoaded = !!settings

  useEffect(() => {
    const appearance = { theme, fontSize, animations, accentColor }

    applyAppearance(appearance)

    if (isLoaded) setStoredAppearance(appearance)
  }, [theme, fontSize, animations, accentColor, isLoaded, prefersDark])

  useEffect(() => {
    MotionGlobalConfig.skipAnimations =
      animations === 'system' ? prefersReducedMotion : animations === 'off'
  }, [animations, prefersReducedMotion])

  useEffect(
    () => () => {
      clearStoredAppearance()
      applyAppearance(DEFAULT_APPEARANCE)
      MotionGlobalConfig.skipAnimations =
        window.matchMedia(REDUCED_MOTION_QUERY).matches
    },
    []
  )

  return null
}
