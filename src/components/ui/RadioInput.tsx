import * as RadioGroup from '@radix-ui/react-radio-group'
import { RadioPriority } from 'constants/priorities'

import { cn, getPriorityColor } from 'lib'

export const RadioInput = ({ value, checked }: RadioGroup.RadioProps) => (
  <RadioGroup.Item
    checked={checked}
    className={cn(
      'size-[14px] rounded-full',
      getPriorityColor(value as RadioPriority)
    )}
    value={value as RadioPriority}>
    <RadioGroup.Indicator
      className={cn(
        `flex size-full items-center justify-center after:block after:size-3
        after:rounded-full after:border-[2px] after:border-white after:content-['']
        after:dark:border-black`,
        `after:${getPriorityColor(value as RadioPriority)}`
      )}
    />
  </RadioGroup.Item>
)
