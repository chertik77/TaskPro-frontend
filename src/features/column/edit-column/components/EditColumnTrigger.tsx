import type { ColumnTypes } from '@/entities/column'

import { useModal } from 'react-modal-state'

import { Icon } from '@/shared/ui'

import { EditColumnModal } from './EditColumnModal'

type EditColumnTriggerProps = {
  column: ColumnTypes.Column
}

export const EditColumnTrigger = ({ column }: EditColumnTriggerProps) => {
  const { open: openEditColumnModal } = useModal(EditColumnModal)

  return (
    <button
      type='button'
      className='focus-visible:styled-outline ml-auto mr-2 hocus:[&_svg]:stroke-black
        violet:hocus:[&_svg]:stroke-black dark:hocus:[&_svg]:stroke-white-soft'
      onClick={() =>
        openEditColumnModal<ColumnTypes.EditColumnModalProps>({
          id: column.id,
          title: column.title
        })
      }
      aria-label='Edit column'>
      <Icon
        name='pencil'
        className='size-4 stroke-black/50 dark:stroke-white-soft/50'
      />
    </button>
  )
}
