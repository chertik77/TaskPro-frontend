import { getTaskPriorityColor } from '@/entities/task'

import { TaskPriority } from '@/shared/api'
import { capitalize, cn } from '@/shared/lib'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue
} from '@/shared/ui'

type DefaultPrioritySelectProps = {
  value: TaskPriority | undefined
  onChange: (v: TaskPriority | null) => void
}

export const DefaultPrioritySelect = ({
  value,
  onChange
}: DefaultPrioritySelectProps) => (
  <Select
    value={value}
    onValueChange={onChange}>
    <SelectTrigger
      className='text-md tablet:text-base tablet:px-4 tablet:py-2.5 gap-1.5 px-3
        py-2'>
      <SelectValue>
        {(v: TaskPriority) => (
          <div className='flex items-center gap-2'>
            <span
              className={cn('size-3 rounded-full', getTaskPriorityColor(v))}
            />
            {v ? capitalize(v) : ''}
          </div>
        )}
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      {Object.values(TaskPriority)
        .toReversed()
        .map(priority => (
          <SelectItem
            key={priority}
            disabled={priority === value}
            className='flex items-center gap-2'
            value={priority}>
            <span
              className={cn(
                'size-3 shrink-0 rounded-full',
                getTaskPriorityColor(priority)
              )}
            />
            <SelectItemText>{capitalize(priority)}</SelectItemText>
          </SelectItem>
        ))}
    </SelectContent>
  </Select>
)
