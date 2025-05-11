import type { ColumnTypes } from '@/entities/column'

import { useModal } from 'react-modal-state'

import { Column } from '@/entities/column'

import { Icon } from '@/shared/ui'

import { EditColumnModal } from './EditColumnModal'

type EditColumnTriggerProps = {
  column: ColumnTypes.ColumnSchema
}

export const EditColumnTrigger = ({ column }: EditColumnTriggerProps) => {
  const { open: openEditColumnModal } = useModal(EditColumnModal)

  return (
    <Column.ActionButton
      className='mr-2'
      onClick={() =>
        openEditColumnModal<ColumnTypes.EditColumnModalSchema>({
          id: column.id,
          title: column.title
        })
      }
      aria-label='Edit column'>
      <Icon name='pencil' />
    </Column.ActionButton>
  )
}
