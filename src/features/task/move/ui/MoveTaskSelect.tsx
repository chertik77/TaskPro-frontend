import { memo } from 'react'
import { Select as SelectPrimitive } from '@base-ui/react/select'
import { CircleArrowRightIcon } from 'lucide-react'

import { cn } from '@/shared/lib'
import { Loader, Select, SelectContent, SelectItem } from '@/shared/ui'

import { useGetFilteredColumns } from '../api/useGetFilteredColumns'
import { useMoveTask } from '../api/useMoveTask'

type MoveTaskSelectProps = {
  taskId: string
  taskColumnId: string
}

export const MoveTaskSelect = memo(
  ({ taskId, taskColumnId }: MoveTaskSelectProps) => {
    const { columns, filteredColumns } = useGetFilteredColumns(taskColumnId)

    const { mutate: moveTask, isPending } = useMoveTask()

    return (
      <Select
        value={taskColumnId}
        onValueChange={v => moveTask({ taskId: taskId, columnId: v! })}
        disabled={isPending}>
        <SelectPrimitive.Trigger
          className={cn(
            'group text-black dark:text-white',
            columns && columns.length <= 1 && 'hidden'
          )}>
          {isPending ? (
            <Loader className='flex size-4 border-2' />
          ) : (
            <CircleArrowRightIcon
              className='group-hocus:opacity-100 size-4 opacity-50
                transition-opacity'
            />
          )}
        </SelectPrimitive.Trigger>
        <SelectContent
          positionerProps={{ align: 'start' }}
          className='w-min'>
          {filteredColumns?.map(column => (
            <SelectItem
              key={column.id}
              className='flex items-center gap-2'
              value={column.id}>
              <p className='w-20 truncate'>{column.title}</p>
              <CircleArrowRightIcon className='size-4' />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
)
