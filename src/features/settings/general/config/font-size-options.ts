import type { SettingTypes } from '@/entities/setting'

export const FONT_SIZE_OPTIONS: SettingTypes.Option[] = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' }
] as const
