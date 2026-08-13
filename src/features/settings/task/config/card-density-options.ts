import type { SettingTypes } from '@/entities/setting'

export const CARD_DENSITY_OPTIONS: SettingTypes.Option[] = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' }
] as const
