import type { Column } from '@/shared/api'

import { memo, useMemo } from 'react'
import { Select as SelectPrimitive } from '@base-ui/react/select'
import { CircleArrowRightIcon } from 'lucide-react'

import { cn } from '@/shared/lib'
import { Loader, Select, SelectContent, SelectItem } from '@/shared/ui'

import { useMoveTask } from '../api/useMoveTask'

type MoveTaskSelectProps = {
  taskId: string
  taskColumnId: string
  columns: Column[]
}

export const MoveTaskSelect = memo(
  ({ taskId, taskColumnId, columns }: MoveTaskSelectProps) => {
    const { mutate: moveTask, isPending } = useMoveTask()

    const filteredColumns = useMemo(
      () => columns.filter(c => c.id !== taskColumnId),
      [columns, taskColumnId]
    )

    return (
      <Select
        value={taskColumnId}
        onValueChange={v => moveTask({ taskId: taskId, columnId: v! })}
        disabled={isPending}>
        <SelectPrimitive.Trigger
          className={cn(
            'group focus-visible:styled-outline text-black dark:text-white',
            columns.length <= 1 && 'hidden'
          )}>
          {isPending ? (
            <Loader className='flex size-4' />
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
          {filteredColumns.map(column => (
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
