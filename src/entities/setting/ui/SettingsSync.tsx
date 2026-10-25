import type { GeneralSettings } from '@/shared/api'
import type { Appearance } from '@/shared/config'

import { useEffect, useLayoutEffect, useState } from 'react'
import { MotionGlobalConfig } from 'motion/react'

import { ACCENT_COLOR_MAP } from '@/entities/user/@x/setting'

import {
  applyAppearance,
  getStoredAppearance,
  setStoredAppearance
} from '@/shared/config'
import { useMediaQuery } from '@/shared/lib'

import { useSettings } from '../model/useSettings'

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
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const { theme, fontSize, animations, accentColor } = settings
    ? toAppearance(settings)
    : storedAppearance

  useLayoutEffect(() => {
    const appearance = { theme, fontSize, animations, accentColor }

    applyAppearance(appearance)
    setStoredAppearance(appearance)
  }, [theme, fontSize, animations, accentColor, prefersDark])

  useEffect(() => {
    MotionGlobalConfig.skipAnimations =
      animations === 'system' ? prefersReducedMotion : animations === 'off'
  }, [animations, prefersReducedMotion])

  return null
}
