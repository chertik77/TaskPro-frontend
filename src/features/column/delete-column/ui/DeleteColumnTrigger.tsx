import { Column } from '@/entities/column'

import { Icon } from '@/shared/ui'

import { useDeleteColumn } from '../api/useDeleteColumn'

export const DeleteColumnTrigger = ({ columnId }: { columnId: string }) => {
  const { mutate: deleteColumn } = useDeleteColumn()

  return (
    <Column.ActionButton
      onClick={() => deleteColumn({ columnId })}
      aria-label='Delete column'>
      <Icon name='trash' />
    </Column.ActionButton>
  )
}
