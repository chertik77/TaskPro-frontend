import type { SettingTypes } from '@/entities/setting'

export const BOARD_BACKGROUND_BLUR_OPTIONS: SettingTypes.Option[] = [
  { value: 'off', label: 'Off' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' }
] as const
