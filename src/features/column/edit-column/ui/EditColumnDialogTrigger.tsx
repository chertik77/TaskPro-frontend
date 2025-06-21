import { Column } from '@/entities/column'

import { DialogTrigger, Icon } from '@/shared/ui'

export const EditColumnDialogTrigger = () => (
  <DialogTrigger asChild>
    <Column.ActionButton
      className='mr-2'
      aria-label='Edit column'>
      <Icon name='pencil' />
    </Column.ActionButton>
  </DialogTrigger>
)
