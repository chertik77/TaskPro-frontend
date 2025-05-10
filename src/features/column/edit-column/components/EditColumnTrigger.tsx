import type { ColumnTypes } from '@/entities/column'

import { useModal } from 'react-modal-state'

import { Icon } from '@/shared/ui'

import { EditColumnModal } from './EditColumnModal'

type EditColumnTriggerProps = {
  column: ColumnTypes.ColumnSchema
}

export const EditColumnTrigger = ({ column }: EditColumnTriggerProps) => {
  const { open: openEditColumnModal } = useModal(EditColumnModal)

  return (
    <button
      type='button'
      className='focus-visible:styled-outline hocus:[&_svg]:stroke-black
        violet:hocus:[&_svg]:stroke-black dark:hocus:[&_svg]:stroke-white-soft mr-2
        ml-auto'
      onClick={() =>
        openEditColumnModal<ColumnTypes.EditColumnModalSchema>({
          id: column.id,
          title: column.title
        })
      }
      aria-label='Edit column'>
      <Icon
        name='pencil'
        className='dark:stroke-white-soft/50 size-4 stroke-black/50'
      />
    </button>
  )
}
