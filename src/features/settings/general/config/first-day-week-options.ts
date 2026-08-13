import type { SettingTypes } from '@/entities/setting'

export const FIRST_DAY_WEEK_OPTIONS: SettingTypes.Option[] = [
  { value: 'sunday', label: 'Sunday' },
  { value: 'monday', label: 'Monday' }
] as const
