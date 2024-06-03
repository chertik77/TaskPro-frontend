import * as RadioGroup from '@radix-ui/react-radio-group'

import { EnumPriority } from 'constants/priorities'

import { cn, getPriorityColor } from 'lib'

export const RadioInput = ({ value, checked }: RadioGroup.RadioProps) => (
  <RadioGroup.Item
    checked={checked}
    className={cn(
      'size-3.5 rounded-full',
      getPriorityColor(value as EnumPriority)
    )}
    value={value as EnumPriority}>
    <RadioGroup.Indicator
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={cn(
        `flex justify-center rounded-full after:size-3 after:rounded-full after:border-2
        after:border-white after:dark:border-black`,
        `after:${getPriorityColor(value as EnumPriority)}`
      )}
    />
  </RadioGroup.Item>
)
