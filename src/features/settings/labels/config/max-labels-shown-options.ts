import type { SettingTypes } from '@/entities/setting'

export const MAX_LABELS_SHOWN_OPTIONS: SettingTypes.Option[] = [
  { value: '0', label: 'All' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' }
] as const
