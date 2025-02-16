import { Button } from '@/shared/components/ui'

import { useDeleteColumn } from '../hooks'

export const DeleteColumnTrigger = ({ columnId }: { columnId: string }) => {
  const { mutate: deleteColumn } = useDeleteColumn()

  return (
    <Button
      onClick={() => deleteColumn(columnId)}
      aria-label='Delete column'
      iconName='trash'
    />
  )
}
