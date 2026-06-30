import { FormItem, RadioGroup, RadioGroupItem, useFormField } from '@/shared/ui'

import { TASK_PRIORITIES } from '../config/priority'
import { getTaskPriorityColor } from '../lib/priority-colors'

export const FormPrioritySelector = () => {
  const {
    field: { value, onChange }
  } = useFormField()

  return (
    <RadioGroup
      value={value}
      className='gap-3'
      onValueChange={onChange}>
      {TASK_PRIORITIES.toReversed().map(priority => (
        <FormItem key={priority}>
          <label
            className='text-md hocus:text-black dark:hocus:text-white flex
              cursor-pointer items-center gap-1 text-black/50
              dark:text-white/50'>
            <RadioGroupItem
              value={priority}
              indicatorClassname={getTaskPriorityColor(priority)}
              className={getTaskPriorityColor(priority)}
            />
            {priority[0].toUpperCase() + priority.slice(1)}
          </label>
        </FormItem>
      ))}
    </RadioGroup>
  )
}
