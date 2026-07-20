import type { SettingTypes } from '@/entities/setting'
import type { GeneralSettings } from '@/shared/api'

import { BOARD_BACKGROUND_BLUR_OPTIONS } from './board-background-blur-options'
import { DATE_FORMAT_OPTIONS } from './date-format-options'
import { FIRST_DAY_WEEK_OPTIONS } from './first-day-week-options'
import { THEME_OPTIONS } from './theme-options'

export const GENERAL_SETTINGS: SettingTypes.SettingDefinition<
  GeneralSettings,
  'accentColor'
>[] = [
  {
    type: 'select',
    key: 'theme',
    title: 'Theme',
    description: 'Choose between light, dark, or system appearance.',
    options: THEME_OPTIONS
  },
  {
    type: 'custom',
    key: 'accentColor',
    title: 'Accent color',
    description: 'Set the primary color used throughout the app.'
  },
  {
    type: 'select',
    key: 'firstDayOfWeek',
    title: 'First day of the week',
    description: 'Choose which day your calendars and date pickers start on.',
    options: FIRST_DAY_WEEK_OPTIONS
  },
  {
    type: 'select',
    key: 'dateFormat',
    title: 'Date format',
    description: 'Select how dates are displayed across the app.',
    options: DATE_FORMAT_OPTIONS
  },
  {
    type: 'select',
    key: 'boardBackgroundBlur',
    title: 'Board background blur',
    description: 'Adjust the blur applied to board backgrounds.',
    options: BOARD_BACKGROUND_BLUR_OPTIONS
  },
  {
    type: 'switch',
    key: 'usePointerCursors',
    title: 'Pointer cursors',
    description: 'Show pointer cursors when hovering interactive elements.'
  },
  {
    type: 'switch',
    key: 'enableAnimations',
    title: 'Enable animations',
    description: ' Enable animations and transitions throughout the app.'
  },
  {
    type: 'switch',
    key: 'confirmBeforeDelete',
    title: 'Confirm before delete',
    description: 'Ask for confirmation before permanently deleting items.'
  }
] as const
