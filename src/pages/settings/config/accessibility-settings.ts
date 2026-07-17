import type { Setting } from '../model/types'

import { Switch } from '@/shared/ui'

export const ACCESSIBILITY_SETTINGS: Setting[] = [
  {
    title: 'Font size',
    description: 'Adjust the text size across the app for better readability.',
    control: Switch
  },
  {
    title: 'Reduced motion',
    description:
      'Minimize animations and transitions to reduce visual movement.',
    control: Switch
  },
  {
    title: 'High contrast',
    description:
      'Increase contrast between interface elements for better visibility.',
    control: Switch
  },
  {
    title: 'Focus indicators',
    description: 'Show clear outlines around focused elements when navigating.',
    control: Switch
  },
  {
    title: 'Keyboard navigation hints',
    description:
      'Display shortcuts and hints to help navigate with your keyboard.',
    control: Switch
  }
] as const
