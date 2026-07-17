import type { SettingsTypes } from '@/entities/settings'

import { SelectControl } from '@/entities/settings'

export const GENERAl_SETTINGS: SettingsTypes.Setting[] = [
  {
    key: 'theme',
    title: 'Theme',
    description: 'Choose between light, dark, or system appearance.',
    Control: SelectControl,
    controlProps: {
      options: [
        {
          label: 'Small',
          value: 'small'
        },
        {
          label: 'Medium',
          value: 'medium'
        },
        {
          label: 'Large',
          value: 'large'
        }
      ]
    }
  }
] as const
