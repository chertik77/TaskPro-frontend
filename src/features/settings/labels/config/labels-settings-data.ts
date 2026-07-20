import type { SettingTypes } from '@/entities/setting'
import type { LabelSettings } from '@/shared/api'

import { LABEL_DISPLAY_OPTIONS } from './label-display-options'
import { MAX_LABELS_SHOWN_OPTIONS } from './max-labels-shown-options'

export const LABELS_SETTINGS: SettingTypes.SettingDefinition<LabelSettings>[] =
  [
    {
      type: 'switch',
      key: 'showLabelsOnTask',
      title: 'Show labels on tasks',
      description: 'Display labels directly on task cards.'
    },
    {
      type: 'select',
      key: 'labelDisplay',
      title: 'Label display',
      description: 'Choose how labels appear on task cards.',
      options: LABEL_DISPLAY_OPTIONS
    },
    {
      type: 'select',
      key: 'maxLabelsShown',
      title: 'Maximum labels shown',
      description: 'Set the maximum number of labels displayed on each task.',
      options: MAX_LABELS_SHOWN_OPTIONS
    }
  ] as const
