import type { SettingTypes } from '@/entities/setting'

export const ENABLE_ANIMATIONS_OPTIONS: SettingTypes.Option[] = [
  { value: 'system', label: 'System' },
  { value: 'on', label: 'On' },
  { value: 'off', label: 'Off' }
] as const
