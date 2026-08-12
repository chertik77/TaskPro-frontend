import type { SettingTypes } from '@/entities/setting'
import type { TaskSettings } from '@/shared/api'

import { CARD_DENSITY_OPTIONS } from './card-density-options'
import { DEFAULT_DEADLINE_OPTIONS } from './default-deadline-options'

export const TASK_SETTINGS: SettingTypes.SettingDefinition<
  TaskSettings,
  'defaultPriority'
>[] = [
  {
    type: 'custom',
    key: 'defaultPriority',
    title: 'Default priority',
    description: 'Pre-selected priority when you create a new task.'
  },
  {
    type: 'select',
    key: 'defaultDeadline',
    title: 'Default deadline',
    description: 'Default deadline applied when creating new tasks.',
    options: DEFAULT_DEADLINE_OPTIONS
  },
  {
    type: 'select',
    key: 'cardDensity',
    title: 'Card density',
    description: 'Fit more tasks on screen by tightening spacing on cards.',
    options: CARD_DENSITY_OPTIONS
  },
  {
    type: 'switch',
    key: 'showPriorityIndicator',
    title: 'Show priority indicator',
    description: 'Display a colored priority stripe on the edge of task cards.'
  },
  {
    type: 'switch',
    key: 'overdueHighlight',
    title: 'Highlight overdue tasks',
    description: 'Emphasise deadlines that have already passed.'
  }
] as const
