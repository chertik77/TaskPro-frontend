import type { ColumnTypes } from '@/entities/column'

import { useModal } from 'react-modal-state'

import { Button } from '@/shared/ui'

import { EditColumnModal } from './EditColumnModal'

type EditColumnTriggerProps = {
  column: ColumnTypes.Column
}

export const EditColumnTrigger = ({ column }: EditColumnTriggerProps) => {
  const { open: openEditColumnModal } = useModal(EditColumnModal)

  return (
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
  )
}
