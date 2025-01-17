import type { ColumnTypes } from 'shared/api/column'

import { useModal } from 'react-modal-state'
import { Button } from 'shared/components/ui'
import { cn } from 'shared/lib'

import { useDeleteColumn } from 'features/kanban/column/hooks'

import { EditColumnModal } from './modals'

type BoardColumnsActionsProps = {
  column: ColumnTypes.Column
}

export const BoardColumnsActions = ({ column }: BoardColumnsActionsProps) => {
  const { mutate: deleteColumn } = useDeleteColumn()

  const { open: openEditColumnModal } = useModal(EditColumnModal)

  return (
    <div
      className={cn(
        `mb-3.5 flex h-3xl min-w-8xl items-center justify-center rounded-lg bg-white px-5
        py-lg dark:bg-black`
      )}>
      {column.title}
      <Button
        className='ml-auto mr-2'
        aria-label='Edit column'
        onClick={() =>
          openEditColumnModal<ColumnTypes.EditColumnModalProps>({
            id: column.id,
            title: column.title
          })
        }
        iconName='pencil'
      />
      <Button
        onClick={() => deleteColumn(column.id)}
        aria-label='Delete column'
        iconName='trash'
      />
    </div>
  )
}
