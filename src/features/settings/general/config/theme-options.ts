import type { SettingTypes } from '@/entities/setting'

export const THEME_OPTIONS: SettingTypes.Option[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' }
] as const
