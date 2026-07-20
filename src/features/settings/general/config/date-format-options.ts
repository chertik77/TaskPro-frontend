import type { SettingTypes } from '@/entities/setting'

export const DATE_FORMAT_OPTIONS: SettingTypes.Option[] = [
  { value: 'dd_mm_yyyy', label: '31/12/2026' },
  { value: 'mm_dd_yyyy', label: '12/31/2026' },
  { value: 'yyyy_mm_dd', label: '2026/12/31' }
] as const
