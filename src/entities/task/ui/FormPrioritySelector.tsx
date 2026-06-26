import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { FormItem, RadioGroup, RadioGroupItem } from '@/shared/ui'

import { TASK_PRIORITIES } from '../config/priority'
import { getTaskPriorityColor } from '../lib/priority-colors'

export const FormPrioritySelector = <T extends FieldValues>({
  value,
  onChange
}: ControllerRenderProps<T>) => (
  <RadioGroup
    value={value}
    className='gap-3'
    onValueChange={onChange}>
    {TASK_PRIORITIES.toReversed().map(priority => (
      <FormItem key={priority}>
        <label
          className='text-md hocus:text-black dark:hocus:text-white flex
            cursor-pointer items-center gap-1 text-black/50
            has-[data-state=checked]:text-black dark:text-white/50
            dark:has-[data-state=checked]:text-white'>
          <RadioGroupItem
            value={priority}
            indicatorClassname={getTaskPriorityColor(priority)}
            className={getTaskPriorityColor(priority)}
          />
          {priority}
        </label>
      </FormItem>
    ))}
  </RadioGroup>
)
