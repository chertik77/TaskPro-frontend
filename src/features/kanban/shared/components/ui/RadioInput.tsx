import type { Priority } from 'features/kanban/card/card.constants'

import * as RadioGroup from '@radix-ui/react-radio-group'

import { getPriorityColor } from 'features/kanban/card/utils'

import { cn } from 'lib'

export const RadioInput = ({ value, checked }: RadioGroup.RadioProps) => (
  <RadioGroup.Item
    checked={checked}
    className={cn(
      'focus-visible:styled-outline size-3.5 rounded-full',
      getPriorityColor(value as Priority)
    )}
    value={value as Priority}>
    <RadioGroup.Indicator
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={cn(
        `flex justify-center rounded-full after:size-3 after:rounded-full after:border-2
        after:border-white after:dark:border-black`,
        `after:${getPriorityColor(value as Priority)}`
      )}
    />
  </RadioGroup.Item>
)
