import type { Column, EditColumnModalProps } from '../column.types'

import { useModal } from 'react-modal-state'
import { Button } from 'shared/ui/button'

import { useDeleteColumn } from 'features/kanban/column/hooks'

import { cn } from 'lib'

import { EditColumnModal } from './modals'

export const BoardColumnsActions = ({ column }: { column: Column }) => {
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
          openEditColumnModal<EditColumnModalProps>({
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
