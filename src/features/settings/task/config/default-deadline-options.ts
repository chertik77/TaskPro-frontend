import type { SettingTypes } from '@/entities/setting'

export const DEFAULT_DEADLINE_OPTIONS: SettingTypes.Option[] = [
  { value: 'none', label: 'None' },
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'three_days', label: 'In 3 days' },
  { value: 'one_week', label: 'In a week' }
] as const
