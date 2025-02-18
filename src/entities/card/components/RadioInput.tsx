import type { CardTypes } from '..'

import * as RadioGroup from '@radix-ui/react-radio-group'

import { cn } from '@/shared/lib/cn'

import { getPriorityColor } from '..'

export const RadioInput = ({ value, checked }: RadioGroup.RadioProps) => (
  <RadioGroup.Item
    checked={checked}
    className={cn(
      'focus-visible:styled-outline size-3.5 rounded-full',
      getPriorityColor(value as CardTypes.Priority)
    )}
    value={value as CardTypes.Priority}>
    <RadioGroup.Indicator
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={cn(
        `flex justify-center rounded-full after:size-3 after:rounded-full after:border-2
        after:border-white after:dark:border-black`,
        `after:${getPriorityColor(value as CardTypes.Priority)}`
      )}
    />
  </RadioGroup.Item>
)
