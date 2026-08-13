import type { SettingTypes } from '@/entities/setting'

export const LABEL_DISPLAY_OPTIONS: SettingTypes.Option[] = [
  { value: 'full', label: 'Full' },
  { value: 'compact', label: 'Compact' },
  { value: 'hidden', label: 'Hidden' }
] as const
