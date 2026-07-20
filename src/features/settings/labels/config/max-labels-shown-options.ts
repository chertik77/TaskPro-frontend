import type { SettingTypes } from '@/entities/setting'

export const MAX_LABELS_SHOWN_OPTIONS: SettingTypes.Option[] = [
  { value: 'one', label: '1' },
  { value: 'two', label: '2' },
  { value: 'three', label: '3' },
  { value: 'all', label: 'All' }
] as const
