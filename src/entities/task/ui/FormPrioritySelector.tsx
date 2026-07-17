import { TaskPriority } from '@/shared/api'
import { capitalize } from '@/shared/lib'
import { FormItem, RadioGroup, RadioGroupItem, useFormField } from '@/shared/ui'

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
      {Object.values(TaskPriority)
        .toReversed()
        .map(priority => (
          <FormItem key={priority}>
            <label
              className='text-md hocus:text-black dark:hocus:text-white
                pointer-cursors:cursor-pointer flex items-center gap-1
                text-black/50 transition-colors dark:text-white/50'>
              <RadioGroupItem
                value={priority}
                indicatorClassname={getTaskPriorityColor(priority)}
                className={getTaskPriorityColor(priority)}
              />
              {capitalize(priority)}
            </label>
          </FormItem>
        ))}
    </RadioGroup>
  )
}
